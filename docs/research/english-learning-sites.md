# 英语学习网站聚合调研

> 面向对象：通用英语学习者（不限地区，优先国际主流权威资源）
> 用途：构建一个「英语学习资源整合页面」，本文档提供选站清单、页面构建所需元信息、以及 API/RSS/嵌入接入细节。
> 调研日期：2026-08-24。所有 URL 均经实际请求核实；未能核实的项已在「风险与未核实项」中标注。

---

## 0. 结论速览（给页面设计的关键约束）

按「能否被程序化整合」分三层，页面架构应据此分区：

| 层级 | 含义 | 站点 |
| --- | --- | --- |
| **A. 可自由聚合/再分发** | 内容为公共领域或 CC BY-SA，可抓取入库、可展示正文 | VOA Learning English、Project Gutenberg、LibriVox、Wiktionary |
| **B. 有官方接入通道，但受条款约束** | 有官方 API/RSS/iframe，须署名、限非商业或限额 | The Guardian、BBC Learning English、NPR、TED、Merriam-Webster、Collins、Cambridge、YouGlish、Forvo、Quizlet |
| **C. 仅可外链跳转** | 无 API 且/或明确禁止转载、禁止 iframe | Purdue OWL、Breaking News English、ESL-Lab、News in Levels、Oxford Learner's、Longman、Grammarly、Duolingo、Memrise、italki、Cambly、HelloTalk、Tandem、IELTS、TOEFL、雅思哥 |

**由此推导的页面形态建议**：主体是「分类导航卡片墙」（C 层占多数，只能外链）；A/B 层可额外做「今日内容流」模块（拉 RSS/API 展示标题+摘要+跳转链接），以及「查词/发音」内嵌工具区（Wiktionary API + Merriam-Webster API + YouGlish widget）。

---

## 1. 词典 · 语法 · 发音

### 1.1 Cambridge Dictionary
- 官网：<https://dictionary.cambridge.org/>
- favicon：`https://dictionary.cambridge.org/favicon.ico`（200, image/x-icon）；HTML 声明为 `https://dictionary.cambridge.org/external/images/favicon.ico`（200）
- 免费：网站免费；**API 收费**，可申请 30 天免费评估 key，官方明示不为研究/原型提供免费 API
- 接入：
  - API 规范：<https://dictionary-api.cambridge.org/api/specification>（base `https://dictionary.cambridge.org/api/v1`，header `accessKey`）；开发者入口 <https://dictionary-api.cambridge.org/>
  - **免费嵌入**（推荐用于整合页）：搜索小组件 <https://dictionary.cambridge.org/freesearch.html>；双击查词脚本 <https://dictionary.cambridge.org/doubleclick.html>；汇总 <https://dictionary.cambridge.org/develop>
- 简介：学习者最常用的免费在线词典，含语法、同义词与发音专区。

### 1.2 Oxford Learner's Dictionaries
- 官网：<https://www.oxfordlearnersdictionaries.com/>
- favicon：`https://www.oxfordlearnersdictionaries.com/favicon.ico`（200, 15406 B）
- 免费：核心查词/语法免费；OALD premium、Practical English Usage、Collocations 付费
- 接入：**无自助开放 API**。官方商业 API 为独立产品 Oxford Dictionaries API：门户 <https://developer.oxforddictionaries.com/>、文档 <https://developer.oxforddictionaries.com/documentation>、产品页 <https://languages.oup.com/products/oxford-dictionaries-api/>、Sandbox 免费 500 次 <https://account.oxforddictionaries.com/pricing>
- 简介：牛津学习者词典官网，含 Oxford 3000/5000 词表、CEFR 分级与语法练习。

### 1.3 Merriam-Webster（**API 对个人开发者最友好**）
- 官网：<https://www.merriam-webster.com/>
- favicon：`https://www.merriam-webster.com/favicon.ico`（200, image/x-icon）
- 免费：网站免费；**API 非商业免费**，≤1000 次/天/key，最多 2 个词典产品；商业需授权
- 接入：开发者中心 <https://dictionaryapi.com/>；产品列表 <https://dictionaryapi.com/products/index>；JSON 字段说明 <https://dictionaryapi.com/products/json>；注册 <https://dictionaryapi.com/register/index>
  - 示例：`https://www.dictionaryapi.com/api/v3/references/sd2/json/school?key=YOUR_KEY`（返回释义、词源、音频发音、同反义词）
- 简介：美国权威英语词典，提供释义、词源、音频发音与用法专栏。

### 1.4 Longman LDOCE Online
- 官网：<https://www.ldoceonline.com/>
- favicon：`https://www.ldoceonline.com/external/images/favicon.ico`（200）。⚠️ 根路径 `/favicon.ico` 为 **404**
- 免费：网站免费（英美双音、练习、测验）
- 接入：**无有效的公开官方 API 文档**。旧 Pearson Dictionaries API 门户 <https://developer.pearson.com/> 现强制 SSO，旧文档路径返回 401。遗留端点 `https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=hello` 实测仍返回数据，但**无官方支持凭据，不应依赖**
- 简介：朗文当代英语词典，以 2000 词释义、真实语料例句和英美发音见长。

