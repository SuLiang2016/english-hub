# 06 · GitHub Actions 每日构建 workflow

Status: ready-for-agent

## 任务

`.github/workflows/deploy.yml`：

- 触发：push 到 main、每日 cron（UTC 22:00 ≈ 北京 06:00）、手动 workflow_dispatch
- 构建：node 22 + npm ci + `npm run build`（CI 内实时拉源）
- 部署：actions/upload-pages-artifact + deploy-pages（permissions 按 Pages 官方模板）
- 并发组 pages，防重叠

验收：yaml 可解析；推送远程后首跑成功（依赖 issues/07 仓库就绪）。
