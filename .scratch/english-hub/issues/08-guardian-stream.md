# 08 · Guardian 内容流（待启用）

Status: needs-triage

## 背景

调研把 The Guardian Content API 列为内容流优先级第 2（唯一含全文的免费非商业新闻 API，500 calls/day）。v1 未纳入：需要先申请免费 Developer key。

## 任务（key 就绪后）

- 维护者在 <https://open-platform.theguardian.com/access/> 申请免费 key，存为仓库 secret `GUARDIAN_API_KEY`
- 扩展 `scripts/fetch-feeds.mjs`：`https://content.guardianapis.com/search?api-key=...&page-size=5`，仅标题+链接（非商业，须署名）
- 前端内容流加 Guardian 小节

## 备注

非商业用途免费；商业用途（含训练生成式 AI）需 Commercial key。价格与额度见调研 §2.5。