### 1.5 Collins Dictionary
- 官网：<https://www.collinsdictionary.com/>（美区 `/us/`）
- favicon：⚠️ **无法核实**，站点反爬，`/favicon.ico` 与首页 HTML 均 403
- 免费：网站免费；**API 有免费额度 ≤5,000 次/月**，超出按档收费（英语单语 £50/£170/£375 每月；含双语 £75/£400）
- 接入：说明与定价 <https://www.collinsdictionary.com/us/collins-api>；申请 key <https://blog.collinsdictionary.com/collins-api-apply-for-a-key/>；条款 <https://blog.collinsdictionary.com/terms-conditions-collins-api/>；接口文档（实测 200）<https://api.collinsdictionary.com/api/v1/documentation/html/>（端点含 `search`、`search/first`、`didyoumean`、`entries`、`pronunciations`、`wordoftheday`，header `accessKey`）
- 简介：基于 45 亿词 Collins Corpus 的词典，提供释义、例句、音频与双语数据。

### 1.6 Wiktionary（英文版，**完全免费无 key**）
- 官网：<https://en.wiktionary.org/>
- favicon：`https://en.wiktionary.org/favicon.ico`（200, image/vnd.microsoft.icon）
- 免费：✅ 完全免费；内容 CC BY-SA 4.0 + GFDL 双许可，**可再分发**（需署名、同协议）
- 接入：
  - Action API：`https://en.wiktionary.org/w/api.php`（实测 200），文档 <https://www.mediawiki.org/wiki/API:Action_API>
  - REST API：`https://en.wiktionary.org/w/rest.php/v1/...`，文档 <https://www.mediawiki.org/wiki/API:REST_API>；门户 <https://api.wikimedia.org/>
  - ⚠️ 有速率限制（实测高频被 429），须设 User-Agent 并限流，见 <https://www.mediawiki.org/wiki/API:Etiquette>
- 简介：多语言协作免费词典，含词源、IPA、同反义词、押韵与义类表。

### 1.7 YouGlish（**Widget 非商业教育用途免费**）
- 官网：<https://youglish.com/>
- favicon：`https://youglish.com/favicon.ico`（200, 18686 B）；HTML 声明 `https://youglish.com/images/logo.png`
- 免费：网站查询免费；**Widget / JS API 对非商业教育用途免费**；REST API 全部付费（Hobby 500 次/天 €25/月；Small Business 10,000 次/天 €300/月；Corporate 面议）
- 接入：总入口 <https://youglish.com/api>；文档 <https://youglish.com/api/documentation>；**Widget 嵌入** <https://youglish.com/api/doc/widget>；JS API <https://youglish.com/api/doc/js-api>；REST <https://youglish.com/api/doc/rest>（base `https://youglish.com/api/v1/`）；定价 <https://youglish.com/api/plans>
  - 嵌入形式：`<a class="youglish-widget">` + `https://youglish.com/public/emb/widget.js`；**须保留 "Powered by YouGlish.com"**
- 简介：从 2 亿+ 真实 YouTube 片段中检索单词/短语发音与语境（25 种语言）。

### 1.8 Forvo
- 官网：<https://forvo.com/>
- favicon：`https://forvo.com/favicon.ico`（200, 4286 B）
- 免费：网站听发音免费；**API 无免费档**（Non-Profit 500 次/天 $2.00/月，禁商用；Commercial Small Business 10,000 次/天 $28.95/月；Corporate 面议）
- 接入：REST API 入口 <https://api.forvo.com/>；Demo <https://api.forvo.com/demo>；定价 <https://api.forvo.com/plans-and-pricing/>。未见官方 iframe 组件
- 简介：母语者众包发音库，430+ 语言、约 600 万条真人音频（英语 34 万+ 词）。

### 1.9 Grammarly
- 官网：<https://www.grammarly.com/>
- favicon：`https://static.grammarly.com/assets/files/0638f2d0bab8ecad9de6e464b3b80670/favicon.ico`（HTML 声明）。⚠️ `https://www.grammarly.com/favicon.ico` 返回 200 但 **Content-Length=0，不可用**
- 免费：产品有免费档（语法/拼写/标点）；**API 不面向公众**，仅 Enterprise / for Education 机构管理员可申请 OAuth 凭据
- 接入：**不可自助接入，且可嵌入的 Text Editor SDK 已下线（2024-01-10）**。现行 API 文档 <https://developer.grammarly.com/>；OAuth <https://developer.grammarly.com/oauth-credentials.html>；Writing Score API <https://developer.grammarly.com/writing-score-api.html>
- 简介：AI 写作助手，提供语法、拼写、清晰度、语气与抄袭/AI 检测。

