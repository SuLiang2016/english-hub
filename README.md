# 英语学习导航 English Learning Hub

非商业英语学习资源聚合静态站：32 个精选站点分类导航 + 每日更新的内容流（VOA / BBC / LibriVox）。

选站依据见 [docs/research/english-learning-sites.md](docs/research/english-learning-sites.md)；规格与任务拆分见 [.scratch/english-hub/](.scratch/english-hub/)。

## 开发

```bash
npm install
npm run dev           # 本地开发 http://localhost:4321
npm run fetch         # 单独拉取内容流
npm run build         # fetch + 构建（产出 dist/）
npm run build:offline # 跳过 fetch 直接构建
npm run preview       # 预览构建产物
```

> 内容流源中 VOA / BBC 的域名在中国大陆网络被 DNS 污染，本机抓取会自动回退上次缓存（首次为空态），不影响构建；GitHub Actions 的美国 runner 可正常拉取。本机调试可尝试 Node ≥24 的 `NODE_USE_ENV_PROXY=1 HTTPS_PROXY=... npm run fetch` 走代理。

## 结构

- `src/data/sites.ts` — 32 站点数据（8 分类，含 favicon 兜底路径）
- `src/pages/index.astro` — 首页（卡片墙 + 内容流）

## 版权声明

本项目非商业用途。内容流仅聚合标题/日期/链接（VOA 摘要属公共领域并署名）；各站点名称与图标归原作者所有。数据源授权细则见调研文档 §4.5。
