# AI666 C端公网静态预览包

生成时间：2026-06-16T11:09:15.301Z

## 用途

本目录是可直接上传到静态托管平台的 C端原型预览包。它只包含当前原型运行所需的 HTML、共享脚本、图片和 Remix Icon SVG，不包含项目规划文档、验证脚本、截图证据或历史材料。

## 上传目录

上传整个目录：

```text
outputs/public-preview/
```

如果平台要求选择 publish/output directory，填写：

```text
outputs/public-preview
```

## 本地命令

```powershell
npm.cmd run build:c-end:public-preview
npm.cmd run validate:c-end:public-preview
```

## 入口

- 根入口：index.html
- 首页：outputs/figma_prototype_work/c-end-home-aggregate-feed-v1/index.html

## 页面清单

- 首页: outputs/figma_prototype_work/c-end-home-aggregate-feed-v1/index.html
- 闪念: outputs/figma_prototype_work/c-end-flash-channel-v1/index.html
- AIGC 体验: outputs/figma_prototype_work/c-end-aigc-experience-center-v2/index.html
- 模型服务: outputs/figma_prototype_work/c-end-model-service-channel-v1/index.html
- AI+: outputs/figma_prototype_work/c-end-ai-plus-channel-v1/index.html
- 搜索: outputs/figma_prototype_work/c-end-search-results-v1/index.html
- 话题广场: outputs/figma_prototype_work/c-end-topic-square-v1/index.html
- 话题聚合: outputs/figma_prototype_work/c-end-topic-aggregate-v1/index.html
- 详情页: outputs/figma_prototype_work/c-end-detail-page-v1/index.html
- 用户主页: outputs/figma_prototype_work/c-end-user-profile-v1/index.html
- 收藏夹: outputs/figma_prototype_work/c-end-favorites-v1/index.html
- 创作服务: outputs/figma_prototype_work/c-end-creation-platform-v2/index.html
- 社区公告: outputs/figma_prototype_work/c-end-announcement-list-v1/index.html

## 边界

- 这是静态原型，不是真实生产站。
- 不连接真实登录、发帖、支付、后台、积分、卡密、API Key 或用户数据。
- 已写入 robots.txt 和 noindex，默认不建议搜索引擎收录。
- GitHub Pages 使用时，根目录包含 .nojekyll，用于避免下划线目录被 Jekyll 忽略。