### 1.10 Purdue OWL（**明确禁止 iframe**）
- 官网：<https://owl.purdue.edu/owl/index.html>；站点地图 <https://owl.purdue.edu/site_map.html>
- favicon：`https://owl.purdue.edu/favicon.ico`（200）；HTML 声明 `https://www.purdue.edu/purdue/images/favicon.ico`（200）
- 免费：✅ 完全免费，无需注册
- 接入：❌ 无 API。合理使用条款 <https://owl.purdue.edu/owl/about_the_owl/owl_information/fair_use_policy.html> 明文禁止 frame 嵌入、镜像、复制粘贴内容与任何商业用途，**仅允许直接链接**（需署名 Purdue OWL）
- 简介：普渡大学在线写作实验室，免费提供语法、写作流程与 MLA/APA/Chicago/IEEE 引用规范权威指南。

---

## 2. 听力 · 阅读 · 新闻

### 2.1 BBC Learning English
- 官网：<https://www.bbc.co.uk/learningenglish/>
- favicon：`https://www.bbc.co.uk/favicon.ico`（200）。⚠️ learningenglish 页面 HTML 内无 `<link rel=icon>`，须回落域根
- 免费：全部免费（课程、文稿、worksheet、quiz、播客），无登录墙
- 接入：**官方播客 RSS**，格式 `https://podcasts.files.bbci.co.uk/{pid}.rss`
  - 6 Minute English `p02pc9tn`（实测 200，最新 2026-08-20）、Grammar `p02pc9wq`、Vocabulary `p02pc9xz`、Conversations `p02pc9zn`、From the News `p05hw4bq`、Stories `p02pc9s1`、Easy English `p0hsrwv5`、For Work `p0h6ffwg`、中文 `p02pc9st`
  - 汇总页 <https://www.bbc.co.uk/learningenglish/english/podcasts>；无内容 API；须遵守 <https://www.bbc.co.uk/usingthebbc/terms/>，**商业用途需另获授权**
- 简介：BBC 官方英语学习频道，分级音频节目每期配免费文稿、练习单与测验。

### 2.2 VOA Learning English（**公共领域，最适合聚合**）
- 官网：<https://learningenglish.voanews.com/>
- favicon：`https://learningenglish.voanews.com/Content/responsive/VOA/img/webApp/favicon.ico`（200）/ `favicon.svg`（200）。⚠️ 根路径 `/favicon.ico` **404**
- 免费：免费，且 **VOA 独家制作的文本/音频/视频属美国政府公共领域作品**（需署名 voanews.com / VOA；AP 及授权素材除外）。版权页 <https://learningenglish.voanews.com/p/6021.html>
- 接入：RSS 目录 <https://learningenglish.voanews.com/rssfeeds>（40+ 栏目：Health & Lifestyle、Science & Technology、Words and Their Stories、American Stories、Everyday Grammar、Learning English Podcast 等），feed 形如 `https://learningenglish.voanews.com/api/ziiy_l-vomx-tpemgtv`（实测 200, text/xml）。无 REST API
- 简介：VOA 官方分级英语学习站，语速放慢约 1/3，配文本、MP3、PDF，内容属公共领域。

### 2.3 TED
- 官网：<https://www.ted.com/>
- favicon：`https://www.ted.com/favicon.ico`（200, image/x-icon）
- 免费：观看免费；个人/非商业适用 CC BY-NC-ND 4.0；**商业、企业学习、LMS/LXP、体系化课程需付费授权**
- 接入：
  - **官方 iframe 嵌入器**（政策强制使用 TED 播放器，禁止抓取视频）：`https://embed.ted.com/talks/{talk_slug}`（实测 200）
  - 官方 RSS：`https://feeds.feedburner.com/TEDTalks_audio`（200，2789 条，最新 2026-08-23）。⚠️ 视频版 `TEDTalks_video` 停更于 2025-05-21；acast feed 停于 2021；`ted.com/feeds/new_talks.rss` 已 404
  - 无内容 API。政策 <https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy>；授权申请 <https://media-requests.ted.com/>
- 简介：全球演讲视频平台，带多语字幕与文稿，适合听力与学术表达训练。

### 2.4 NPR
- 官网：<https://www.npr.org/>
- favicon：`https://www.npr.org/favicon.ico`（200）
- 免费：内容免费；**API 条款限「个人非商业用途或 501(c)(3) 非营利组织非商业在线使用」**，须署名 "NPR" 并回链原页
- 接入：
  - RSS：`https://feeds.npr.org/{programId}/rss.xml`，如 `https://feeds.npr.org/1001/rss.xml`（News，200）；节目形如 `https://feeds.npr.org/510298/podcast.xml`（TED Radio Hour，200）
  - API：NPR One / Listening / Identity / Authorization 系列，OAuth2，文档站 <https://dev.npr.org/>（⚠️ 调研环境 TLS 握手失败，页面内容**未能读取**，使用前请自行核验）。`https://api.npr.org/query` 无 key 返回 403
  - 条款 <https://legacy.npr.org/about-npr/179876898/terms-of-use>；权限 <https://www.npr.org/about-npr/179881519/rights-and-permissions-information>。官方允许嵌入 NPR media player，但不得删改 logo、不得旁置广告
