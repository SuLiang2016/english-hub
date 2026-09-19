/**
 * 站点数据：全部来自 docs/research/english-learning-sites.md（2026-08-24 实测调研）。
 * favicon 用调研核实的完整路径；被反爬拦截的站点只配 faviconFallback（Google s2 代理）。
 * integration 口径按调研 §0 三层：A/B 层标官方通道（api/rss/iframe），C 层标 link-only。
 */

export type CategoryId =
  | 'dictionary'
  | 'pronunciation'
  | 'grammar'
  | 'listening'
  | 'reading'
  | 'vocab'
  | 'speaking'
  | 'exam';

export interface Category {
  id: CategoryId;
  label: string;
}

export type Integration = 'api' | 'rss' | 'iframe' | 'link-only';
export type PriceTag = '免费' | 'Freemium' | '付费';

export interface Site {
  name: string;
  nameZh: string;
  url: string;
  category: CategoryId;
  tags: PriceTag[];
  integration: Integration;
  favicon?: string;
  /** 主 favicon 加载失败时的兜底（Google s2 代理或备用路径） */
  faviconFallback?: string;
  integrationDoc?: string;
  notes?: string;
}

export const CATEGORIES: Category[] = [
  { id: 'dictionary', label: '词典与查词' },
  { id: 'pronunciation', label: '发音与语音' },
  { id: 'grammar', label: '语法与写作' },
  { id: 'listening', label: '听力与播客' },
  { id: 'reading', label: '分级阅读与新闻' },
  { id: 'vocab', label: '背词与记忆' },
  { id: 'speaking', label: '口语陪练' },
  { id: 'exam', label: '考试备考' },
];

const S2 = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

