/**
 * 内容流抓取：构建前运行，拉 4 源 × 最新 5 条，写 src/data/streams.json。
 *
 * 任何单源失败都不阻塞构建：保留 streams.json 中该源的上次数据（首次则置空），
 * 脚本恒以退出码 0 结束。VOA/BBC 域名在中国大陆网络被 DNS 污染，本机抓取失败属预期，
 * GitHub Actions（美国 runner）可正常拉取；本机调试可用 Node ≥24 的
 * NODE_USE_ENV_PROXY=1 + HTTPS_PROXY 环境变量走代理。
 *
 * VOA 两栏目 feed 地址来自 Apple Podcasts 官方注册信息（zoneId 4456 / 987），
 * 已经 W3C feed validator 服务端校验为有效 RSS（2026-09-19）。
 */

import { XMLParser } from 'fast-xml-parser';
import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../src/data/streams.json', import.meta.url);
const LIMIT = 5;
const TIMEOUT_MS = 20_000;
const RETRIES = 2;
const UA = 'english-hub-feed-fetcher/0.1 (+non-commercial aggregator)';

const SOURCES = [
  {
    id: 'voa-eg',
    name: 'VOA · Everyday Grammar',
    home: 'https://learningenglish.voanews.com/',
    type: 'rss',
    feed: 'https://learningenglish.voanews.com/podcast/?zoneId=4456',
    summary: true,
    attribution: '公共领域 · 署名 VOA Learning English',
  },
  {
    id: 'voa-wats',
    name: 'VOA · Words and Their Stories',
    home: 'https://learningenglish.voanews.com/',
    type: 'rss',
    feed: 'https://learningenglish.voanews.com/podcast/?count=50&zoneId=987',
    summary: true,
    attribution: '公共领域 · 署名 VOA Learning English',
  },
  {
    id: 'bbc-6min',
    name: 'BBC · 6 Minute English',
    home: 'https://www.bbc.co.uk/learningenglish/english/podcasts',
    type: 'rss',
    feed: 'https://podcasts.files.bbci.co.uk/p02pc9tn.rss',
    summary: false,
    attribution: '非商业引用 · 版权归 BBC',
  },
  {
    id: 'librivox',
    name: 'LibriVox · 最新有声书',
    home: 'https://librivox.org/',
    type: 'librivox',
    feed: 'https://librivox.org/api/feed/audiobooks/?format=json&limit=5',
    summary: false,
    attribution: '公共领域 · 音频可自由使用',
  },
];

const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

async function fetchText(url) {
  let lastErr;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
      if (attempt < RETRIES) await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw lastErr;
}

function stripHtml(s) {
  return (s ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toDate(value) {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : undefined;
}

function rssItems(xml, src) {
  const parsed = xmlParser.parse(xml);
  const raw = parsed?.rss?.channel?.item;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return list.slice(0, LIMIT).map((item) => {
    const enclosure = item.enclosure?.['@_url'];
    return {
      title: stripHtml(item.title),
      url: item.link?.trim() || enclosure || src.home,
      date: toDate(item.pubDate),
      ...(src.summary && item.description
        ? { summary: stripHtml(item.description).slice(0, 160) }
        : {}),
    };
  });
}

function librivoxItems(jsonText) {
  const parsed = JSON.parse(jsonText);
  const list = Array.isArray(parsed) ? parsed : (parsed.books ?? []);
  return list.slice(0, LIMIT).map((b) => ({
    title: stripHtml(b.title),
    url: b.url_librivox || b.url_rss || 'https://librivox.org/',
  }));
}

async function fetchSource(src) {
  const text = await fetchText(src.feed);
  const items = src.type === 'librivox' ? librivoxItems(text) : rssItems(text, src);
  if (items.length === 0) throw new Error('feed 为空');
  return items;
}

const prev = await readFile(OUT, 'utf8').then(JSON.parse).catch(() => ({ sources: [] }));
const prevById = new Map(prev.sources?.map((s) => [s.id, s]) ?? []);

const sources = [];
const errors = [];
for (const src of SOURCES) {
  const meta = {
    id: src.id,
    name: src.name,
    home: src.home,
    attribution: src.attribution,
  };
  try {
    const items = await fetchSource(src);
    sources.push({ ...meta, items, fetchedAt: new Date().toISOString() });
    console.log(`✔ ${src.id}: ${items.length} 条`);
  } catch (err) {
    errors.push(`${src.id}: ${err.message}`);
    const old = prevById.get(src.id);
    sources.push(old ?? { ...meta, items: [], fetchedAt: null });
    console.warn(`✘ ${src.id}: ${err.message} → 回退${old ? '缓存' : '空态'}`);
  }
}

const doc = {
  fetchedAt: new Date().toISOString(),
  errors,
  sources,
};
await writeFile(OUT, JSON.stringify(doc, null, 2) + '\n');
console.log(`写入 ${OUT.pathname}（错误 ${errors.length} 个，不阻塞构建）`);
