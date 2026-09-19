# 01 · Astro 项目脚手架

Status: ready-for-agent

## 任务

在仓库根目录初始化最小 Astro ^5 + TypeScript 项目：

- `package.json`（scripts: dev / build / preview）
- `astro.config.mjs`（site/base 留待 issues/07 部署时定）
- `tsconfig.json`（extends astro/tsconfigs/strict）
- `src/pages/index.astro` 占位页
- `README.md`、`.gitignore`

`npm install` 后 `npm run build` 成功即验收。

## Comments

- 2026-09-19 完成（commit 4645325）：Astro 5.18.2 + strict TS；`npm install` 后 `npm run build` 通过。site/base 留待票 07。
