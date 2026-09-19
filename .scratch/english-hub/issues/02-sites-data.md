# 02 · 站点数据文件 sites.ts

Status: ready-for-agent

## 任务

`src/data/sites.ts`：按 spec 的 schema 录入调研文档全部 32 站，8 分类（§4.1），favicon 用调研核实的完整路径，反爬站点（Quizlet/italki/Cambly/Collins/Grammarly）配 `faviconFallback`（Google s2）。

- 类型：`Site`（name/nameZh/url/favicon?/faviconFallback?/category/tags/integration/integrationDoc?/notes?）
- integration 口径按调研 §0 分层：A/B 层有官方通道的标 `api`/`rss`/`iframe`，C 层标 `link-only`
- 分类归属按调研 §4.1（Cambridge 归词典与查词，发音专区写进 notes）

验收：编译通过；数量与分类断言通过（8 分类 32 卡）。