- 简介：美国公共广播机构，新闻与播客量大、语速自然，适合中高级听力。

### 2.5 The Guardian（**唯一含全文的免费非商业新闻 API**）
- 官网：<https://www.theguardian.com/>
- favicon：`https://www.theguardian.com/favicon.ico`（200, image/x-icon）
- 免费：阅读免费；**Open Platform Content API 非商业免费**（Developer key：1 req/s、500 calls/day、含正文、190 万+ 内容）；商业用途（含训练生成式 AI、文本挖掘）需付费 Commercial key
- 接入：
  - Content API：`https://content.guardianapis.com/search`（`?api-key=test` 实测 200 JSON）；端点含 search / tags / sections / editions / single item
  - RSS：任意索引页加 `/rss`，如 `https://www.theguardian.com/world/rss`（200）；**RSS 仅限个人非商业**
  - 文档 <https://open-platform.theguardian.com/documentation/>；申请 key <https://open-platform.theguardian.com/access/>；RSS 说明 <https://www.theguardian.com/help/feeds>
- 简介：英国主流媒体，提供含全文的免费非商业新闻 API，适合真实语料阅读源。

### 2.6 Breaking News English
- 官网：<https://breakingnewsenglish.com/>
- favicon：`https://breakingnewsenglish.com/favicon.ico`（200, image/x-icon）
- 免费：免费（个人站，另售电子书赞助）。**授权严格**：允许打印给自己学生、允许直链 html 页面；**禁止**直链 mp3、禁止转载到任何网站/App/LMS/社媒/视频平台、禁止售卖或货币化
- 接入：播客 RSS `https://breakingnewsenglish.com/rss.xml`（200, application/xml；⚠️ XML 有实体转义错误需容错解析，channel 元数据陈旧标注 2021）。无 API、无嵌入组件。版权页 <https://breakingnewsenglish.com/copyright.html>
- 简介：按 0–6 级（120–250 词）每周两篇新闻课，配多语速音频、在线测验与 PDF 讲义。

### 2.7 News in Levels
- 官网：<https://www.newsinlevels.com/>
- favicon：`https://www.newsinlevels.com/wp-content/uploads/images/faviconNiL.png`（200, image/png）。⚠️ `/favicon.ico` 返回 text/html，不可用
- 免费：网页版免费（含广告）；App 免费+内购订阅。条款第 2 条禁止复制内容
- 接入：⚠️ RSS `https://www.newsinlevels.com/feed/` 虽 200，但 **lastBuildDate 停在 2021-04-29，已不可作为内容源**。无 API、无嵌入。条款 <https://www.newsinlevels.com/terms/>
- 简介：同一条新闻改写成 Level 1/2/3（1000/2000/3000 词），每篇配英美双音朗读。

### 2.8 Randall's ESL Cyber Listening Lab
- 官网：<https://www.esl-lab.com/>
- favicon：`https://www.esl-lab.com/wp-content/uploads/favicon.svg`（200）。⚠️ HTML 声明的 `favicon.png` 与 `cropped-favicon_1-32x32.png` 均 404，`/favicon.ico` 返回 text/html——**只能用 SVG**
- 免费：在线使用免费；**授权最严**：禁止转载、镜像、下载/转码音频、上传到任何服务器或 LMS，商业与教育再发布均需购买 license
- 接入：⚠️ RSS `https://www.esl-lab.com/feed/`（200，最新 2026-08-23）**仅含站点更新公告，不含听力活动条目**。无 API，只能外链。条款 <https://www.esl-lab.com/copyright_terms/>
- 简介：Randall S. Davis 自 1998 年运营的 ESL 听力站，易/中/难三级对话听力配测验与文稿。

### 2.9 Project Gutenberg（**公共领域，可商用**）
- 官网：<https://www.gutenberg.org/>
- favicon：`https://www.gutenberg.org/gutenberg/favicon.ico`（200, HTML 声明）；根路径 `/favicon.ico` 亦 200
- 免费：完全免费，绝大多数电子书**美国境内公共领域**，可商用/再发布/改编；仅 "Project Gutenberg" 商标的商业使用需付版税
- 接入（⚠️ 官方明示「网站仅供人类访问，机器抓取会被封 IP」，必须走以下通道）：
  - OPDS：`https://www.gutenberg.org/ebooks/search.opds/`（200, atom+xml）；⚠️ XML OPDS 预计 2027 下线，JSON OPDS2 测试中
  - 新书 RSS：`https://www.gutenberg.org/cache/epub/feeds/today.rss`（200）
  - 批量元数据：`https://www.gutenberg.org/cache/epub/feeds/pg_catalog.csv`、XML/RDF、MARC（每周日重建），元数据属公共领域
  - 批量下载白名单：`https://www.gutenberg.org/robot/harvest?filetypes[]=html`
  - 文档：离线目录 <https://www.gutenberg.org/ebooks/offline_catalogs.html>；机器访问政策 <https://www.gutenberg.org/policy/robot_access.html>；许可与署名 <https://www.gutenberg.org/policy/permission.html>（要求链接书籍落地页，**禁止深链具体文件**）
