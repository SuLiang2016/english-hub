# 03 · 卡片墙页面与样式

Status: ready-for-agent

## 任务

重写 `src/pages/index.astro` + `src/styles/global.css`：

- 页头：站名「英语学习导航 / English Learning Hub」+ 构建时间
- 分类锚点导航（8 chips）+ 内容流锚点
- 卡片：favicon（onerror 换 faviconFallback，再失败隐藏）、站名、中文名、一句话 notes、免费档徽章、接入方式徽章；整卡外链 `target=_blank rel=noopener`
- 简洁浅色风、响应式卡片网格
- 页脚：非商业声明 + 调研文档链接 + 来源署名

验收：`npm run build` 后 dist/index.html 含 32 张卡片、8 个分类区块；截图目检布局无破版。

## Comments

- 2026-09-19 完成（commit f9a7464）：dist 校验 32 卡 / 8 区块；无头 Chrome 整页截图目检通过（favicon、徽章、三行截断、响应式网格均正常）。favicon 兜底逻辑：onerror 换 faviconFallback，再失败隐藏。
