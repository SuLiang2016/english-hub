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

## Comments（部署进行中）

- 2026-09-19/20：remote 已配 `https://github.com/SuLiang2016/english-hub.git`；astro.config site/base 已设（suliang2016.github.io/english-hub）；代码已全部推送。
- CI 三次运行分析：run1/2 失败于 `configure-pages`（Pages 未开启时该步骤直接报错）；run3（92785e9，移除 configure-pages 照搬 study-by-agent 模式）build 全绿，仅 `deploy-pages` 失败 —— 确证仓库 Pages 未开启。deploy-pages 无免管理员权限的自动开启路径（GITHUB_TOKEN 无 administration 权限，enablement:true 会 403）。
- 网络记录：github.com:443 HTTPS 间歇性被重置；本机代理 127.0.0.1:7890 对 github 可用，`git -c http.proxy=... -c https.proxy=... push` 走代理成功；api.github.com 直连可用；ssh.github.com:443 可达但公钥未加入账号。已生成 ~/.ssh/id_ed25519 待用户添加。
- 参考：study-by-agent（同账号）deploy.yml 无 configure-pages，build=withastro/action@v3 + deploy=deploy-pages@v4，其 Pages 为已开启状态。
- 待用户：在 https://github.com/SuLiang2016/english-hub/settings/pages 将 Source 设为 GitHub Actions，然后我推送触发即可完成部署。

## Comments（续）

- 2026-09-20 **部署完成**（commit 616b39f 触发）：用户在网页将 Pages Source 设为 GitHub Actions 后，CI run #4 全绿，https://suliang2016.github.io/english-hub/ 上线。线上核验：32 卡 / 4 内容流块 / 空态 0，BBC 5 条、LibriVox 5 条、VOA 两个栏目均有真实条目。
- 备注：VOA 的 zoneId 播客 feed 最新条目日期偏旧（Everyday Grammar 最新为 2025-03），系 VOA 侧该 podcast feed 更新滞后，非本站问题；若在意时效可后续换更活跃的栏目 feed（记入票 08 一并评估）。
- 经验沉淀：git push 走代理 127.0.0.1:7890；Pages 开启必须管理员网页操作一次。