- 简介：最大的公共领域电子书库，提供 txt/HTML/EPUB 与结构化目录元数据。

### 2.10 LibriVox（**有官方 JSON API，公共领域**）
- 官网：<https://librivox.org/>
- favicon：`https://librivox.org/wp-content/themes/librivox/favicon.ico`（200, HTML 声明）；根路径亦 200
- 免费：完全免费，**文本与朗读录音均为公共领域**
- 接入：官方 REST API（状态 released）`https://librivox.org/api/feed/audiobooks`，支持 `id/since/author/title/genre/extended/coverart/limit/offset`，格式 xml/json/jsonp/serialized/php；另有 `/api/feed/audiotracks`、`/api/feed/authors`
  - 实测：`https://librivox.org/api/feed/audiobooks/?id=52&format=json` → 200 JSON，含 `url_rss`、`url_zip_file`、`totaltime`、`sections`
  - 每书 RSS：`https://librivox.org/rss/{id}`。文档 <https://librivox.org/api/info>
- 简介：志愿者朗读的公共领域有声书库，官方 API + 每书 RSS，音频可自由下载与商用。

---

## 3. 刷词 · 练习 · 口语 · 考试

### 3.1 Duolingo
- 官网：<https://www.duolingo.com/>；测试业务线 <https://englishtest.duolingo.com/>
- favicon：`https://d35aaqx5ub95lt.cloudfront.net/favicon.ico`（200）。⚠️ `duolingo.com/favicon.ico` 返回 text/html（SPA fallback），不可用
- 免费：Freemium。免费全课程 + 广告 + 体力限制；Super / Max 订阅制。⚠️ 官方未公开统一价目表（区域定价 + 平台内购），价格未核实
- 接入：学习产品**无官方公开 API**（GitHub 上 KartikTalwar/Duolingo、duolingo4d 等均为逆向工程，ToS 禁止抓取）。Duolingo English Test 有**机构 API**（仅对接收成绩的院校开放，需登录）：<https://englishtest.duolingo.com/dashboard/resources/api>；入口 <https://englishtest.duolingo.com/resources>
- 简介：游戏化外语学习 App，免费可用全部课程，另有面向院校的 DET 测试及成绩 API。

### 3.2 Anki / AnkiWeb（**唯一可本地程序化驱动的 SRS**）
- 官网：<https://apps.ankiweb.net/>（桌面端）、<https://ankiweb.net/>（同步与共享卡组）
- favicon：`https://apps.ankiweb.net/logo.svg`（200）。⚠️ `/favicon.ico` 为 404，站点仅声明 `<link rel="icon" href="/logo.svg">`
- 免费：桌面版（Win/macOS/Linux，当前 26.08.1）免费开源；AnkiWeb 同步免费；AnkiDroid 免费；**AnkiMobile (iOS) $24.99 一次性买断**
- 接入：社区插件 **Anki-Connect**，本地 HTTP JSON-RPC `127.0.0.1:8765`
  - 文档 <https://git.sr.ht/~foosoft/anki-connect>；插件页 <https://ankiweb.net/shared/info/2055492159>（2025-11 仍更新）
  - 示例：`POST http://127.0.0.1:8765`，body `{"action":"deckNames","version":6}`；支持 `addNote / findCards / cardsInfo / storeMediaFile / sync`；可选 `apiKey`，跨域需配 `webCorsOriginList`
  - ⚠️ 本地 API，需用户本机运行 Anki，**不能服务端云调用**
- 简介：开源间隔重复闪卡工具，可通过 Anki-Connect 被外部程序本地驱动。

### 3.3 Quizlet（**有官方 iframe 嵌入**）
- 官网：<https://quizlet.com/>；帮助中心 <https://help.quizlet.com/>
- favicon：⚠️ quizlet.com 对非浏览器请求一律 **403**（含 `/favicon.ico` 与首页 HTML）。可用代理 `https://www.google.com/s2/favicons?domain=quizlet.com&sz=64`（200 png）
- 免费：Freemium。免费账号可用闪卡/练习题/交互图示；付费为 Quizlet Plus / Plus Unlimited / teachers / 家庭 / 团体。⚠️ 官方帮助中心不公布金额，价格未核实。订阅说明 <https://help.quizlet.com/hc/en-ca/articles/360041181691>
- 接入：**旧 Quizlet API 2.0 与开发者面板均已下线**（`quizlet.com/api-dashboard` 实测 404，第三方 wrapper 全部失效）。官方支持方式为 **iframe 嵌入**：文档 <https://help.quizlet.com/hc/en-ca/articles/360032935851-Embedding-sets>
  - 公开卡组可嵌 Match / Learn / Test / Flashcards / Spell 模式，形如
    `<iframe src="https://quizlet.com/<setId>/match/embed" height="500" width="100%" style="border:0"></iframe>`
  - ⚠️ 嵌入必带 Quizlet logo，不可移除