export const SITES: Site[] = [
  // ---- 词典与查词 ----
  {
    name: 'Cambridge Dictionary',
    nameZh: '剑桥词典',
    url: 'https://dictionary.cambridge.org/',
    category: 'dictionary',
    tags: ['免费'],
    integration: 'iframe',
    favicon: 'https://dictionary.cambridge.org/favicon.ico',
    integrationDoc: 'https://dictionary.cambridge.org/develop',
    notes: '学习者最常用的免费在线词典；另有免费搜索小组件与双击查词脚本可嵌入（API 收费）',
  },
  {
    name: "Oxford Learner's Dictionaries",
    nameZh: '牛津学习者词典',
    url: 'https://www.oxfordlearnersdictionaries.com/',
    category: 'dictionary',
    tags: ['免费'],
    integration: 'link-only',
    favicon: 'https://www.oxfordlearnersdictionaries.com/favicon.ico',
    notes: '含 Oxford 3000/5000 词表、CEFR 分级与语法练习；无自助开放 API',
  },
  {
    name: 'Merriam-Webster',
    nameZh: '韦氏词典',
    url: 'https://www.merriam-webster.com/',
    category: 'dictionary',
    tags: ['免费'],
    integration: 'api',
    favicon: 'https://www.merriam-webster.com/favicon.ico',
    integrationDoc: 'https://dictionaryapi.com/',
    notes: 'API 对个人开发者最友好：非商业免费，≤1000 次/天/key，含释义、词源、音频发音',
  },
  {
    name: 'Longman LDOCE Online',
    nameZh: '朗文当代英语词典',
    url: 'https://www.ldoceonline.com/',
    category: 'dictionary',
    tags: ['免费'],
    integration: 'link-only',
    favicon: 'https://www.ldoceonline.com/external/images/favicon.ico',
    notes: '2000 词释义、真实语料例句、英美双音；官方 API 文档已不可公开访问',
  },
  {
    name: 'Collins Dictionary',
    nameZh: '柯林斯词典',
    url: 'https://www.collinsdictionary.com/',
    category: 'dictionary',
    tags: ['免费'],
    integration: 'api',
    faviconFallback: S2('collinsdictionary.com'),
    integrationDoc: 'https://www.collinsdictionary.com/us/collins-api',
    notes: '基于 45 亿词 Collins Corpus；API 免费额度 ≤5000 次/月（站点反爬，图标走兜底）',
  },
  {
    name: 'Wiktionary (English)',
    nameZh: '维基词典',
    url: 'https://en.wiktionary.org/',
    category: 'dictionary',
    tags: ['免费'],
    integration: 'api',
    favicon: 'https://en.wiktionary.org/favicon.ico',
    integrationDoc: 'https://www.mediawiki.org/wiki/API:Action_API',
    notes: '完全免费无 key，CC BY-SA 可再分发（署名+同协议）；含词源、IPA、同反义词；须设 UA 并限流',
  },

  // ---- 发音与语音 ----
  {
    name: 'YouGlish',
    nameZh: 'YouGlish 真人发音',
    url: 'https://youglish.com/',
    category: 'pronunciation',
    tags: ['免费'],
    integration: 'iframe',
    favicon: 'https://youglish.com/favicon.ico',
    integrationDoc: 'https://youglish.com/api/doc/widget',
    notes: '从 2 亿+ 真实 YouTube 片段检索单词/短语发音语境；Widget 非商业教育用途免费，须保留 Powered by 标识',
  },
  {
    name: 'Forvo',
    nameZh: 'Forvo 母语者发音库',
    url: 'https://forvo.com/',
    category: 'pronunciation',
    tags: ['免费'],
    integration: 'api',
    favicon: 'https://forvo.com/favicon.ico',
    integrationDoc: 'https://api.forvo.com/',
    notes: '430+ 语言约 600 万条真人发音（英语 34 万+ 词）；听发音免费，API 无免费档',
  },

  // ---- 语法与写作 ----
  {
    name: 'Purdue OWL',
    nameZh: '普渡大学在线写作实验室',
    url: 'https://owl.purdue.edu/owl/index.html',
    category: 'grammar',
    tags: ['免费'],
    integration: 'link-only',
    favicon: 'https://owl.purdue.edu/favicon.ico',
    integrationDoc: 'https://owl.purdue.edu/owl/about_the_owl/owl_information/fair_use_policy.html',
    notes: '语法、写作流程与 MLA/APA/Chicago/IEEE 引用规范权威指南；条款明文禁止 iframe 嵌入，仅可直链',
  },
  {
    name: 'Grammarly',
    nameZh: 'Grammarly 写作助手',
    url: 'https://www.grammarly.com/',
    category: 'grammar',
    tags: ['Freemium'],
    integration: 'link-only',
    faviconFallback: S2('grammarly.com'),
    notes: '语法、拼写、清晰度、语气检查；API 不面向公众，可嵌入的 Text Editor SDK 已下线（2024-01）',
  },

  // ---- 听力与播客 ----
  {
    name: 'BBC Learning English',
    nameZh: 'BBC 英语学习',
    url: 'https://www.bbc.co.uk/learningenglish/',
    category: 'listening',
    tags: ['免费'],
    integration: 'rss',
    favicon: 'https://www.bbc.co.uk/favicon.ico',
    integrationDoc: 'https://www.bbc.co.uk/learningenglish/english/podcasts',
    notes: '分级音频节目每期配文稿、练习单与测验；官方播客 RSS 可聚合，商业用途需另获授权',
  },
  {
    name: 'VOA Learning English',
    nameZh: 'VOA 慢速英语',
    url: 'https://learningenglish.voanews.com/',
    category: 'listening',
    tags: ['免费'],
    integration: 'rss',
    favicon:
      'https://learningenglish.voanews.com/Content/responsive/VOA/img/webApp/favicon.ico',
    integrationDoc: 'https://learningenglish.voanews.com/rssfeeds',
    notes: '语速放慢约 1/3，配文本与 MP3；独家内容属美国政府公共领域，最适合聚合（40+ 栏目 RSS）',
  },
  {
    name: 'TED Talks',
    nameZh: 'TED 演讲',
    url: 'https://www.ted.com/',
    category: 'listening',
    tags: ['免费'],
    integration: 'iframe',
    favicon: 'https://www.ted.com/favicon.ico',
    integrationDoc:
      'https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy',
    notes: '带多语字幕与文稿的演讲库；必须用官方 embed.ted.com 播放器嵌入，CC BY-NC-ND',
  },
  {
    name: 'NPR',
    nameZh: '美国公共广播',
    url: 'https://www.npr.org/',
    category: 'listening',
    tags: ['免费'],
    integration: 'rss',
    favicon: 'https://www.npr.org/favicon.ico',
    integrationDoc: 'https://dev.npr.org/',
    notes: '新闻与播客量大、语速自然，适合中高级听力；RSS 非商业可用，须署名并回链原页',
  },
  {
    name: "Randall's ESL Cyber Listening Lab",
    nameZh: 'ESL 听力实验室',
    url: 'https://www.esl-lab.com/',
    category: 'listening',
    tags: ['免费'],
    integration: 'link-only',
    favicon: 'https://www.esl-lab.com/wp-content/uploads/favicon.svg',
    notes: '1998 年至今的易/中/难三级对话听力配测验与文稿；授权最严：禁止转载、镜像、转码音频',
  },
  {
    name: 'LibriVox',
    nameZh: '利维冯公共领域有声书',
    url: 'https://librivox.org/',
    category: 'listening',
    tags: ['免费'],
    integration: 'api',
    favicon: 'https://librivox.org/wp-content/themes/librivox/favicon.ico',
    integrationDoc: 'https://librivox.org/api/info',
    notes: '志愿者朗读的公共领域有声书库；官方 JSON API + 每书 RSS，音频可自由下载',
  },

  // ---- 分级阅读与新闻 ----
  {
    name: 'The Guardian',
    nameZh: '卫报',
    url: 'https://www.theguardian.com/',
    category: 'reading',
    tags: ['免费'],
    integration: 'api',
    favicon: 'https://www.theguardian.com/favicon.ico',
    integrationDoc: 'https://open-platform.theguardian.com/documentation/',
    notes: '唯一含全文的免费非商业新闻 API（1 req/s、500 calls/day、190 万+ 内容）',
  },
  {
    name: 'Breaking News English',
    nameZh: '分级新闻课',
    url: 'https://breakingnewsenglish.com/',
    category: 'reading',
    tags: ['免费'],
    integration: 'link-only',
    favicon: 'https://breakingnewsenglish.com/favicon.ico',
    notes: '0–6 级（120–250 词）每周两篇新闻课，配多语速音频与讲义；禁止转载到任何网站/App',
  },
  {
    name: 'News in Levels',
    nameZh: '三级新闻',
    url: 'https://www.newsinlevels.com/',
    category: 'reading',
    tags: ['免费'],
    integration: 'link-only',
    favicon: 'https://www.newsinlevels.com/wp-content/uploads/images/faviconNiL.png',
    notes: '同一条新闻改写成 Level 1/2/3（1000/2000/3000 词），配英美双音；条款禁止复制内容',
  },
  {
    name: 'Project Gutenberg',
    nameZh: '古腾堡计划',
    url: 'https://www.gutenberg.org/',
    category: 'reading',
    tags: ['免费'],
    integration: 'api',
    favicon: 'https://www.gutenberg.org/gutenberg/favicon.ico',
    integrationDoc: 'https://www.gutenberg.org/ebooks/offline_catalogs.html',
    notes: '最大公共领域电子书库（可商用）；禁止抓取网页与深链文件，须走 OPDS/RSS/批量元数据通道',
  },

  // ---- 背词与记忆 ----
  {
    name: 'Anki / AnkiWeb',
    nameZh: 'Anki 间隔重复闪卡',
    url: 'https://apps.ankiweb.net/',
    category: 'vocab',
    tags: ['免费'],
    integration: 'api',
    favicon: 'https://apps.ankiweb.net/logo.svg',
    integrationDoc: 'https://git.sr.ht/~foosoft/anki-connect',
    notes: '开源 SRS 闪卡；Anki-Connect 插件可被外部程序本地驱动（127.0.0.1:8765，不能云端调用）；iOS 客户端付费',
  },
  {
    name: 'Quizlet',
    nameZh: 'Quizlet 闪卡题库',
    url: 'https://quizlet.com/',
    category: 'vocab',
    tags: ['Freemium'],
    integration: 'iframe',
    faviconFallback: S2('quizlet.com'),
    integrationDoc: 'https://help.quizlet.com/hc/en-ca/articles/360032935851-Embedding-sets',
    notes: '全球最大用户共建闪卡/题库平台；旧 API 已下线，公开卡组仅支持官方 iframe 嵌入（须保留 logo）',
  },
  {
    name: 'Memrise',
    nameZh: 'Memrise 视频记词',
    url: 'https://www.memrise.com/',
    category: 'vocab',
    tags: ['Freemium'],
    integration: 'link-only',
    favicon: 'https://www.memrise.com/hubfs/memrise-flavicon.png',
    notes: '母语者短视频 + 间隔重复；含 IELTS/GCSE 练习模块，无官方 API 或嵌入方案',
  },
  {
    name: 'Duolingo',
    nameZh: '多邻国',
    url: 'https://www.duolingo.com/',
    category: 'vocab',
    tags: ['Freemium'],
    integration: 'link-only',
    favicon: 'https://d35aaqx5ub95lt.cloudfront.net/favicon.ico',
    notes: '游戏化课程全库免费（广告+体力限制）；学习产品无官方 API，另有面向院校的 DET 成绩 API',
  },

  // ---- 口语陪练 ----
  {
    name: 'italki',
    nameZh: 'italki 一对一外教',
    url: 'https://www.italki.com/',
    category: 'speaking',
    tags: ['免费', '付费'],
    integration: 'link-only',
    faviconFallback: S2('italki.com'),
    notes: '150+ 语种一对一教师市场，按课付费无订阅（教师挂牌约 USD 5–32/课），注册免费',
  },
  {
    name: 'Cambly',
    nameZh: 'Cambly 母语外教',
    url: 'https://www.cambly.com/',
    category: 'speaking',
    tags: ['付费'],
    integration: 'link-only',
    faviconFallback: S2('cambly.com'),
    notes: '100% 英语母语外教 24/7 一对一/小组订阅（促销价约 $12/月起），含课程录像、转写与 AI 反馈',
  },
  {
    name: 'HelloTalk',
    nameZh: 'HelloTalk 语言交换',
    url: 'https://www.hellotalk.com/en',
    category: 'speaking',
    tags: ['Freemium'],
    integration: 'link-only',
    favicon: 'https://ali-global-cdn.hellotalk8.com/website/public/icon.svg',
    notes: '7000 万+ 用户的语伴聊天 + 语音房 + 社区；免费可语伴匹配、翻译、语法纠错',
  },
  {
    name: 'Tandem',
    nameZh: 'Tandem 语言交换',
    url: 'https://tandem.net/',
    category: 'speaking',
    tags: ['Freemium'],
    integration: 'link-only',
    favicon: 'https://tandem.net/static/favicon-32x32.png',
    notes: '3500 万+ 学习者的语言交换社区；免费核心功能 + Pro 订阅（AI 工具包、无限翻译、音视频通话）',
  },

  // ---- 考试备考 ----
  {
    name: 'IELTS',
    nameZh: '雅思官方（全球）',
    url: 'https://ielts.org/',
    category: 'exam',
    tags: ['免费', '付费'],
    integration: 'link-only',
    favicon: 'https://ielts.org/dist/images/favicon/favicon-32x32.png',
    notes: 'IELTS Ready Member 免费（6 套分项练习）；Premium 随报名赠送（40 套评分模考 + AI 反馈）',
  },
  {
    name: 'IELTS 中国大陆',
    nameZh: '雅思大陆报名（NEEA）',
    url: 'https://ielts.neea.cn/',
    category: 'exam',
    tags: ['付费'],
    integration: 'link-only',
    favicon: 'https://ielts.neea.cn/favicon.ico',
    notes: 'BC 体系唯一官方报名入口（￥1990/次）；2026-09 起大陆雅思全部机考，考后 3–5 天出分',
  },
  {
    name: 'TOEFL iBT',
    nameZh: '托福官方（ETS）',
    url: 'https://www.ets.org/toefl',
    category: 'exam',
    tags: ['免费', '付费'],
    integration: 'link-only',
    favicon: 'https://www.ets.org/favicon.ico',
    notes: 'TestReady 账号免费含 1 套全长模考 + AI 评分；TPO/官方课程付费',
  },
  {
    name: 'IELTSBRO 雅思哥',
    nameZh: '雅思哥备考平台',
    url: 'https://www.ieltsbro.com/',
    category: 'exam',
    tags: ['Freemium'],
    integration: 'link-only',
    favicon: 'https://www.ieltsbro.com/favicon.ico',
    notes: '免费高仿真 PC 机考模拟软件（剑桥 5–20 全题库）+ App 题库与考场回忆社区',
  },
];
