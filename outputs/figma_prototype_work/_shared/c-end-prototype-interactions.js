(function () {
  const PAGE_DIRS = {
    "首页": "c-end-home-aggregate-feed-v1",
    "闪念": "c-end-flash-channel-v1",
    "AIGC": "c-end-aigc-experience-center-v2",
    "模型服务": "c-end-model-service-channel-v1",
    "AI+": "c-end-ai-plus-channel-v1"
  };

  const CHANNEL_PAGE_DIRS = new Set([
    "c-end-flash-channel-v1",
    "c-end-aigc-experience-center-v2",
    "c-end-model-service-channel-v1",
    "c-end-ai-plus-channel-v1"
  ]);

  const STANDARD_TOPIC_MODULE_SELECTOR = [
    "[data-right-module='topics']",
    "[data-right-module='recommended-topic']",
    "[data-right-module='related-topics']"
  ].join(",");

  const STANDARD_RECOMMENDED_TOPICS = [
    ["Vibe Coding", "2.1k"],
    ["Agent", "1.8k"],
    ["RAG 应用", "1.6k"],
    ["ComfyUI", "1.3k"],
    ["API 排错", "982"],
    ["MCP Server", "876"]
  ];
  const STANDARD_TOPIC_ICON_SRC = "../../../resources/icons/remixicon/svg/Editor/hashtag.svg";

  const REVIEW_PAGES = [
    ["首页", "c-end-home-aggregate-feed-v1"],
    ["闪念", "c-end-flash-channel-v1"],
    ["AIGC体验", "c-end-aigc-experience-center-v2"],
    ["模型服务", "c-end-model-service-channel-v1"],
    ["AI+", "c-end-ai-plus-channel-v1"],
    ["搜索", "c-end-search-results-v1"],
    ["公告", "c-end-announcement-list-v1"],
    ["话题广场", "c-end-topic-square-v1"],
    ["话题聚合", "c-end-topic-aggregate-v1"],
    ["详情", "c-end-detail-page-v1"],
    ["用户主页", "c-end-user-profile-v1"],
    ["收藏夹", "c-end-favorites-v1"],
    ["创作服务", "c-end-creation-platform-v2"]
  ];

  const STATE_LABELS = {
    "c-end-home-aggregate-feed-v1": [
      ["default", "推荐"],
      ["following", "关注"],
      ["latest", "最新"],
      ["hot", "热门"]
    ],
    "c-end-flash-channel-v1": [
      ["default", "时间流"],
      ["compose", "发闪念"],
      ["code", "代码片段"],
      ["media", "图片视频"],
      ["comments", "评论展开"],
      ["comments-all", "全部评论"]
    ],
    "c-end-aigc-experience-center-v2": [
      ["default", "推荐"],
      ["image", "图像生成"],
      ["edit", "图像编辑"],
      ["video", "视频创作"],
      ["comic", "漫剧生成"],
      ["success", "生成成功"],
      ["insufficient", "点数不足"],
      ["reward", "任务返还"]
    ],
    "c-end-model-service-channel-v1": [
      ["default", "全部"],
      ["text", "文本"],
      ["image", "图像"],
      ["audio", "音频"],
      ["video", "视频"],
      ["provider", "供应商"],
      ["hover", "卡片悬停"],
      ["empty", "筛选空态"],
      ["loading", "加载"],
      ["failed", "失败"]
    ],
    "c-end-ai-plus-channel-v1": [
      ["default", "精选"],
      ["latest", "最新"],
      ["hot", "热门"],
      ["following", "关注"],
      ["workflow", "工作流"],
      ["skill", "Skill"],
      ["mcp", "MCP"],
      ["tutorial", "教程案例"],
      ["empty", "关注空态"],
      ["loading", "加载"],
      ["failed", "失败"]
    ],
    "c-end-announcement-list-v1": [
      ["default", "社区公告"],
      ["detail", "隐私公告"],
      ["empty", "空态"],
      ["loading", "加载"],
      ["failed", "失败"]
    ],
    "c-end-search-results-v1": [
      ["default", "全部"],
      ["content", "内容"],
      ["topic", "话题"],
      ["model", "模型服务"],
      ["ai-plus", "AI+资源"],
      ["loading", "加载"],
      ["no-results", "无结果"],
      ["load-failed", "失败"]
    ],
    "c-end-topic-square-v1": [
      ["default", "全部话题"],
      ["ai-coding", "AI Coding"],
      ["model-api", "模型与 API"],
      ["aigc", "AIGC"],
      ["workflow", "工作流"],
      ["skill-mcp", "Skill/MCP"],
      ["tutorial", "教程案例"],
      ["newest", "最新活跃"],
      ["followed", "已关注"],
      ["empty", "分类空态"],
      ["loading", "加载"],
      ["failed", "失败"]
    ],
    "c-end-topic-aggregate-v1": [
      ["default", "推荐"],
      ["followed", "已关注"],
      ["latest", "最新"],
      ["empty", "无内容"],
      ["loading", "加载"],
      ["failed", "失败"],
      ["unavailable", "不可用"],
      ["login-required", "登录关注"]
    ],
    "c-end-detail-page-v1": [
      ["default", "默认"],
      ["comments", "评论面板"],
      ["no-comments", "无评论"],
      ["logged-out", "未登录"],
      ["unavailable", "不可见"],
      ["load-failed", "加载失败"],
      ["permission-denied", "权限不足"],
      ["article", "文章"],
      ["image-text", "图文"],
      ["video", "视频"],
      ["model", "模型服务"],
      ["workflow", "工作流"],
      ["skill", "Skill"],
      ["mcp", "MCP"],
      ["aigc", "AIGC"],
      ["flash", "闪念"]
    ],
    "c-end-user-profile-v1": [
      ["default", "我的主页"],
      ["incomplete", "资料待完善"],
      ["other", "作者主页"],
      ["followed", "已关注作者"],
      ["edit", "资料编辑"],
      ["phone", "手机号绑定"],
      ["wechat", "微信绑定"],
      ["following", "关注列表"],
      ["fans", "粉丝列表"],
      ["no-content", "无内容"]
    ],
    "c-end-favorites-v1": [
      ["default", "全部收藏"],
      ["article", "文章"],
      ["aigc", "AIGC"],
      ["model", "模型服务"],
      ["tag-api", "API标签"],
      ["empty", "空态"]
    ],
    "c-end-creation-platform-v2": [
      ["home", "首页"],
      ["management", "内容管理"],
      ["drafts", "草稿箱"],
      ["analytics", "数据概览"],
      ["guide", "创作规范"],
      ["editor-flash", "闪念编辑"],
      ["editor-article", "文章编辑"],
      ["editor-image", "图文编辑"],
      ["editor-video", "视频编辑"],
      ["skill-mode", "Skill路径"],
      ["skill-github", "Skill GitHub"],
      ["skill-custom", "Skill自定义"],
      ["mcp-mode", "MCP路径"],
      ["mcp-github", "MCP GitHub"],
      ["mcp-custom", "MCP自定义"],
      ["reviewing", "审核中"],
      ["rejected", "未通过"],
      ["published", "已发布"]
    ]
  };

  const TAB_STATE = {
    "c-end-home-aggregate-feed-v1": { "推荐": "default", "关注": "following", "最新": "latest", "热门": "hot" },
    "c-end-flash-channel-v1": { "推荐": "default", "关注": "following", "最新": "latest", "热门": "hot" },
    "c-end-ai-plus-channel-v1": {
      "精选": "default",
      "最新": "latest",
      "热门": "hot",
      "关注": "following",
      "工作流": "workflow",
      "Skill": "skill",
      "MCP": "mcp",
      "教程案例": "tutorial"
    },
    "c-end-search-results-v1": {
      "全部": "default",
      "内容": "content",
      "话题": "topic",
      "模型服务": "model",
      "AI+资源": "ai-plus"
    },
    "c-end-topic-square-v1": {
      "全部话题": "default",
      "AI Coding": "ai-coding",
      "模型与API": "model-api",
      "AIGC": "aigc",
      "工作流": "workflow",
      "Skill/MCP": "skill-mcp",
      "教程案例": "tutorial",
      "热度": "default",
      "最新活跃": "newest",
      "已关注": "followed"
    },
    "c-end-topic-aggregate-v1": { "推荐": "default", "最新": "latest" }
  };

  function currentDir() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts[parts.length - 2] || "";
  }

  function normalize(text) {
    return (text || "").replace(/\s+/g, "").trim();
  }

  function prototypeRootPath() {
    const marker = "/outputs/figma_prototype_work/";
    const markerIndex = window.location.pathname.indexOf(marker);
    if (markerIndex >= 0) {
      return window.location.pathname.slice(0, markerIndex + marker.length);
    }
    return marker;
  }

  function pageUrl(dir, state) {
    const suffix = state ? `?state=${encodeURIComponent(state)}` : "";
    if (window.location.protocol === "file:") {
      return new URL(`../${dir}/index.html${suffix}`, window.location.href).href;
    }
    return `${window.location.origin}${prototypeRootPath()}${dir}/index.html${suffix}`;
  }

  function navigate(dir, state) {
    window.location.href = pageUrl(dir, state);
  }

  function setStateUrl(state) {
    if (window.location.protocol === "file:") return;
    window.history.replaceState(null, "", pageUrl(currentDir(), state));
  }

  function showToast(message) {
    const old = document.querySelector("[data-prototype-toast]");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "prototype-toast";
    toast.setAttribute("data-prototype-toast", "true");
    toast.textContent = message;
    document.body.appendChild(toast);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.remove(), 2200);
  }

  function injectStyle() {
    if (document.querySelector("[data-prototype-style]")) return;
    const style = document.createElement("style");
    style.setAttribute("data-prototype-style", "true");
    style.textContent = `
      html.prototype-preview,
      html.prototype-preview body,
      html.prototype-preview * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }

      html.prototype-preview::-webkit-scrollbar,
      html.prototype-preview body::-webkit-scrollbar,
      html.prototype-preview *::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important;
      }

      .topbar {
        position: sticky !important;
        top: 0 !important;
        z-index: 1200 !important;
      }

      html.prototype-preview.prototype-has-topbar:not(.prototype-creation-workbench) body {
        padding-top: 72px !important;
        padding-bottom: 72px !important;
      }

      html.prototype-preview.prototype-has-topbar:not(.prototype-creation-workbench) .topbar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: auto !important;
        width: 1920px !important;
      }

      .topbar.is-scrolled {
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.10) !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .topbar {
        height: 72px !important;
        background: rgba(255, 255, 255, 0.88) !important;
        border-bottom: 1px solid rgba(219, 227, 239, 0.86) !important;
        backdrop-filter: blur(16px) !important;
        color: #151b26 !important;
        font: 400 16px/normal -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        letter-spacing: 0 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-shell {
        width: 1440px !important;
        max-width: 1440px !important;
        height: 72px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        display: grid !important;
        grid-template-columns: 220px 438px 430px 280px !important;
        gap: 24px !important;
        align-items: center !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand {
        width: 220px !important;
        height: 47px !important;
        min-width: 0 !important;
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        flex-shrink: 0 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand > div:not(.brand-mark) {
        width: 128px !important;
        min-width: 0 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand-mark {
        width: 62px !important;
        height: 42px !important;
        border-radius: 0 !important;
        position: relative !important;
        display: block !important;
        object-fit: contain !important;
        background: transparent !important;
        box-shadow: none !important;
        color: transparent !important;
        font-size: 0 !important;
        font-weight: 400 !important;
        line-height: 0 !important;
        flex: 0 0 auto !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand-mark::before,
      html.prototype-preview:not(.prototype-creation-workbench) .brand-mark::after {
        display: none !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand-mark::before {
        display: none !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand-mark::after {
        display: none !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand-name {
        display: block !important;
        font-size: 24px !important;
        line-height: 28px !important;
        font-weight: 900 !important;
        color: #121826 !important;
        width: 128px !important;
        transform: skewX(-8deg) scaleX(1.04) !important;
        transform-origin: left center !important;
        text-shadow: 1px 0 0 #121826 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .brand-sub {
        display: block !important;
        margin: 2px 0 0 !important;
        font-size: 12px !important;
        line-height: 14px !important;
        font-weight: 680 !important;
        color: #6b6b6b !important;
        width: 128px !important;
        white-space: nowrap !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) [data-primary-nav],
      html.prototype-preview:not(.prototype-creation-workbench) .primary-nav,
      html.prototype-preview:not(.prototype-creation-workbench) .nav {
        width: 438px !important;
        height: 72px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 8px !important;
        margin: 0 !important;
        flex-shrink: 0 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item {
        height: 72px !important;
        padding: 0 14px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: relative !important;
        font-size: 14px !important;
        line-height: 20px !important;
        font-weight: 400 !important;
        color: #5f5f5f !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        letter-spacing: 0 !important;
        box-sizing: border-box !important;
        white-space: nowrap !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item:nth-child(1) {
        width: 58px !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item:nth-child(2) {
        width: 58px !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item:nth-child(3) {
        width: 63px !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item:nth-child(4) {
        width: 88px !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item:nth-child(5) {
        width: 54px !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item.active {
        color: #242424 !important;
        font-weight: 500 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .nav-item.active::after {
        content: "" !important;
        position: absolute !important;
        left: 14px !important;
        right: 14px !important;
        bottom: 0 !important;
        height: 1px !important;
        border-radius: 0 !important;
        background: #242424 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-search {
        width: 430px !important;
        height: 42px !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        padding: 0 14px !important;
        border: 1px solid #dbe3ef !important;
        border-radius: 8px !important;
        background: #ffffff !important;
        box-shadow: 0 8px 24px rgba(22, 32, 54, 0.04) !important;
        color: #151b26 !important;
        font-size: 16px !important;
        font-weight: 400 !important;
        line-height: normal !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-search img {
        width: 18px !important;
        height: 18px !important;
        opacity: 0.62 !important;
        flex: 0 0 auto !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-search input {
        width: 100% !important;
        border: 0 !important;
        outline: 0 !important;
        background: transparent !important;
        font-size: 14px !important;
        line-height: 20px !important;
        color: #151b26 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        letter-spacing: 0 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-search input::placeholder {
        color: #98a2b3 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-actions {
        width: 280px !important;
        height: 40px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        gap: 14px !important;
        margin: 0 !important;
        flex-shrink: 0 !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) [data-creator-button],
      html.prototype-preview:not(.prototype-creation-workbench) .creator-button,
      html.prototype-preview:not(.prototype-creation-workbench) .creator-btn,
      html.prototype-preview:not(.prototype-creation-workbench) .create-btn {
        min-width: 116px !important;
        height: 40px !important;
        padding: 0 16px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px !important;
        border: 0 !important;
        border-radius: 8px !important;
        background: #101828 !important;
        color: #ffffff !important;
        font-size: 14px !important;
        line-height: 20px !important;
        font-weight: 650 !important;
        box-shadow: 0 12px 26px rgba(16, 24, 40, 0.18) !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) [data-creator-button] img,
      html.prototype-preview:not(.prototype-creation-workbench) .creator-button img,
      html.prototype-preview:not(.prototype-creation-workbench) .creator-btn img,
      html.prototype-preview:not(.prototype-creation-workbench) .create-btn img {
        width: 16px !important;
        height: 16px !important;
        filter: invert(1) !important;
        flex: 0 0 auto !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-actions .icon-btn,
      html.prototype-preview:not(.prototype-creation-workbench) .top-actions .icon-button {
        width: 40px !important;
        height: 40px !important;
        padding: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border: 1px solid #e7ecf3 !important;
        border-radius: 20px !important;
        background: #ffffff !important;
        box-shadow: none !important;
        flex: 0 0 auto !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-actions .icon-btn img,
      html.prototype-preview:not(.prototype-creation-workbench) .top-actions .icon-button img {
        width: 18px !important;
        height: 18px !important;
        flex: 0 0 auto !important;
      }

      html.prototype-preview:not(.prototype-creation-workbench) .top-actions .avatar {
        width: 40px !important;
        height: 40px !important;
        border: 2px solid #ffffff !important;
        border-radius: 999px !important;
        object-fit: cover !important;
        flex: 0 0 auto !important;
      }

      html.prototype-channel-page [data-channel-head] {
        display: none !important;
      }

      html.prototype-channel-page [data-tabs-card],
      html.prototype-channel-page [data-tabs-bar] {
        height: 58px !important;
        min-height: 58px !important;
        margin: 0 0 16px !important;
        padding: 0 20px !important;
        border: 1px solid var(--line, #e6ebf2) !important;
        border-radius: 8px !important;
        background: rgba(255, 255, 255, 0.96) !important;
        box-shadow: 0 12px 28px rgba(22, 32, 54, 0.06) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        overflow: hidden !important;
      }

      html.prototype-channel-page [data-tabs],
      html.prototype-channel-page [data-tabs-bar] .tabs {
        height: 58px !important;
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
      }

      html.prototype-channel-page [data-tab] {
        height: 58px !important;
        padding: 0 12px !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        color: #667085 !important;
        font-size: 15px !important;
        line-height: 20px !important;
        font-weight: 650 !important;
      }

      html.prototype-channel-page [data-tab].active {
        color: #0f766e !important;
      }

      html.prototype-channel-page [data-tab].active::after {
        content: "" !important;
        position: absolute !important;
        left: 12px !important;
        right: 12px !important;
        bottom: 0 !important;
        height: 3px !important;
        border-radius: 3px 3px 0 0 !important;
        background: #16b8a6 !important;
      }

      html.prototype-channel-page .new-pill,
      html.prototype-channel-page [data-topic-chips],
      html.prototype-channel-page .tab-actions,
      html.prototype-channel-page [data-tabs-bar] > .ghost-btn {
        display: none !important;
      }

      html.prototype-preview.prototype-canvas-standard .layout,
      html.prototype-preview.prototype-canvas-standard [data-main-layout],
      html.prototype-preview.prototype-canvas-standard [data-flash-layout],
      html.prototype-preview.prototype-canvas-standard [data-aigc-layout],
      html.prototype-preview.prototype-canvas-standard [data-model-layout],
      html.prototype-preview.prototype-canvas-standard [data-ai-plus-layout],
      html.prototype-preview.prototype-canvas-standard [data-search-layout],
      html.prototype-preview.prototype-canvas-standard [data-topic-layout],
      html.prototype-preview.prototype-canvas-standard [data-detail-layout],
      html.prototype-preview.prototype-canvas-standard [data-layout] {
        width: 1240px !important;
        max-width: 1240px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        display: grid !important;
        grid-template-columns: 820px 340px !important;
        column-gap: 24px !important;
        gap: 24px !important;
        align-items: start !important;
      }

      html.prototype-preview.prototype-canvas-standard [data-main-panel],
      html.prototype-preview.prototype-canvas-standard [data-main-list],
      html.prototype-preview.prototype-canvas-standard .main-panel,
      html.prototype-preview.prototype-canvas-standard .feed {
        width: 820px !important;
        min-width: 0 !important;
        max-width: 820px !important;
      }

      html.prototype-preview.prototype-dir-c-end-announcement-list-v1 [data-announcement-layout],
      html.prototype-preview.prototype-dir-c-end-announcement-list-v1 .announcement-layout {
        width: 1440px !important;
        max-width: 1440px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        display: block !important;
        grid-template-columns: none !important;
        column-gap: 0 !important;
        gap: 0 !important;
      }

      html.prototype-preview.prototype-dir-c-end-announcement-list-v1 [data-main-panel],
      html.prototype-preview.prototype-dir-c-end-announcement-list-v1 .panel {
        width: 1440px !important;
        min-width: 0 !important;
        max-width: 1440px !important;
      }

      html.prototype-preview.prototype-canvas-standard [data-right-rail],
      html.prototype-preview.prototype-canvas-standard .right-rail {
        width: 340px !important;
        min-width: 340px !important;
        max-width: 340px !important;
      }

      html.prototype-preview.prototype-canvas-standard .works-grid,
      html.prototype-preview.prototype-canvas-standard .service-grid,
      html.prototype-preview.prototype-canvas-standard .resource-grid,
      html.prototype-preview.prototype-canvas-standard .loading-grid,
      html.prototype-preview.prototype-canvas-standard .skeleton-grid {
        width: 100% !important;
        max-width: 100% !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }

      html.prototype-preview.prototype-canvas-standard .prompt-layout {
        width: 100% !important;
        max-width: 100% !important;
        grid-template-columns: minmax(0, 1fr) !important;
      }

      html.prototype-preview.prototype-canvas-standard .featured-work,
      html.prototype-preview.prototype-canvas-standard .prompt-panel {
        min-width: 0 !important;
      }

      html.prototype-preview.prototype-creation-workbench [data-work-shell] {
        width: 1240px !important;
        max-width: 1240px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        grid-template-columns: 220px 672px 300px !important;
        gap: 24px !important;
      }

      .nav-item,
      [data-creator-button],
      [data-publish-button],
      .creator-button,
      .creator-btn,
      .create-btn,
      .top-search,
      [data-feed-item],
      [data-flash-card],
      [data-work-card],
      [data-service-card],
      [data-resource-card],
      [data-result-card],
      [data-topic-card],
      [data-topic-square-card],
      [data-topic-rail],
      .topic-tag,
      [data-topic-chip],
      .prototype-topic-chip-unified,
      [data-api-action] {
        cursor: pointer;
      }

      [data-prototype-shell] {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 1600;
        width: 360px;
        max-height: min(560px, calc(100vh - 48px));
        overflow: auto;
        padding: 14px;
        border: 1px solid rgba(18, 107, 255, 0.18);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0 18px 44px rgba(15, 23, 42, 0.18);
        backdrop-filter: blur(14px);
        color: #172033;
        font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      [data-prototype-shell] * {
        box-sizing: border-box;
      }

      .prototype-shell-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }

      .prototype-shell-title {
        font-size: 14px;
        font-weight: 700;
        color: #172033;
      }

      .prototype-shell-close {
        border: 0;
        background: #edf4ff;
        color: #126bff;
        border-radius: 999px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        font-size: 16px;
        line-height: 24px;
      }

      .prototype-shell-group {
        margin-top: 10px;
      }

      .prototype-shell-label {
        margin-bottom: 7px;
        color: #697386;
        font-size: 12px;
        font-weight: 600;
      }

      .prototype-shell-links {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .prototype-shell-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 28px;
        padding: 5px 10px;
        border: 1px solid #d8e4f5;
        border-radius: 999px;
        background: #f7fbff;
        color: #25324a;
        text-decoration: none;
        white-space: nowrap;
      }

      .prototype-shell-link.active {
        border-color: #126bff;
        background: #126bff;
        color: #ffffff;
      }

      .prototype-creator-popover {
        position: fixed;
        top: 66px;
        right: 348px;
        z-index: 1500;
        width: 384px;
        padding: 12px;
        border: 1px solid rgba(18, 107, 255, 0.16);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 18px 46px rgba(15, 23, 42, 0.16);
        display: none;
      }

      .prototype-creator-popover.visible {
        display: block;
      }

      .prototype-creator-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }

      .prototype-creator-item {
        border: 1px solid #e4ebf5;
        border-radius: 8px;
        padding: 10px;
        background: #f8fbff;
        color: #1f2a44;
        font-size: 13px;
        line-height: 18px;
        cursor: pointer;
      }

      .prototype-creator-item strong {
        display: block;
        margin-bottom: 2px;
        font-size: 13px;
        color: #0f766e;
      }

      .prototype-topic-more {
        width: 28px;
        height: 28px;
        margin: 12px 14px 0 auto;
        box-sizing: border-box;
        border: 1px solid #e8e8e8;
        border-radius: 999px;
        background: #ffffff;
        color: transparent;
        font-size: 0;
        line-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .prototype-topic-more::after {
        content: "";
        width: 14px;
        height: 14px;
        display: block;
        opacity: 0.78;
        background: url("../../../resources/icons/remixicon/svg/Arrows/arrow-right-s-line.svg") center / contain no-repeat;
      }

      [data-right-module] .right-title a,
      [data-right-module] .rail-head .rail-more,
      [data-right-module] .rail-head .rail-link,
      [data-right-module] .rail-head .small-link,
      [data-right-module] .rail-title small {
        width: 24px !important;
        height: 24px !important;
        padding: 0 !important;
        overflow: hidden !important;
        border: 0 !important;
        border-radius: 999px !important;
        background: transparent !important;
        color: transparent !important;
        font-size: 0 !important;
        line-height: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-decoration: none !important;
      }

      [data-right-module] .right-title a::after,
      [data-right-module] .rail-head .rail-more::after,
      [data-right-module] .rail-head .rail-link::after,
      [data-right-module] .rail-head .small-link::after,
      [data-right-module] .rail-title small::after {
        content: "" !important;
        width: 14px !important;
        height: 14px !important;
        display: block !important;
        opacity: 0.78 !important;
        background: url("../../../resources/icons/remixicon/svg/Arrows/arrow-right-s-line.svg") center / contain no-repeat !important;
      }

      [data-topic-rail-standard] {
        padding: 0 0 16px !important;
        overflow: hidden !important;
      }

      [data-topic-rail-standard] .rail-head,
      [data-topic-rail-standard] .right-title {
        height: 48px !important;
        padding: 0 18px !important;
        margin: 0 0 12px !important;
        border-bottom: 1px solid #e6edf5 !important;
        box-sizing: border-box !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
      }

      [data-topic-rail-standard] .rail-title,
      [data-topic-rail-standard] .rail-head strong,
      [data-topic-rail-standard] .right-title h3 {
        margin: 0 !important;
        color: #111827 !important;
        font: 760 16px/22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      }

      [data-topic-rail-standard] .rail-head .rail-more,
      [data-topic-rail-standard] .rail-head .rail-link,
      [data-topic-rail-standard] .rail-head .small-link,
      [data-topic-rail-standard] .right-title a,
      [data-topic-rail-standard] .rail-title small {
        display: none !important;
      }

      [data-topic-rail-standard] .prototype-topic-list {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 8px !important;
        padding: 0 12px !important;
        margin: 0 !important;
      }

      [data-topic-rail-standard] .prototype-topic-pill {
        width: 100%;
        min-width: 0;
        height: 26px;
        padding: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: #475467;
        font: 650 13px/18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        cursor: pointer;
      }

      [data-topic-rail-standard] .prototype-topic-label {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      [data-topic-rail-standard] .prototype-topic-icon {
        flex: 0 0 auto;
        width: 14px;
        height: 14px;
        opacity: 0.72;
      }

      [data-topic-rail-standard] .prototype-topic-name {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      [data-topic-rail-standard] .prototype-topic-count {
        flex: 0 0 auto;
        color: #98a2b3;
        font-weight: 650;
      }

      .prototype-topic-chip-unified {
        display: inline-flex !important;
        align-items: center !important;
        height: 24px !important;
        min-height: 24px !important;
        padding: 0 8px !important;
        border: 0 !important;
        border-radius: 999px !important;
        background: #f4f7fb !important;
        color: #667085 !important;
        font: 650 12px/18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        letter-spacing: 0 !important;
        white-space: nowrap !important;
        box-shadow: none !important;
      }

      .prototype-toast {
        position: fixed;
        left: 50%;
        bottom: 34px;
        z-index: 1900;
        transform: translateX(-50%);
        min-width: 260px;
        max-width: 520px;
        padding: 11px 16px;
        border-radius: 999px;
        background: rgba(23, 32, 51, 0.92);
        color: #fff;
        box-shadow: 0 18px 42px rgba(15, 23, 42, 0.22);
        font: 13px/18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        text-align: center;
      }

      @media (max-width: 960px) {
        [data-prototype-shell] {
          right: 12px;
          left: 12px;
          bottom: 12px;
          width: auto;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function injectHomeVisualSkin() {
    if (document.querySelector("[data-home-visual-skin]")) return;
    const style = document.createElement("style");
    style.setAttribute("data-home-visual-skin", "true");
    style.textContent = `
      html.prototype-preview.prototype-ai666-home-skin,
      html.prototype-preview.prototype-ai666-home-skin body {
        background: #ffffff !important;
        color: #242424 !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        letter-spacing: 0 !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: geometricPrecision;
      }

      html.prototype-preview.prototype-ai666-home-skin * {
        letter-spacing: 0 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin ::selection {
        background: #242424 !important;
        color: #ffffff !important;
      }

      html.prototype-preview.prototype-ai666-home-skin body,
      html.prototype-preview.prototype-ai666-home-skin .page {
        background: #ffffff !important;
        background-image: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .page::before,
      html.prototype-preview.prototype-ai666-home-skin .page::after,
      html.prototype-preview.prototype-ai666-home-skin body::before,
      html.prototype-preview.prototype-ai666-home-skin body::after {
        display: none !important;
        background: none !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .topbar {
        background: #ffffff !important;
        border-bottom: 1px solid #f2f2f2 !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        color: #242424 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .topbar.is-scrolled {
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar {
        height: 72px !important;
        background: #ffffff !important;
        border-bottom: 1px solid #f2f2f2 !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        color: #242424 !important;
        font-family: sohne, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", sans-serif !important;
        letter-spacing: 0 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .nav-shell {
        width: 1440px !important;
        max-width: 1440px !important;
        height: 72px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        display: grid !important;
        grid-template-columns: 220px 438px 430px 280px !important;
        column-gap: 26px !important;
        align-items: center !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand {
        width: 220px !important;
        height: 47px !important;
        min-width: 0 !important;
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        flex: 0 0 auto !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand > div:not(.brand-mark),
      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand-copy {
        width: 128px !important;
        min-width: 0 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand-mark {
        width: 62px !important;
        height: 42px !important;
        flex: 0 0 62px !important;
        display: block !important;
        object-fit: contain !important;
        border-radius: 0 !important;
        background: transparent !important;
        background-image: none !important;
        box-shadow: none !important;
        color: transparent !important;
        font-size: 0 !important;
        line-height: 0 !important;
        filter: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand-mark::before,
      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand-mark::after {
        content: none !important;
        display: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand-name {
        display: block !important;
        width: 128px !important;
        color: #242424 !important;
        font-size: 24px !important;
        line-height: 28px !important;
        font-weight: 900 !important;
        transform: skewX(-8deg) scaleX(1.04) !important;
        transform-origin: left center !important;
        text-shadow: 1px 0 0 currentColor !important;
        white-space: nowrap !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .brand-sub {
        display: block !important;
        width: 128px !important;
        margin: 2px 0 0 !important;
        color: #6b6b6b !important;
        font-size: 12px !important;
        line-height: 14px !important;
        font-weight: 680 !important;
        white-space: nowrap !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar [data-primary-nav],
      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .primary-nav,
      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .nav {
        width: 438px !important;
        height: 72px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 8px !important;
        margin: 0 !important;
        flex: 0 0 auto !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .nav-item,
      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar [data-primary-nav] .nav-item {
        height: 72px !important;
        padding: 0 14px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: relative !important;
        box-sizing: border-box !important;
        color: #5f5f5f !important;
        font-family: sohne, "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei", sans-serif !important;
        font-size: 14px !important;
        line-height: 20px !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
        white-space: nowrap !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .nav-item.active {
        color: #242424 !important;
        font-weight: 500 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-has-topbar .topbar .nav-item.active::after {
        content: "" !important;
        position: absolute !important;
        left: 14px !important;
        right: 14px !important;
        bottom: 0 !important;
        height: 1px !important;
        border-radius: 0 !important;
        background: #242424 !important;
        background-image: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-creation-workbench .topbar,
      html.prototype-preview.prototype-ai666-home-skin.prototype-creation-workbench .topbar-inner {
        height: 72px !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-creation-workbench .topbar-inner {
        align-items: center !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .top-search {
        height: 38px !important;
        border: 1px solid #efefef !important;
        border-radius: 999px !important;
        background: #fafafa !important;
        box-shadow: none !important;
        color: #242424 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .top-search input,
      html.prototype-preview.prototype-ai666-home-skin .top-search span {
        color: #777777 !important;
        font-size: 14px !important;
        font-weight: 400 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .top-actions {
        gap: 10px !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .creator-btn,
      html.prototype-preview.prototype-ai666-home-skin .creator-button,
      html.prototype-preview.prototype-ai666-home-skin .create-btn,
      html.prototype-preview.prototype-ai666-home-skin .shop-button,
      html.prototype-preview.prototype-ai666-home-skin .top-action {
        min-height: 36px !important;
        border: 1px solid transparent !important;
        border-radius: 999px !important;
        background: transparent !important;
        box-shadow: none !important;
        color: #242424 !important;
        font-size: 14px !important;
        font-weight: 520 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .creator-btn:hover,
      html.prototype-preview.prototype-ai666-home-skin .creator-button:hover,
      html.prototype-preview.prototype-ai666-home-skin .create-btn:hover,
      html.prototype-preview.prototype-ai666-home-skin .shop-button:hover,
      html.prototype-preview.prototype-ai666-home-skin .top-action:hover {
        border-color: #efefef !important;
        background: #fafafa !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .icon-btn,
      html.prototype-preview.prototype-ai666-home-skin .icon-button,
      html.prototype-preview.prototype-ai666-home-skin .icon-action,
      html.prototype-preview.prototype-ai666-home-skin .quick-action {
        border: 0 !important;
        border-radius: 999px !important;
        background: transparent !important;
        box-shadow: none !important;
        color: #3f3f3f !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .icon-btn:hover,
      html.prototype-preview.prototype-ai666-home-skin .icon-button:hover,
      html.prototype-preview.prototype-ai666-home-skin .icon-action:hover,
      html.prototype-preview.prototype-ai666-home-skin .quick-action:hover {
        background: #f7f7f7 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin img[data-icon],
      html.prototype-preview.prototype-ai666-home-skin button img[src*="remixicon"],
      html.prototype-preview.prototype-ai666-home-skin .top-search img,
      html.prototype-preview.prototype-ai666-home-skin .rail-item-main img,
      html.prototype-preview.prototype-ai666-home-skin .rail-head img,
      html.prototype-preview.prototype-ai666-home-skin .panel-title img,
      html.prototype-preview.prototype-ai666-home-skin .card-actions img {
        opacity: 0.82 !important;
        filter: brightness(0) saturate(100%) invert(23%) sepia(7%) saturate(432%) hue-rotate(169deg) brightness(94%) contrast(90%) !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .layout,
      html.prototype-preview.prototype-ai666-home-skin [data-main-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-flash-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-aigc-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-model-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-ai-plus-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-search-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-topic-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-detail-layout],
      html.prototype-preview.prototype-ai666-home-skin [data-layout] {
        column-gap: 32px !important;
      }

      html.prototype-preview.prototype-ai666-home-skin [data-right-rail],
      html.prototype-preview.prototype-ai666-home-skin .right-rail,
      html.prototype-preview.prototype-ai666-home-skin .rail {
        background: transparent !important;
        border-left: 1px solid #f2f2f2 !important;
        padding-left: 24px !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-card,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module] {
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        padding: 0 0 22px !important;
        border-bottom: 1px solid #f2f2f2 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-card:last-child,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module]:last-child {
        border-bottom: 0 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-title,
      html.prototype-preview.prototype-ai666-home-skin .rail-head,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module] h2,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module] h3 {
        color: #242424 !important;
        font-size: 15px !important;
        line-height: 22px !important;
        font-weight: 620 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-more,
      html.prototype-preview.prototype-ai666-home-skin .rail-link,
      html.prototype-preview.prototype-ai666-home-skin .small-link,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module] a:not([data-ad-link]):not([data-ad-slide]) {
        width: 24px !important;
        height: 24px !important;
        padding: 0 !important;
        overflow: hidden !important;
        border: 0 !important;
        border-radius: 999px !important;
        background: transparent !important;
        color: transparent !important;
        font-size: 0 !important;
        line-height: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-decoration: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-more::after,
      html.prototype-preview.prototype-ai666-home-skin .rail-link::after,
      html.prototype-preview.prototype-ai666-home-skin .small-link::after,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module] a:not([data-ad-link]):not([data-ad-slide])::after {
        content: "" !important;
        width: 14px !important;
        height: 14px !important;
        display: block !important;
        opacity: 0.78 !important;
        background: #3f3f3f !important;
        -webkit-mask: url("../../../resources/icons/remixicon/svg/Arrows/arrow-right-s-line.svg") center / contain no-repeat !important;
        mask: url("../../../resources/icons/remixicon/svg/Arrows/arrow-right-s-line.svg") center / contain no-repeat !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-more img,
      html.prototype-preview.prototype-ai666-home-skin .rail-link img,
      html.prototype-preview.prototype-ai666-home-skin .small-link img,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module] a img {
        display: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-row,
      html.prototype-preview.prototype-ai666-home-skin .term-item,
      html.prototype-preview.prototype-ai666-home-skin .topic-item {
        min-height: 36px !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        color: #3f3f3f !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-row + .rail-row,
      html.prototype-preview.prototype-ai666-home-skin .term-item + .term-item,
      html.prototype-preview.prototype-ai666-home-skin .topic-item + .topic-item {
        border-top: 1px solid #f5f5f5 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .rail-sub,
      html.prototype-preview.prototype-ai666-home-skin .rail-count,
      html.prototype-preview.prototype-ai666-home-skin .term-count,
      html.prototype-preview.prototype-ai666-home-skin .topic-count {
        color: #8a8a8a !important;
        font-size: 12px !important;
        font-weight: 420 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .feed-item,
      html.prototype-preview.prototype-ai666-home-skin [data-feed-item],
      html.prototype-preview.prototype-ai666-home-skin .content-card,
      html.prototype-preview.prototype-ai666-home-skin [data-topic-card],
      html.prototype-preview.prototype-ai666-home-skin [data-result-card],
      html.prototype-preview.prototype-ai666-home-skin .result-card,
      html.prototype-preview.prototype-ai666-home-skin [data-flash-card],
      html.prototype-preview.prototype-ai666-home-skin .flash-card,
      html.prototype-preview.prototype-ai666-home-skin [data-favorite-card],
      html.prototype-preview.prototype-ai666-home-skin .favorite-card,
      html.prototype-preview.prototype-ai666-home-skin [data-service-card],
      html.prototype-preview.prototype-ai666-home-skin .service-card,
      html.prototype-preview.prototype-ai666-home-skin [data-resource-card],
      html.prototype-preview.prototype-ai666-home-skin .resource-card,
      html.prototype-preview.prototype-ai666-home-skin [data-work-card],
      html.prototype-preview.prototype-ai666-home-skin .work-card,
      html.prototype-preview.prototype-ai666-home-skin [data-template-card],
      html.prototype-preview.prototype-ai666-home-skin .template-card,
      html.prototype-preview.prototype-ai666-home-skin .goal-card,
      html.prototype-preview.prototype-ai666-home-skin .publish-card,
      html.prototype-preview.prototype-ai666-home-skin .mode-card,
      html.prototype-preview.prototype-ai666-home-skin .hero-card,
      html.prototype-preview.prototype-ai666-home-skin .filter-card,
      html.prototype-preview.prototype-ai666-home-skin .tabs-card,
      html.prototype-preview.prototype-ai666-home-skin .workbench,
      html.prototype-preview.prototype-ai666-home-skin [data-experience-workbench],
      html.prototype-preview.prototype-ai666-home-skin .list-card,
      html.prototype-preview.prototype-ai666-home-skin .panel,
      html.prototype-preview.prototype-ai666-home-skin .input-panel,
      html.prototype-preview.prototype-ai666-home-skin .cost-panel,
      html.prototype-preview.prototype-ai666-home-skin .state-card,
      html.prototype-preview.prototype-ai666-home-skin .status-card,
      html.prototype-preview.prototype-ai666-home-skin .status-pill,
      html.prototype-preview.prototype-ai666-home-skin .data-card,
      html.prototype-preview.prototype-ai666-home-skin .draft-item,
      html.prototype-preview.prototype-ai666-home-skin .manage-row,
      html.prototype-preview.prototype-ai666-home-skin .markdown-preview-card,
      html.prototype-preview.prototype-ai666-home-skin .markdown-card-surface,
      html.prototype-preview.prototype-ai666-home-skin .login-banner,
      html.prototype-preview.prototype-ai666-home-skin .skeleton-card {
        border: 1px solid #f1f1f1 !important;
        border-radius: 6px !important;
        background: #ffffff !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .feed-item:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-feed-item]:hover,
      html.prototype-preview.prototype-ai666-home-skin .content-card:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-topic-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-result-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin .result-card:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-flash-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-favorite-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-service-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin .service-card:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-resource-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin .resource-card:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-work-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin .work-card:hover,
      html.prototype-preview.prototype-ai666-home-skin [data-template-card]:hover,
      html.prototype-preview.prototype-ai666-home-skin .goal-card:hover,
      html.prototype-preview.prototype-ai666-home-skin .publish-card:hover,
      html.prototype-preview.prototype-ai666-home-skin .mode-card:hover {
        border-color: #dddddd !important;
        background: #fcfcfc !important;
        transform: translateY(-1px);
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-home-aggregate-feed-v1 .feed-item,
      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-topic-aggregate-v1 .content-card.feed-item,
      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-search-results-v1 .result-card,
      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-flash-channel-v1 [data-flash-card] {
        border: 0 !important;
        border-bottom: 1px solid #f2f2f2 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-home-aggregate-feed-v1 .feed-item:hover,
      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-topic-aggregate-v1 .content-card.feed-item:hover,
      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-search-results-v1 .result-card:hover,
      html.prototype-preview.prototype-ai666-home-skin.prototype-dir-c-end-flash-channel-v1 [data-flash-card]:hover {
        border-bottom-color: #dfdfdf !important;
        background: #fcfcfc !important;
        transform: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .topic-header,
      html.prototype-preview.prototype-ai666-home-skin [data-topic-header],
      html.prototype-preview.prototype-ai666-home-skin .square-hero,
      html.prototype-preview.prototype-ai666-home-skin .profile-hero,
      html.prototype-preview.prototype-ai666-home-skin [data-profile-hero],
      html.prototype-preview.prototype-ai666-home-skin [data-favorites-hero],
      html.prototype-preview.prototype-ai666-home-skin .workspace-brief,
      html.prototype-preview.prototype-ai666-home-skin .notice-card,
      html.prototype-preview.prototype-ai666-home-skin .summary-card,
      html.prototype-preview.prototype-ai666-home-skin .banner-card {
        border: 1px solid #f1f1f1 !important;
        border-radius: 6px !important;
        background: #ffffff !important;
        background-image: none !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .service-card::before,
      html.prototype-preview.prototype-ai666-home-skin [data-service-card]::before,
      html.prototype-preview.prototype-ai666-home-skin .resource-card::before,
      html.prototype-preview.prototype-ai666-home-skin [data-resource-card]::before,
      html.prototype-preview.prototype-ai666-home-skin .work-card::before,
      html.prototype-preview.prototype-ai666-home-skin [data-work-card]::before,
      html.prototype-preview.prototype-ai666-home-skin .template-card::before,
      html.prototype-preview.prototype-ai666-home-skin .goal-card::before {
        height: 2px !important;
        border-radius: 0 !important;
        background: #242424 !important;
        background-image: none !important;
        opacity: 0.42 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .goal-card.active,
      html.prototype-preview.prototype-ai666-home-skin .service-card.featured,
      html.prototype-preview.prototype-ai666-home-skin [data-service-card].featured,
      html.prototype-preview.prototype-ai666-home-skin .resource-card.featured,
      html.prototype-preview.prototype-ai666-home-skin [data-resource-card].featured {
        border-color: #dcdcdc !important;
        background: #ffffff !important;
        background-image: none !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .cost-main,
      html.prototype-preview.prototype-ai666-home-skin .point-block,
      html.prototype-preview.prototype-ai666-home-skin .input-meta,
      html.prototype-preview.prototype-ai666-home-skin .cost-summary,
      html.prototype-preview.prototype-ai666-home-skin .textarea,
      html.prototype-preview.prototype-ai666-home-skin .field-row > *,
      html.prototype-preview.prototype-ai666-home-skin .supplier-trigger,
      html.prototype-preview.prototype-ai666-home-skin .supplier-menu,
      html.prototype-preview.prototype-ai666-home-skin .supplier-option,
      html.prototype-preview.prototype-ai666-home-skin .provider-line,
      html.prototype-preview.prototype-ai666-home-skin .spec,
      html.prototype-preview.prototype-ai666-home-skin .type-filter,
      html.prototype-preview.prototype-ai666-home-skin .type-tab,
      html.prototype-preview.prototype-ai666-home-skin [data-type-tab],
      html.prototype-preview.prototype-ai666-home-skin [data-type-filter] {
        border-color: #e8e8e8 !important;
        background: #ffffff !important;
        background-image: none !important;
        box-shadow: none !important;
        color: #555555 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .cost-main strong,
      html.prototype-preview.prototype-ai666-home-skin .point-block strong,
      html.prototype-preview.prototype-ai666-home-skin .status-pill strong,
      html.prototype-preview.prototype-ai666-home-skin .spec strong {
        color: #242424 !important;
        font-weight: 650 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin h1,
      html.prototype-preview.prototype-ai666-home-skin h2,
      html.prototype-preview.prototype-ai666-home-skin h3,
      html.prototype-preview.prototype-ai666-home-skin .card-title,
      html.prototype-preview.prototype-ai666-home-skin .result-title,
      html.prototype-preview.prototype-ai666-home-skin .state-title,
      html.prototype-preview.prototype-ai666-home-skin .square-title,
      html.prototype-preview.prototype-ai666-home-skin .ad-title {
        color: #242424 !important;
        font-weight: 660 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin p,
      html.prototype-preview.prototype-ai666-home-skin .summary,
      html.prototype-preview.prototype-ai666-home-skin .card-desc,
      html.prototype-preview.prototype-ai666-home-skin .state-desc,
      html.prototype-preview.prototype-ai666-home-skin .subtext,
      html.prototype-preview.prototype-ai666-home-skin .desc,
      html.prototype-preview.prototype-ai666-home-skin .ad-desc {
        color: #6f6f6f !important;
        font-weight: 400 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .meta-line,
      html.prototype-preview.prototype-ai666-home-skin .card-meta,
      html.prototype-preview.prototype-ai666-home-skin .template-meta,
      html.prototype-preview.prototype-ai666-home-skin .stat,
      html.prototype-preview.prototype-ai666-home-skin .comment-actions,
      html.prototype-preview.prototype-ai666-home-skin [data-reads],
      html.prototype-preview.prototype-ai666-home-skin [data-comments-count],
      html.prototype-preview.prototype-ai666-home-skin [data-likes],
      html.prototype-preview.prototype-ai666-home-skin [data-favorites] {
        color: #8a8a8a !important;
        font-size: 13px !important;
        font-weight: 420 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .tab,
      html.prototype-preview.prototype-ai666-home-skin [data-tab],
      html.prototype-preview.prototype-ai666-home-skin .feed-tab,
      html.prototype-preview.prototype-ai666-home-skin .sort,
      html.prototype-preview.prototype-ai666-home-skin .sort-tab,
      html.prototype-preview.prototype-ai666-home-skin .profile-tab {
        position: relative !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        color: #777777 !important;
        font-weight: 500 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .tab.active,
      html.prototype-preview.prototype-ai666-home-skin [data-tab].active,
      html.prototype-preview.prototype-ai666-home-skin .feed-tab.active,
      html.prototype-preview.prototype-ai666-home-skin .sort.active,
      html.prototype-preview.prototype-ai666-home-skin .sort-tab.active,
      html.prototype-preview.prototype-ai666-home-skin .profile-tab.active {
        color: #242424 !important;
        font-weight: 620 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .type-tab.active,
      html.prototype-preview.prototype-ai666-home-skin [data-type-tab].active,
      html.prototype-preview.prototype-ai666-home-skin [data-type-filter].active,
      html.prototype-preview.prototype-ai666-home-skin .supplier-option.active {
        border-color: #dcdcdc !important;
        background: #f8f8f8 !important;
        background-image: none !important;
        color: #242424 !important;
        box-shadow: none !important;
        font-weight: 620 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .tab.active::after,
      html.prototype-preview.prototype-ai666-home-skin [data-tab].active::after,
      html.prototype-preview.prototype-ai666-home-skin .feed-tab.active::after,
      html.prototype-preview.prototype-ai666-home-skin .sort.active::after,
      html.prototype-preview.prototype-ai666-home-skin .sort-tab.active::after,
      html.prototype-preview.prototype-ai666-home-skin .profile-tab.active::after,
      html.prototype-preview.prototype-ai666-home-skin .type-tab.active::after,
      html.prototype-preview.prototype-ai666-home-skin [data-type-tab].active::after,
      html.prototype-preview.prototype-ai666-home-skin [data-type-filter].active::after {
        content: "" !important;
        position: absolute !important;
        left: 0 !important;
        right: 0 !important;
        bottom: -1px !important;
        height: 1px !important;
        border-radius: 0 !important;
        background: #242424 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .type-badge,
      html.prototype-preview.prototype-ai666-home-skin .type-tag,
      html.prototype-preview.prototype-ai666-home-skin .type-chip,
      html.prototype-preview.prototype-ai666-home-skin span[data-content-type],
      html.prototype-preview.prototype-ai666-home-skin i[data-content-type],
      html.prototype-preview.prototype-ai666-home-skin em[data-content-type],
      html.prototype-preview.prototype-ai666-home-skin button[data-content-type] {
        position: relative !important;
        min-height: 22px !important;
        padding: 2px 10px 2px 12px !important;
        overflow: hidden !important;
        border: 0 !important;
        border-radius: 0 4px 4px 0 !important;
        background: linear-gradient(90deg, rgba(36, 36, 36, 0.12) 0%, rgba(36, 36, 36, 0.055) 58%, rgba(36, 36, 36, 0) 100%) !important;
        box-shadow: none !important;
        color: #3f3f3f !important;
        font-size: 12px !important;
        font-weight: 580 !important;
        line-height: 18px !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .type-badge::before,
      html.prototype-preview.prototype-ai666-home-skin .type-tag::before,
      html.prototype-preview.prototype-ai666-home-skin .type-chip::before,
      html.prototype-preview.prototype-ai666-home-skin span[data-content-type]::before,
      html.prototype-preview.prototype-ai666-home-skin i[data-content-type]::before,
      html.prototype-preview.prototype-ai666-home-skin em[data-content-type]::before,
      html.prototype-preview.prototype-ai666-home-skin button[data-content-type]::before {
        content: "" !important;
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 4px !important;
        background: #242424 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .topic-chip,
      html.prototype-preview.prototype-ai666-home-skin .topic-tag,
      html.prototype-preview.prototype-ai666-home-skin .topic-pill,
      html.prototype-preview.prototype-ai666-home-skin [data-topic-chip],
      html.prototype-preview.prototype-ai666-home-skin [data-favorite-tag] {
        position: relative !important;
        display: inline-flex !important;
        align-items: center !important;
        min-height: 22px !important;
        padding: 0 8px 0 0 !important;
        gap: 7px !important;
        border: 1px solid #e2e2e2 !important;
        border-radius: 5px !important;
        background: #ffffff !important;
        box-shadow: none !important;
        color: #4b4b4b !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        line-height: 20px !important;
        overflow: hidden !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .topic-chip::before,
      html.prototype-preview.prototype-ai666-home-skin .topic-tag::before,
      html.prototype-preview.prototype-ai666-home-skin .topic-pill::before,
      html.prototype-preview.prototype-ai666-home-skin [data-topic-chip]::before,
      html.prototype-preview.prototype-ai666-home-skin [data-favorite-tag]::before {
        content: "#" !important;
        position: static !important;
        width: 20px !important;
        align-self: stretch !important;
        display: grid !important;
        place-items: center !important;
        flex: 0 0 20px !important;
        border-right: 1px solid #dfdfdf !important;
        background: #f2f2f2 !important;
        color: #242424 !important;
        font-size: 12px !important;
        font-weight: 650 !important;
        line-height: 20px !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .pill,
      html.prototype-preview.prototype-ai666-home-skin .chip,
      html.prototype-preview.prototype-ai666-home-skin .badge,
      html.prototype-preview.prototype-ai666-home-skin .topic-badge,
      html.prototype-preview.prototype-ai666-home-skin .state-chip,
      html.prototype-preview.prototype-ai666-home-skin .activity-status {
        border: 1px solid #ebebeb !important;
        border-radius: 999px !important;
        background: #fafafa !important;
        box-shadow: none !important;
        color: #555555 !important;
        font-size: 12px !important;
        font-weight: 560 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .pill.active,
      html.prototype-preview.prototype-ai666-home-skin .chip.active,
      html.prototype-preview.prototype-ai666-home-skin .topic-badge.followed,
      html.prototype-preview.prototype-ai666-home-skin .activity-status,
      html.prototype-preview.prototype-ai666-home-skin .status-running,
      html.prototype-preview.prototype-ai666-home-skin .status-register,
      html.prototype-preview.prototype-ai666-home-skin .badge.green,
      html.prototype-preview.prototype-ai666-home-skin .badge.blue {
        border-color: #d9d9d9 !important;
        background: linear-gradient(90deg, #f2f2f2 0%, #ffffff 100%) !important;
        color: #242424 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin mark,
      html.prototype-preview.prototype-ai666-home-skin .highlight,
      html.prototype-preview.prototype-ai666-home-skin .keyword,
      html.prototype-preview.prototype-ai666-home-skin .result-highlight,
      html.prototype-preview.prototype-ai666-home-skin [data-highlight] {
        border-radius: 2px !important;
        background: linear-gradient(90deg, rgba(36, 36, 36, 0.10), rgba(36, 36, 36, 0.02)) !important;
        color: #242424 !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .badge.red,
      html.prototype-preview.prototype-ai666-home-skin .danger {
        border-color: #eadada !important;
        background: #fffafa !important;
        color: #7c2d2d !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .btn,
      html.prototype-preview.prototype-ai666-home-skin .solid-button,
      html.prototype-preview.prototype-ai666-home-skin .ghost-button,
      html.prototype-preview.prototype-ai666-home-skin .link-button,
      html.prototype-preview.prototype-ai666-home-skin .text-btn,
      html.prototype-preview.prototype-ai666-home-skin .ghost-btn,
      html.prototype-preview.prototype-ai666-home-skin .small-btn,
      html.prototype-preview.prototype-ai666-home-skin .primary-soft,
      html.prototype-preview.prototype-ai666-home-skin .state-action,
      html.prototype-preview.prototype-ai666-home-skin .retry-button,
      html.prototype-preview.prototype-ai666-home-skin .login-primary,
      html.prototype-preview.prototype-ai666-home-skin .login-secondary,
      html.prototype-preview.prototype-ai666-home-skin .relation-action {
        border-radius: 4px !important;
        box-shadow: none !important;
        font-weight: 560 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .btn.primary,
      html.prototype-preview.prototype-ai666-home-skin .solid-button,
      html.prototype-preview.prototype-ai666-home-skin .login-primary,
      html.prototype-preview.prototype-ai666-home-skin .follow-button,
      html.prototype-preview.prototype-ai666-home-skin .small-btn,
      html.prototype-preview.prototype-ai666-home-skin [data-follow-button] {
        border: 1px solid #242424 !important;
        background: #242424 !important;
        background-image: none !important;
        color: #ffffff !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .btn.soft,
      html.prototype-preview.prototype-ai666-home-skin .ghost-button,
      html.prototype-preview.prototype-ai666-home-skin .link-button,
      html.prototype-preview.prototype-ai666-home-skin .text-btn,
      html.prototype-preview.prototype-ai666-home-skin .ghost-btn,
      html.prototype-preview.prototype-ai666-home-skin .primary-soft,
      html.prototype-preview.prototype-ai666-home-skin .state-action,
      html.prototype-preview.prototype-ai666-home-skin .retry-button,
      html.prototype-preview.prototype-ai666-home-skin .login-secondary,
      html.prototype-preview.prototype-ai666-home-skin .relation-action {
        border: 1px solid #e8e8e8 !important;
        background: #ffffff !important;
        color: #3f3f3f !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .prototype-topic-more {
        display: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .ad-card,
      html.prototype-preview.prototype-ai666-home-skin .ad-banner,
      html.prototype-preview.prototype-ai666-home-skin [data-right-module="ad-banner"] {
        border: 1px solid #f1f1f1 !important;
        border-left: 4px solid #242424 !important;
        border-radius: 6px !important;
        background: linear-gradient(90deg, #f6f6f6 0%, #ffffff 76%) !important;
        box-shadow: none !important;
        padding: 14px 14px 14px 16px !important;
      }

      html.prototype-preview.prototype-ai666-home-skin [data-right-module="ad-banner"]:has([data-ad-banner]) {
        padding: 0 !important;
        border-left: 0 !important;
        border-radius: 6px !important;
        background: #ffffff !important;
        overflow: hidden !important;
      }

      html.prototype-preview.prototype-ai666-home-skin [data-right-module="ad-banner"] [data-ad-banner] {
        border-radius: 5px !important;
        overflow: hidden !important;
      }

      html.prototype-preview.prototype-ai666-home-skin [data-right-module="ad-banner"]:has([data-ad-banner]) img {
        display: block !important;
      }

      html.prototype-preview.prototype-ai666-home-skin [data-right-module="ad-banner"] [data-ad-slide] {
        width: 100% !important;
        height: 100% !important;
        min-width: 100% !important;
        min-height: 100% !important;
        display: block !important;
        overflow: hidden !important;
        border-radius: 5px !important;
        color: #ffffff !important;
        font-size: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin [data-right-module="ad-banner"] [data-ad-slide]::after {
        content: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin [data-right-module="ad-banner"] [data-ad-slide] img {
        width: 100% !important;
        height: 100% !important;
        border-radius: 5px !important;
        object-fit: cover !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .left-nav,
      html.prototype-preview.prototype-ai666-home-skin .side-nav {
        border-right: 1px solid #f2f2f2 !important;
        background: #ffffff !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .side-item,
      html.prototype-preview.prototype-ai666-home-skin .side-nav button,
      html.prototype-preview.prototype-ai666-home-skin .side-nav a {
        position: relative !important;
        padding-left: 22px !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        color: #5f5f5f !important;
        box-shadow: none !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .side-item.active,
      html.prototype-preview.prototype-ai666-home-skin .side-nav .active {
        color: #242424 !important;
        font-weight: 620 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .side-item.active::before,
      html.prototype-preview.prototype-ai666-home-skin .side-nav .active::before {
        content: "" !important;
        position: absolute !important;
        left: 8px !important;
        top: 10px !important;
        bottom: 10px !important;
        width: 3px !important;
        border-radius: 3px !important;
        background: #242424 !important;
      }

      html.prototype-preview.prototype-ai666-home-skin .prototype-shell-link.active,
      html.prototype-preview.prototype-ai666-home-skin .prototype-shell-close {
        border-color: #242424 !important;
        background: #242424 !important;
        color: #ffffff !important;
      }
    `;
    document.head.appendChild(style);
  }

  function bindStickyShadow() {
    const topbar = document.querySelector(".topbar");
    if (!topbar) return;
    const update = () => topbar.classList.toggle("is-scrolled", window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function activePrimaryLabel(dir) {
    const exact = Object.entries(PAGE_DIRS).find(([, pageDir]) => pageDir === dir);
    if (exact) return exact[0];
    return "首页";
  }

  function normalizeTopbar() {
    if (!document.documentElement.classList.contains("prototype-preview")) return;
    if (document.documentElement.classList.contains("prototype-creation-workbench")) return;
    const navShell = document.querySelector(".nav-shell");
    if (!navShell) return;
    const active = activePrimaryLabel(currentDir());
    const isHome = currentDir() === "c-end-home-aggregate-feed-v1";
    const navItems = Object.keys(PAGE_DIRS).map((label) => (
      `<span class="nav-item${label === active ? " active" : ""}">${label}</span>`
    )).join("");
    navShell.innerHTML = `
      <div class="brand" aria-label="多元拾光">
        <img class="brand-mark" src="../_assets/brand/duoyuan-shiguang-logo-mark.svg?v=20260616-nav2" alt="" />
        <div class="brand-copy">
          <span class="brand-name">多元拾光</span>
          <span class="brand-sub">AI原生实践者社区</span>
        </div>
      </div>
      <nav class="primary-nav" aria-label="一级导航" data-primary-nav>
        ${navItems}
      </nav>
      <label class="top-search" data-top-search${isHome ? " data-interactive-search" : ""}>
        <img src="../../../resources/icons/remixicon/svg/System/search-line.svg" alt="" />
        <input type="text" value="" placeholder="搜索内容、话题、模型服务、工作流"${isHome ? " data-interactive-search-input" : ""} />
      </label>
      <div class="top-actions">
        <button class="creator-btn" type="button" data-creator-button>
          <img src="../../../resources/icons/remixicon/svg/Design/edit-line.svg" alt="" />
          创作中心
        </button>
        <button class="icon-btn" type="button" aria-label="通知">
          <img src="../../../resources/icons/remixicon/svg/Media/notification-3-line.svg" alt="" />
        </button>
        <img class="avatar" src="../_assets/figma/other-profile-avatar-source.png" alt="用户头像" data-my-profile-entry />
      </div>
    `;
  }

  function bindPrimaryNavigation() {
    document.querySelectorAll(".nav-item").forEach((node) => {
      const label = normalize(node.textContent);
      const dir = PAGE_DIRS[label];
      if (!dir) return;
      if (node.tagName.toLowerCase() === "a") {
        node.setAttribute("href", pageUrl(dir));
      } else {
        node.setAttribute("role", "link");
        node.setAttribute("tabindex", "0");
      }
      node.addEventListener("click", (event) => {
        event.preventDefault();
        navigate(dir);
      });
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate(dir);
        }
      });
    });
  }

  function bindPageEntrances() {
    const globalCreator = createGlobalCreatorPopover();

    document.querySelectorAll("[data-creator-button], .creator-button, .creator-btn, .create-btn").forEach((node) => {
      const showGlobalCreator = () => globalCreator?.classList.add("visible");
      const hideGlobalCreator = () => globalCreator?.classList.remove("visible");
      node.addEventListener("mouseenter", showGlobalCreator);
      node.addEventListener("mouseleave", () => {
        window.setTimeout(() => {
          if (!globalCreator?.matches(":hover")) hideGlobalCreator();
        }, 80);
      });
      node.addEventListener("click", (event) => {
        event.preventDefault();
        navigate("c-end-creation-platform-v2", "home");
      });
    });
    globalCreator?.addEventListener("mouseleave", () => globalCreator.classList.remove("visible"));

    document.querySelectorAll("[data-my-profile-entry], .top-actions .avatar").forEach((node) => {
      node.setAttribute("role", "link");
      node.setAttribute("tabindex", "0");
      const openProfile = (event) => {
        event.preventDefault();
        navigate("c-end-user-profile-v1", "default");
      };
      node.addEventListener("click", openProfile);
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") openProfile(event);
      });
    });

    document.querySelectorAll(".top-search").forEach((node) => {
      if (node.hasAttribute("data-interactive-search")) return;
      node.addEventListener("click", (event) => {
        event.preventDefault();
        navigate("c-end-search-results-v1", "default");
      });
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-prototype-shell]")) return;

      if (event.target.closest("[data-topic-more]")) {
        event.preventDefault();
        navigate("c-end-topic-square-v1", "default");
        return;
      }

      const more = event.target.closest(".rail-more, .rail-link, .small-link, .right-title a, .rail-title small");
      if (more) {
        const module = more.closest("[data-right-module]");
        const moduleKey = module?.getAttribute("data-right-module") || "";
        const moreText = normalize(more.textContent);
        if (moduleKey.includes("topic") && moreText.includes("更多")) {
          navigate("c-end-topic-square-v1", "default");
        } else if (moduleKey.includes("topic") && moreText.includes("全部")) {
          navigate("c-end-topic-square-v1", "default");
        } else if (moduleKey.includes("topic")) {
          showToast("话题换一批为后续动态配置能力，当前可点具体话题进入聚合页。");
        } else if (moduleKey.includes("notice")) {
          navigate("c-end-announcement-list-v1", "default");
        } else if (moduleKey.includes("activity") || normalize(module?.textContent).includes("活动")) {
          showToast("活动列表页暂未进入 C端 V0.1，当前仅保留活动入口。");
        } else {
          showToast("该入口已标注，列表承接页后续版本补齐。");
        }
        event.preventDefault();
        return;
      }

      if (event.target.closest("a, button, input, textarea, select")) return;

      const isFlashSurface = (node) => {
        if (!node) return false;
        if (node.closest("[data-flash-card], [data-flash-inline], [data-flash-list-item], [data-no-detail='flash']")) return true;
        const directType = node.getAttribute("data-content-type") || node.getAttribute("data-result-type") || "";
        if (directType === "闪念") return true;
        const nestedType = node.querySelector("[data-content-type='闪念']");
        if (nestedType) return true;
        return [...node.querySelectorAll(".type-badge, .type-tag")]
          .some((badge) => normalize(badge.textContent) === "闪念");
      };

      if (event.target.closest("[data-topic-square-card]")) {
        navigate("c-end-topic-aggregate-v1", "default");
        return;
      }

      const topicTarget = event.target.closest("[data-topic-rail], .topic-tag, [data-topic-chip], .prototype-topic-chip-unified");
      if (topicTarget) {
        const href = topicTarget.getAttribute("data-href");
        if (href) {
          location.href = href;
          return;
        }
        navigate("c-end-topic-aggregate-v1", "default");
        return;
      }

      const detailTarget = event.target.closest("[data-feed-item], [data-work-card], [data-service-card], [data-resource-card], [data-result-card], [data-topic-card]");
      if (detailTarget) {
        if (isFlashSurface(detailTarget)) {
          event.preventDefault();
          return;
        }
        navigate("c-end-detail-page-v1", "default");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.target.closest("[data-prototype-shell]")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      if (!event.target.closest("[data-topic-rail], .topic-tag, [data-topic-chip], .prototype-topic-chip-unified")) return;
      event.preventDefault();
      navigate("c-end-topic-aggregate-v1", "default");
    });
  }

  function bindStateTabs() {
    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-prototype-shell]")) return;
      const tab = event.target.closest("[data-tab], [data-type-tab], [data-sort-tab], .feed-tab");
      if (!tab) return;
      const label = normalize(tab.getAttribute("data-tab") || tab.getAttribute("data-type-tab") || tab.getAttribute("data-sort-tab") || tab.textContent);
      const state = TAB_STATE[currentDir()]?.[label];
      if (!state) return;
      event.preventDefault();
      navigate(currentDir(), state);
    });
  }

  function syncActiveStateControls() {
    const dir = currentDir();
    const map = TAB_STATE[dir];
    if (!map) return;
    const params = new URLSearchParams(window.location.search);
    const activeState = params.get("state") || "default";
    const activeLabels = Object.entries(map)
      .filter(([, state]) => state === activeState)
      .map(([label]) => label);
    if (!activeLabels.length) return;

    const syncGroup = (selector) => {
      const nodes = [...document.querySelectorAll(selector)];
      if (!nodes.length) return;
      const labels = nodes.map((node) => normalize(node.getAttribute("data-tab") || node.getAttribute("data-type-tab") || node.getAttribute("data-sort-tab") || node.textContent));
      if (!labels.some((label) => activeLabels.includes(label))) return;
      nodes.forEach((node, index) => {
        const active = activeLabels.includes(labels[index]);
        node.classList.toggle("active", active);
        if (node.matches("button, [role='tab']")) {
          node.setAttribute("aria-selected", active ? "true" : "false");
        }
      });
    };

    [
      "[data-tabs] [data-tab], [data-tabs-bar] [data-tab], [data-tabs-card] [data-tab], .feed-tabs .feed-tab",
      "[data-type-bar] [data-type-tab], .type-tabs [data-type-tab]",
      "[data-sort-tab]"
    ].forEach((selector) => {
      syncGroup(selector);
    });
  }

  function createGlobalCreatorPopover() {
    if (document.querySelector("[data-global-creator-popover]")) return document.querySelector("[data-global-creator-popover]");
    if (!document.querySelector("[data-creator-button], .creator-button, .creator-btn, .create-btn")) return null;
    const popover = document.createElement("div");
    popover.className = "prototype-creator-popover";
    popover.setAttribute("data-global-creator-popover", "true");
    popover.innerHTML = `
      <div class="prototype-creator-grid">
        <div class="prototype-creator-item" data-creator-entry="flash"><strong>发闪念</strong><span>轻量想法、工具发现和短经验</span></div>
        <div class="prototype-creator-item" data-creator-entry="article"><strong>写文章</strong><span>教程、复盘和长内容沉淀</span></div>
        <div class="prototype-creator-item" data-creator-entry="image"><strong>发图文/视频</strong><span>AIGC 案例、图片和视频内容</span></div>
        <div class="prototype-creator-item" data-creator-entry="asset"><strong>发 Skill/MCP</strong><span>GitHub 或自定义路径维护资产</span></div>
      </div>
    `;
    popover.addEventListener("click", (event) => {
      const entry = event.target.closest("[data-creator-entry]");
      if (!entry) return;
      event.preventDefault();
      const state = entry.getAttribute("data-creator-entry") || "home";
      const stateMap = {
        flash: "editor-flash",
        article: "editor-article",
        image: "editor-image",
        asset: "skill-mode"
      };
      navigate("c-end-creation-platform-v2", stateMap[state] || "home");
    });
    document.body.appendChild(popover);
    return popover;
  }

  function normalizeTopicModules() {
    document.querySelectorAll(STANDARD_TOPIC_MODULE_SELECTOR).forEach((module) => {
      module.setAttribute("data-topic-rail-standard", "true");
      const title = module.querySelector(".rail-title, .rail-head strong, .right-title h3, h2, h3");
      if (title) {
        const titleText = "推荐话题";
        const icon = title.querySelector("img, svg");
        if (icon) {
          title.innerHTML = `${icon.outerHTML}${titleText}`;
        } else {
          title.textContent = titleText;
        }
      }

      const list = module.querySelector(".topic-list, .rail-list, .related-list") || document.createElement("div");
      list.className = "prototype-topic-list";
      list.setAttribute("data-standard-topic-list", "true");
      list.innerHTML = STANDARD_RECOMMENDED_TOPICS.map(([name, count]) => `
        <div class="prototype-topic-pill" role="link" tabindex="0" data-topic-rail data-href="../c-end-topic-aggregate-v1/index.html?topic=${encodeURIComponent(name)}">
          <span class="prototype-topic-label">
            <img class="prototype-topic-icon" src="${STANDARD_TOPIC_ICON_SRC}" alt="" data-icon />
            <span class="prototype-topic-name">${name}</span>
          </span>
          <span class="prototype-topic-count">${count}</span>
        </div>
      `).join("");
      if (!list.parentElement) {
        module.appendChild(list);
      }
    });
  }

  function appendTopicMoreButtons() {
    document.querySelectorAll(STANDARD_TOPIC_MODULE_SELECTOR).forEach((module) => {
      if (module.querySelector("[data-topic-more]")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "prototype-topic-more";
      button.setAttribute("data-topic-more", "true");
      button.setAttribute("aria-label", "查看更多推荐话题");
      button.textContent = "查看更多";
      module.appendChild(button);
    });
  }

  function stripTopicPrefix(node) {
    if (!node) return "";
    const compact = (value) => String(value || "").trim();
    const strip = (value) => compact(value).replace(/^#\s*/, "");
    const textNodes = [...node.childNodes].filter((child) => child.nodeType === Node.TEXT_NODE);
    const target = textNodes.find((child) => compact(child.textContent).startsWith("#"));
    if (target) {
      target.textContent = strip(target.textContent);
      return strip(target.textContent);
    }
    if (!node.children.length) {
      const next = strip(node.textContent);
      node.textContent = next;
      return next;
    }
    return strip(node.textContent);
  }

  function normalizeContentTopicLabels() {
    const chipSelector = [
      "[data-topic-chip]",
      ".topics .topic-chip",
      ".topic-line .topic-chip",
      ".card-meta .topic-tag",
      ".card-tags .topic-tag",
      ".topic-row .topic-tag",
      ".eyebrow-row .topic",
      ".draft-meta .pill.brand"
    ].join(",");

    document.querySelectorAll(chipSelector).forEach((node) => {
      const value = stripTopicPrefix(node);
      if (!value) return;
      node.classList.add("prototype-topic-chip-unified");
      node.setAttribute("data-topic-chip", "true");
      if (!node.hasAttribute("tabindex")) node.setAttribute("tabindex", "0");
      if (!node.hasAttribute("role")) node.setAttribute("role", "link");
    });

    [
      ".topic-name",
      ".topic-title",
      "[data-result-type='话题'] .result-title"
    ].forEach((selector) => {
      document.querySelectorAll(selector).forEach(stripTopicPrefix);
    });
  }

  function renderPageLinks(items, activeDir) {
    return items.map(([label, dir]) => {
      const active = dir === activeDir;
      const href = pageUrl(dir);
      return `<a class="prototype-shell-link${active ? " active" : ""}" href="${href}">${label}</a>`;
    }).join("");
  }

  function renderStateLinks(items, activeDir, activeState) {
    return items.map(([state, label]) => {
      const active = state === activeState;
      const href = pageUrl(activeDir, state);
      return `<a class="prototype-shell-link${active ? " active" : ""}" href="${href}">${label}</a>`;
    }).join("");
  }

  function renderPrototypeShell() {
    if (window.location.protocol === "file:") return;
    if (document.querySelector("[data-prototype-shell]")) return;

    const dir = currentDir();
    const states = STATE_LABELS[dir] || [];
    const params = new URLSearchParams(window.location.search);
    const activeState = params.get("state") || states[0]?.[0] || "";

    const shell = document.createElement("aside");
    shell.setAttribute("data-prototype-shell", "true");
    shell.innerHTML = `
      <div class="prototype-shell-head">
        <div class="prototype-shell-title">原型走查</div>
        <button class="prototype-shell-close" type="button" aria-label="收起原型走查">×</button>
      </div>
      <div class="prototype-shell-group">
        <div class="prototype-shell-label">页面</div>
        <div class="prototype-shell-links">${renderPageLinks(REVIEW_PAGES, dir)}</div>
      </div>
      ${states.length > 1 ? `
        <div class="prototype-shell-group">
          <div class="prototype-shell-label">状态</div>
          <div class="prototype-shell-links">${renderStateLinks(states, dir, activeState)}</div>
        </div>
      ` : ""}
    `;
    shell.querySelector(".prototype-shell-close").addEventListener("click", () => shell.remove());
    document.body.appendChild(shell);
  }

  function init() {
    const dir = currentDir();
    if (window.location.protocol !== "file:") {
      document.documentElement.classList.add("prototype-preview");
    }
    document.documentElement.classList.add(`prototype-dir-${dir}`);
    if (dir === "c-end-creation-platform-v2") {
      document.documentElement.classList.add("prototype-creation-workbench");
    } else {
      document.documentElement.classList.add("prototype-canvas-standard");
    }
    if (CHANNEL_PAGE_DIRS.has(dir)) {
      document.documentElement.classList.add("prototype-channel-page");
    }
    if (document.querySelector(".topbar")) {
      document.documentElement.classList.add("prototype-has-topbar");
    }
    document.documentElement.classList.add("prototype-ai666-home-skin");
    injectStyle();
    injectHomeVisualSkin();
    normalizeTopbar();
    bindStickyShadow();
    bindPrimaryNavigation();
    bindPageEntrances();
    bindStateTabs();
    syncActiveStateControls();
    normalizeTopicModules();
    appendTopicMoreButtons();
    normalizeContentTopicLabels();
    renderPrototypeShell();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