- 简介：全球最大的用户共建闪卡/题库平台，无公开 API，仅提供官方 iframe 嵌入。

### 3.4 Memrise
- 官网：<https://www.memrise.com/>；应用 <https://app.memrise.com/>
- favicon：`https://www.memrise.com/hubfs/memrise-flavicon.png`（200）
- 免费：Freemium。定价页 <https://app.memrise.com/payment/plans> 有月/年/永久三档。⚠️ 价格随区域与促销动态变化（抓取时中文区显示月 ¥78 / 年 ¥298 / 永久 ¥1,498，含限时倒计时），**不宜作为固定报价**
- 接入：**未找到任何官方开发者门户或 API 文档**，无嵌入方案
- 简介：母语者短视频 + 间隔重复的语言学习平台，含 IELTS/GCSE/A-Level 练习模块。

### 3.5 italki
- 官网：<https://www.italki.com/>；帮助中心 <https://support.italki.com/>
- favicon：⚠️ 对非浏览器请求 **403**。代理 `https://www.google.com/s2/favicons?domain=italki.com&sz=64`（200 png）
- 免费：注册免费、**无订阅**，按课付费（先购 italki Credits 再约课）。教师自主定价，教师列表页 <https://www.italki.com/en/teachers> 实测挂牌区间 **USD 5–32 / 试听或每小时**；分 Professional Teacher 与 Community Tutor 两档
- 接入：**无官方开发者 API**。官方仅有联盟/推广计划：说明 <https://support.italki.com/hc/en-us/articles/4405697269785-What-is-the-italki-Affiliate-Program>；申请 <https://www.italki.com/affiliates>（新用户首充返佣 ≥$10 USD）。GitHub `PatriceVignola/italki-api` 为非官方逆向库（末次发布 2018）
- 简介：全球最大的一对一语言教师市场（150+ 语种），按课付费无订阅。

### 3.6 Cambly
- 官网：<https://www.cambly.com/>；订阅页 <https://www.cambly.com/en/subscribe>
- favicon：⚠️ 对非浏览器请求 **403**。代理 `https://www.google.com/s2/favicons?domain=cambly.com&sz=64`（200 png）
- 免费：**纯订阅制，无免费练习额度**。官方三档起价（促销价）：Small Groups 约 $12/月起（原 $24）、Private+ 约 $28/月起（原 $56）、Pro 约 $40/月起（原 $80）；按每周课时数（2/3/5/10 节 × 30 分钟）与周期（月/季/年，年付约 5 折）计价
- 接入：**无官方 API**。仅有 Ambassador 推广计划 <https://www.cambly.com/en/english/ambassador>（被推荐用户消费满 $50 后起步 $30/单）
- 简介：100% 英语母语外教的 24/7 一对一/小组口语订阅平台，含课程录像、转写与 AI 反馈。

### 3.7 HelloTalk
- 官网：<https://www.hellotalk.com/en>；中文站 <https://www.hellotalk.net/zh-hans>；网页版 <https://web.hellotalk.com/>
- favicon：`https://ali-global-cdn.hellotalk8.com/website/public/icon.svg`（200）
- 免费：Freemium。官网明示 "practice **for free** by chatting with native speakers"，免费即可语伴匹配、翻译、语法纠错、Voiceroom；VIP 解锁无限翻译、多语言同时学。⚠️ **官网不公布价格**（仅 App 内展示，`/en/pricing` 实测 404）。官方数据：7000 万+ 用户、200+ 国家、260+ 语言
- 接入：**未找到任何官方 API 或嵌入方案**
- 简介：语伴一对一聊天 + Voiceroom 语音房 + Moments 社区的语言交换 App。

### 3.8 Tandem
- 官网：<https://tandem.net/>；帮助中心 <https://tandem.zendesk.com/hc/en-us>
- favicon：`https://tandem.net/static/favicon-32x32.png`（200）
- 免费：Freemium。免费可用 Community 找语伴、文字/语音消息、基础纠错；Tandem Pro 为 1/3/12 个月订阅，功能清单 <https://tandem.zendesk.com/hc/en-us/articles/360045166332>（AI 工具包、语音转文字、无限翻译、音视频通话、私密 Language Parties、每日 30 个新联系人、去广告）。⚠️ 帮助中心不列价格；App Store 内购项显示 Pro 12 个月 USD 59.90。官方数据：3500 万+ 学习者、300+ 语言
- 接入：**无公开 API**。仅有 B2B 合作通道（Typeform 申请）：企业版 <https://tandem.net/pages/partnerships/companies>；语言学校版 <https://tandem.net/pages/partnerships/language-schools>（可为学生赠送 3 个月 Pro）
- 简介：全球语言交换社区（互教互学 + 语音房），免费核心功能 + Pro 订阅。

