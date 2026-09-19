# 05 · 内容流页面渲染

Status: ready-for-agent

## 任务

在首页追加「今日内容流」区块（锚点 `#streams`）：

- 逐源小节：源名（链到源主页）+ 更新时间 + 5 条条目
- 条目：标题外链 + 日期；VOA 条目附摘要（公共领域）；BBC/LibriVox 仅标题链接
- 署名行：VOA（公共领域）· BBC Learning English（非商业引用）· LibriVox（公共领域）
- streams.json 为空/缺源时显示「暂无内容」空态，不破版

验收：dist/index.html 含 4 源条目链接与 VOA 摘要；空态可渲染。

## Comments

- 2026-09-19 完成（commit 592235b）：4 源块渲染，LibriVox 5 条真实条目 + 3 个空态，署名与逐源更新时间展示；截图目检通过。streams.json 为空源时显示「暂无内容」不破版。
