# 英语学习导航 English Learning Hub — v1 Spec

Status: ready-for-agent

## 目标

非商业静态站：把调研过的 32 个英语学习站点做成分类导航卡片墙，并为可聚合源提供每日更新的内容流。

- 受众：中文英语学习者
- 定位：非商业（自用 / 公开分享）
- 数据来源：`docs/research/english-learning-sites.md`（2026-08-24 实测调研）

## v1 范围

1. **卡片墙**：32 站 × 8 分类，字段与 favicon 兜底规则按调研 §4.1 / §4.2
2. **内容流**：4 源 × 最新 5 条
   - VOA Learning English — Everyday Grammar（公共领域，可显示摘要）
   - VOA Learning English — Words and Their Stories（公共领域，可显示摘要）
   - BBC 6 Minute English 播客（非商业 RSS，仅标题+链接）
   - LibriVox 最新有声书（公共领域，标题+链接）
3. **构建期拉取**：`npm run build` 先执行 fetch 脚本再构建；单源失败回退上次缓存，不阻塞构建
4. **每日定时构建**：GitHub Actions（UTC 22:00 ≈ 北京时间 06:00）
5. **部署**：GitHub Pages（前置：维护者在 github.com 建 public 仓库，见 issues/07）

## 非目标（v2 候选）

- 内嵌查词/发音工具（Wiktionary、Merriam-Webster、YouGlish widget）
- Guardian 内容流（需先申请免费 API key）→ 见 `issues/08-guardian-stream.md`
- 深色模式、站内搜索/筛选、多语言 UI

## 架构

- Astro ^5 + TypeScript（strict），纯静态，无服务端、无前端框架
- `src/data/sites.ts`：手工维护的站点数据（来源：调研文档）
- `scripts/fetch-feeds.mjs`：构建前拉源 → `src/data/streams.json`（入库，含逐源 fetchedAt）
- 页面全部构建期渲染，读 JSON 生成 HTML

## 法律红线（实现必须遵守，摘自调研 §4.5）

- 内容流只出标题/日期/链接；VOA 额外可显示摘要（公共领域，需署名 VOA）
- 不 iframe Purdue OWL；不转载 Breaking News English / ESL-Lab / News in Levels 内容
- favicon 用调研核实路径；Quizlet / italki / Cambly / Collins / Grammarly 用 Google s2 兜底
- 页脚注明非商业属性与来源署名

## 验收标准

- `npm ci && npm run build` 本地成功
- 首页含 8 分类 32 卡片，favicon 加载失败有兜底
- 内容流区块 4 源 × ≤5 条；断网或单源失效时构建仍成功
- deploy workflow 文件就绪（push / 每日 / 手动触发）
