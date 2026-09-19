# 英语学习导航 English Learning Hub

非商业英语学习资源聚合静态站：32 个精选站点分类导航 + 每日更新的内容流（VOA / BBC / LibriVox）。

选站依据见 [docs/research/english-learning-sites.md](docs/research/english-learning-sites.md)；规格与任务拆分见 [.scratch/english-hub/](.scratch/english-hub/)。

## 开发

```bash
npm install
npm run dev      # 本地开发 http://localhost:4321
npm run build    # 产出 dist/
npm run preview  # 预览构建产物
```

## 结构

- `src/data/sites.ts` — 32 站点数据（8 分类，含 favicon 兜底路径）
- `src/pages/index.astro` — 首页（卡片墙 + 内容流）

## 版权声明

本项目非商业用途。内容流仅聚合标题/日期/链接（VOA 摘要属公共领域并署名）；各站点名称与图标归原作者所有。数据源授权细则见调研文档 §4.5。