### 3.9 IELTS（全球官网）
- 官网：<https://ielts.org/>（British Council、IDP、Cambridge 三方共有）
- favicon：`https://ielts.org/dist/images/favicon/favicon-32x32.png`（200）。⚠️ `/favicon.ico` 为 404，须解析 HTML `<link rel="icon">`
- 免费：考试付费；备考资源分两档（British Council IELTS Ready）：
  - **IELTS Ready Member** — 免费，注册即得无需报名：6 套分项练习测试、机考体验、视频与专家提示。入口 <https://takeielts.britishcouncil.org/take-ielts/prepare/ielts-ready>
  - **IELTS Ready Premium** — 报名后免费（官方称价值约 US$170）：40 套评分练习测试（写作/口语可选 AI 反馈）、Mini Mock Test、直播与录播课、范文、个人化 dashboard
- 接入：无公开 API、无官方嵌入
- 简介：雅思全球官网，官方 IELTS Ready 备考资源免费或随报名赠送。

### 3.10 IELTS 中国大陆官方渠道
- **报名（BC 体系，唯一官方入口）**：<https://ielts.neea.cn/>（教育部教育考试院）；favicon `https://ielts.neea.cn/favicon.ico`（200）
- **中文资讯官网（BC）**：<https://www.chinaielts.org/>；⚠️ favicon 为**内嵌 data-URI SVG**（红色四圆点 BC 标志），无独立文件，`/favicon.ico` 为 404，须从 HTML `<link rel="icon" href="data:image/svg+xml,...">` 内联提取
- **报名（IDP 体系）**：<https://idpielts.cn/>；favicon `https://idpielts.cn/favicon.ico`（200）
- **收费（NEEA 官方公告）**：2026 年起 IELTS / IELTS for UKVI 均为 **￥1990**；UKVI Life Skills ￥1250；转考/退考手续费统一 ￥380。来源 <https://news.neea.cn/IELTS/zh_CN/4411D51FC3C4BAEFE0630746C80A3901.html>
- **重要变更（官方）**：中国大陆 IELTS 自 2026-09-01 起停止纸笔、全部机考；IELTS for UKVI 自 2026-07-01 起全机考；机考考后 3–5 天出分、考前 3 日截止报名。来源 <https://www.chinaielts.org/press-office/IELTS-Chinese-Mainland-Exam-Registration-2026-7-9>
- 接入：无 API
- 简介：大陆雅思有 BC（ielts.neea.cn + chinaielts.org）与 IDP（idpielts.cn）两套互不相通的官方报名体系。

### 3.11 TOEFL（ETS 官方）
- 官网：全球 <https://www.ets.org/toefl>；中国官网 <https://toefl.cn/>；大陆报名 <https://toefl.neea.cn/>；备考平台 <https://toeflibt.ets.org/>
- favicon（均 200）：`https://www.ets.org/favicon.ico`、`https://toefl.cn/favicon.ico`、`https://toefl.neea.cn/favicon.ico`
- 免费：**TOEFL TestReady 账号免费**，含 1 套完整全长模考（AI 自动评分 + 四项反馈 + 口语写作建议）、Free Activity of the Day、免费个性化学习计划、Section Test/Practice 试用样题。入口 <https://www.ets.org/toefl/test-takers/ibt/prepare/toefl-testready.html>
  - 付费（ETS 官方标价）：Official TOEFL iBT Prep Course $149、OG 口袋版 $29、TPO 1 次 $49 / 3 次 $99 / 6 次 $179（中国区另有 ¥599 / ¥1080 限时价）
- 接入：未找到面向开发者的公开 API 或嵌入方案（院校成绩传输走机构专用渠道，非公开文档）
- 简介：ETS 官方托福体系，TestReady 提供免费全长模考 + AI 评分。

### 3.12 雅思哥 IELTSBRO（中文备考平台）
- 官网：<https://www.ieltsbro.com/>；品牌介绍 <https://www.ieltsbro.com/about>；App 包名 `com.chutzpah.yasibro`
- favicon：`https://www.ieltsbro.com/favicon.ico`（200）
- 免费：Freemium。
  - **PC 端机考模拟软件官方自述「免费」**，支持 Windows / macOS / 鸿蒙，内置剑桥雅思 5–20 全题库，含仿真与轻松两种模考模式
  - App 会员四档：免费（当季口语题库、四科基础练习、考场回忆「考圈」、公开课、训练营）/ VIPLite / VIP / SVIP（机经 Pro、写作范文、口语与写作 AI 评测、督学带练）
  - ⚠️ 会员具体价格官网未公开，未核实
