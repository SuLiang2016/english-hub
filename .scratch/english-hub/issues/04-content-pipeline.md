# 04 · 内容流数据管道

Status: ready-for-agent

## 任务

`scripts/fetch-feeds.mjs`（构建前运行）：

- 4 源：VOA Everyday Grammar、VOA Words and Their Stories（RSS，含摘要）、BBC 6 Minute English（RSS，仅标题）、LibriVox 最新有声书（官方 JSON API）
- RSS 解析用 fast-xml-parser；请求设 User-Agent、15s 超时
- 每源取最新 5 条 → `{title, url, date, summary?}`；摘要去 HTML 标签、截断 ~160 字
- 单源失败：保留上次 `streams.json` 中该源数据，脚本退出码仍为 0（不阻塞构建）
- 输出 `src/data/streams.json`（含逐源 fetchedAt），文件入库
- npm scripts：`fetch` 单跑；`build` = fetch + astro build；`build:offline` = 仅 astro build

前置：先用 curl/WebFetch 核实 VOA 两栏目的具体 feed URL（调研只给了目录页）与 LibriVox API 返回字段。

验收：`npm run fetch` 产出 4 源 × ≤5 条；模拟单源失败（改坏一个 URL）时其余源正常、退出码 0。
