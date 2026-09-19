# 07 · GitHub Pages 部署

Status: ready-for-human

## 前置（维护者操作）

在 github.com 建一个 **public** 空仓库（建议名 `english-hub`），不要初始化 README。

## 任务（agent 执行）

1. `git remote add origin git@github.com:<user>/english-hub.git` 并推送 main
2. `astro.config.mjs` 设 `site: https://<user>.github.io`、`base: /english-hub`
3. 仓库 Settings → Pages → Source 选 **GitHub Actions**
4. 确认 issues/06 的 workflow 首跑绿，页面可访问

## Comments