- 接入：无 API
- 简介：中文雅思备考平台（官方称累计服务超 1000 万考生），核心是免费高仿真 PC 机考模拟软件 + App 题库/考场回忆社区。

---

## 4. 页面构建建议（基于上述接入能力）

### 4.1 推荐的分类结构
1. **词典与查词** — Cambridge、Oxford Learner's、Merriam-Webster、Longman、Collins、Wiktionary
2. **发音与语音** — YouGlish、Forvo、Cambridge（发音专区）
3. **语法与写作** — Purdue OWL、Grammarly、BBC Learning English（Grammar）、Oxford（练习）
4. **听力与播客** — BBC Learning English、VOA、TED、NPR、ESL-Lab、LibriVox
5. **分级阅读与新闻** — The Guardian、Breaking News English、News in Levels、Project Gutenberg
6. **背词与记忆** — Anki、Quizlet、Memrise、Duolingo
7. **口语陪练** — italki、Cambly、HelloTalk、Tandem
8. **考试备考** — IELTS 官方、IELTS 大陆报名、TOEFL、雅思哥、Duolingo English Test

### 4.2 卡片数据字段建议
```
{
  name, name_zh, url, favicon, favicon_fallback,
  category, tags: ["免费" | "Freemium" | "付费"],
  integration: "api" | "rss" | "iframe" | "link-only",
  integration_doc, notes
}
```
- `favicon_fallback` 必填：Quizlet / italki / Cambly 因 403 只能走 `https://www.google.com/s2/favicons?domain={domain}&sz=64`
- Longman / IELTS / Anki / VOA / News in Levels / ESL-Lab 的 `/favicon.ico` 无效，须用本文档给出的完整路径
- chinaielts.org 图标为内联 data-URI，需自行提取或换用文字/自绘图标

### 4.3 可做「动态内容流」的数据源（按优先级）
| 优先 | 源 | 方式 | 约束 |
| --- | --- | --- | --- |
| 1 | VOA Learning English | RSS | 公共领域，可展示正文，署名 VOA |
| 2 | The Guardian Content API | API（免费 key，500/天） | 非商业、需署名 |
| 3 | LibriVox | 官方 JSON API | 公共领域 |
| 4 | Project Gutenberg | OPDS + today.rss + pg_catalog.csv | 禁抓网页、禁深链文件 |
| 5 | BBC Learning English 播客 | RSS | 非商业，遵守 BBC ToS |
| 6 | NPR | RSS | 非商业 + 署名 + 回链 |
| 7 | TED | RSS（audio）+ embed.ted.com | 必须用官方播放器，CC BY-NC-ND |

⚠️ 不要用：News in Levels RSS（停更 2021）、TEDTalks_video（停更 2025-05）、ESL-Lab RSS（只有站点公告）。

### 4.4 可内嵌的交互工具（无需自建后端）
- Cambridge 免费搜索小组件 / 双击查词脚本 —— 免费
- YouGlish Widget —— 非商业教育用途免费，须保留 "Powered by YouGlish.com"
- Quizlet 卡组 iframe —— 须保留 Quizlet logo
- TED `embed.ted.com/talks/{slug}` iframe —— 非商业
- Merriam-Webster API（1000 次/天免费）—— 可做自建查词框（含音频）
- Wiktionary Action/REST API（免费无 key）—— 须设 User-Agent 并限流

### 4.5 法律红线（务必遵守）
- **禁止 iframe**：Purdue OWL（条款明文）
- **禁止转载/镜像**：Breaking News English、ESL-Lab、News in Levels
- **禁止深链媒体文件**：Breaking News English（mp3）、Project Gutenberg（书籍文件）
- **商业化前必须重新评估**：BBC、TED、NPR、The Guardian、Merriam-Webster、Collins、YouGlish、Forvo（全部区分商业/非商业授权）

---

## 5. 风险与未核实项

| 项 | 状态 |
| --- | --- |
| Collins favicon | 无法核实（403 反爬拦截） |
| Longman 官方 API 文档 | 已不可公开访问（旧文档 401，门户强制 SSO）；遗留端点可返回数据但无官方支持 |
| Oxford Learner's 站内 `/api/v1` | 文档页可访问但接口实测 403，非官方对外产品，不可作为公开 API 使用 |
| Grammarly Text Editor SDK 停用公告 | 结论成立（2024-01-10 停用），但官方原公告页已 404，仅第三方转述可引 |
| `https://dev.npr.org/` 及其条款子页 | 调研环境 TLS 握手失败，**页面内容未读取**；域名存在性由 NPR 官方 Terms of Use 内链交叉确认，使用前请自行核验 |
| Duolingo Super/Max、Quizlet Plus、Memrise Pro、HelloTalk VIP、Tandem Pro、雅思哥 VIP 的确切价格 | 官方页面均不公开静态价目表（区域定价 / 应用内购 / 需登录），按「禁止编造」原则留空 |
| Wiktionary API 速率 | 免费无 key，但实测高频被 429，须设 User-Agent 并限流 |