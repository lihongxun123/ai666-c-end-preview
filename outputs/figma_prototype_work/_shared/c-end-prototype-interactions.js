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
  const MODEL_DETAIL_RECOMMENDED_TOPICS = [
    ["模型选型", "2.4k"],
    ["API 迁移", "1.9k"],
    ["长上下文", "1.5k"],
    ["工具调用", "1.2k"],
    ["成本控制", "986"],
    ["Embedding", "724"]
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
      ["hot", "热门态"],
      ["compose", "发闪念"],
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
      ["api", "API"],
      ["detail", "模型详情"],
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

  const PAGE_RULES = {
    "c-end-home-aggregate-feed-v1": {
      title: "首页聚合与运营承接",
      purpose: [
        "聚合内容消费入口，让新用户先看到内容、话题、活动和官方公告。",
        "承接 6-7 月 P0 内容曝光、闪念消费、话题发现和活动引导，最后再和研发过首页。"
      ],
      fields: [
        "信息对象：Feed 内容、闪念卡片、内容类型、话题、作者、阅读/评论/点赞、封面、右侧运营位。",
        "状态：关注、推荐、最新、热门；搜索聚焦、创作入口悬停、内容 hover。",
        "闪念卡片媒体与闪念频道保持一致：正文下方展示媒体，按原图或视频比例呈现。"
      ],
      logic: [
        "首页不是详情页，也不是发布页；卡片点击进入详情，闪念卡片不进入独立详情。",
        "推荐话题名称进入话题聚合页，右侧箭头进入话题广场。",
        "操作区统一 icon + 数字，已点赞/已收藏不用外层背景。"
      ],
      ops: [
        "右侧公告、推荐话题、活动入口和赞助位由运营人工维护，6-7 月先用配置文件承接。",
        "首页推荐位可先人工排定 P0 内容池，不在原型里表达算法或后台治理状态。"
      ],
      acceptance: [
        "首页不新增顶部 Banner、左侧导航、快速发帖或后台配置说明。",
        "右侧运营位主文本字号和字重一致，推荐话题不加标题/列表分割线。",
        "横向溢出为 0，页面结构保持当前首页聚合流。"
      ]
    },
    "c-end-flash-channel-v1": {
      title: "闪念轻内容频道",
      purpose: [
        "承接轻创作和轻互动，验证专业用户的短经验、工具发现和问题片段是否能形成消费反馈。",
        "不拆内部 Tab，不做独立详情页，消费和互动都留在闪念时间流内完成。"
      ],
      fields: [
        "信息对象：闪念正文、媒体附件、话题、作者、时间、评论、回复、点赞、分享、热度分。",
        "发闪念正文最多 600 字，媒体最多 6 个，图片和视频同属媒体字段，短视频限制作为发布规则隐藏处理。",
        "评论只支持纯文字；卡片内摘要评论默认展示 10 条，全部评论展示完整列表。"
      ],
      logic: [
        "热门态按近 7 天热度分排序，C端只展示热度分和统计窗口，不展示内部公式。",
        "评论支持回复闪念和回复评论，视觉上按二级楼层承载。",
        "参与话题进入发闪念并带入话题；推荐话题仍进入话题聚合页。"
      ],
      ops: [
        "热门闪念池、推荐话题、参与话题和广告 Banner 由运营人工配置。",
        "6-7 月先用配置文件维护热门池、话题池、Banner 图片、标题和跳转。"
      ],
      acceptance: [
        "页面没有内部 Tab 和独立详情跳转。",
        "媒体在正文下方展示，无数量角标和发布限制文案。",
        "走查规则抽屉非模态，不加蒙版，不点击外部关闭。"
      ]
    },
    "c-end-aigc-experience-center-v2": {
      title: "AIGC 体验中心",
      purpose: [
        "让用户用可理解的模板和体验点完成 AIGC 试用，不把 workflow 或 API 灰度提前暴露给普通用户。",
        "验证图像、编辑、视频、漫剧、点数不足和任务返还等关键体验状态。"
      ],
      fields: [
        "信息对象：模板、体验分类、Prompt 输入、消耗预估、生成结果、任务返还、精选模板、案例复用。",
        "状态：推荐、图像生成、图像编辑、视频创作、漫剧生成、生成成功、点数不足、任务返还。"
      ],
      logic: [
        "模板点击切换体验上下文，输入区只表达用户可理解字段。",
        "点数不足只展示用户可读提醒，不展示余额、扣费、接口错误或真实支付链路。",
        "任务返还是 7 月运营承接能力，不在原型里表达自动积分发放。"
      ],
      ops: [
        "体验模板、案例复用、任务返还文案和右侧体验点由运营人工维护。",
        "6-7 月先通过配置文件管理模板排序、消耗说明、返还任务和精选案例。"
      ],
      acceptance: [
        "页面不出现 workflow/API 灰度承接文案。",
        "状态 token、按钮、右侧栏保持黑白灰 hairline 视觉。",
        "生成成功、点数不足和任务返还状态都能单独走查。"
      ]
    },
    "c-end-model-service-channel-v1": {
      title: "模型服务频道",
      purpose: [
        "以 API 中转站 109 条全量模型对象库为底层数据，前台先展示首批 15 个已进入运营复核的模型。",
        "频道默认态承接首批模型目录，搜索、供应商/类型筛选和模型服务专属详情先服务当前可运营的模型集合。",
        "承接 7 月 API 灰度意向，但不在 C端列表暴露真实 API Key、余额、价格维护后台或接口实现。"
      ],
      fields: [
        "信息对象：模型对象、模型名、供应商、原始类型、前台分类、计费口径、接口类型、能力标签、官方账号、内容覆盖状态、来源和更新时间。",
        "模型卡片只展示前台分类、能力标签、官方账号和用户可理解摘要；计费口径、接口类型、来源清单编号和更新时间进入详情页或资料表。",
        "前台分类按用户理解校正：文本、图像、音频、视频、Embedding/API、聚合；原始类型只进入资料表，不直接决定 C端展示。",
        "状态：首批模型、文本、图像、音频、视频、API、模型详情、案例与经验内容详情、供应商筛选、悬停、空态、加载、失败。"
      ],
      logic: [
        "模型卡片是聚合入口，整卡进入模型服务频道内的专属详情态；案例与 API 经验生成贴在模型服务频道内进入内容详情态。",
        "模型服务专属详情先展示模型介绍、适合/不适合场景、使用前确认、内容看点、案例与经验生成贴和下一步入口；内容详情态必须反链回模型详情。",
        "类型筛选和供应商筛选只改变列表结果，不新增比较页、API 管理页、余额页或真实调用页。",
        "图像、视频、音频生成类案例优先回流到 AIGC 创意广场，模型详情只做能力说明、提示词样例和结果反链。",
        "Embedding、转写、聚合入口优先承接 API 用户经验和 AI+ 工作流内容。"
      ],
      ops: [
        "模型对象库来自中转站 pricing 清单，刷新后由产品人工校对前台分类、供应商归组和内容生产顺序。",
        "前台列表先隐藏非首批模型；官方介绍先由脚本按模板生成初稿，再由运营人工复核来源、边界、成本口径和关联案例。",
        "运营先补首批模型的官方介绍、场景案例生成贴和 API 用户经验生成贴，再补 AIGC 作品反链和长尾模型介绍骨架。",
        "推荐话题、热门模型服务、选型路径和广告位由运营人工维护；API 灰度名单和回访状态属于运营表，不在 C端卡片展示。"
      ],
      acceptance: [
        "筛选计数与当前首批 15 个前台模型口径一致；109 条全量对象库仍保留为后续放量基础。",
        "模型卡片作者统一显示多元拾光官方，不展示中转站清单编号、类型字段、计费口径或接口类型。",
        "首批 15 个模型详情页都能显示模型介绍、适合/不适合、使用前确认、内容看点、2 个案例与经验生成贴和下一步入口；内部生产状态不作为 C端详情主体内容。",
        "每个首批模型的场景案例贴和 API 经验贴都能打开内容详情，详情包含输入材料、生成结果摘要、人工复核点、使用模型和回到模型详情的反链。",
        "卡片无彩色 accent、无持久多按钮堆叠，不展示真实密钥、实时价格、账户额度、跑分或自动可用性。",
        "右侧栏包含 API 灰度申请、推荐话题、热门模型服务、选型路径和广告位，并按闪念右栏的轻模块样式展示，不套外部 panel 框体；筛选空态、加载、失败态有用户可读反馈。"
      ]
    },
    "c-end-ai-plus-channel-v1": {
      title: "AI+ 资产频道",
      purpose: [
        "聚合工作流、Skill、MCP 和教程案例，让用户发现可复用 AI 资产。",
        "验证专业资产卡片、分类筛选、关注空态和右侧创作入口。"
      ],
      fields: [
        "信息对象：AI+ 资源、类型、作者/来源、能力标签、话题、收藏/热度/使用量、创作入口。",
        "状态：精选、最新、热门、关注、工作流、Skill、MCP、教程案例、关注空态、加载、失败。"
      ],
      logic: [
        "卡片点击进入详情，列表内不放复制步骤、安装步骤或持久详情按钮。",
        "关注空态只引导发现和关注，不自动推荐关注关系。",
        "右侧创作入口进入创作服务对应资产发布路径。"
      ],
      ops: [
        "精选资源、热门实战、精选专题、推荐话题和广告位由运营人工维护。",
        "6-7 月先人工维护资产池和专题，不表达自动排序算法。"
      ],
      acceptance: [
        "资源卡片保持 AI Asset Card 轻变体。",
        "右侧创作、热门、专题和话题模块字号字重一致。",
        "关注空态、加载、失败态可走查。"
      ]
    },
    "c-end-search-results-v1": {
      title: "搜索结果页",
      purpose: [
        "承接用户主动检索，把内容、话题、模型服务和 AI+ 资源放在同一搜索结果框架下。",
        "验证搜索无结果、加载和失败时的低成本反馈。"
      ],
      fields: [
        "信息对象：搜索词、结果类型、标题、摘要、作者/来源、话题、阅读/评论、右侧推荐搜索和推荐话题。",
        "状态：全部、内容、话题、模型服务、AI+资源、加载、无结果、加载失败。"
      ],
      logic: [
        "分类 Tab 只筛选当前搜索结果，不改变全局频道导航。",
        "命中词高亮使用中性弱底，不使用蓝/青强调。",
        "话题结果进入话题聚合页，其他内容结果进入详情页。"
      ],
      ops: [
        "推荐搜索、推荐话题、广告位和无结果推荐内容由运营人工维护。",
        "搜索词热度可以先由人工配置，不在原型表达搜索算法。"
      ],
      acceptance: [
        "结果列表与首页内容流视觉一致。",
        "无结果、加载和失败态都有明确下一步入口。",
        "右侧推荐话题遵循全局话题跳转规则。"
      ]
    },
    "c-end-topic-square-v1": {
      title: "话题广场",
      purpose: [
        "提供全局话题发现和筛选入口，让用户从主题进入内容消费和创作参与。",
        "验证话题分类、活跃排序、已关注和空态。"
      ],
      fields: [
        "信息对象：话题、分类、浏览量/内容量、关注状态、话题说明、右侧推荐话题/活动/广告。",
        "状态：全部话题、AI Coding、模型与API、AIGC、工作流、Skill/MCP、教程案例、最新活跃、已关注、空态、加载、失败。"
      ],
      logic: [
        "话题卡片进入话题聚合页；关注只改变关注状态，不引入完整用户等级体系。",
        "分类和排序只服务发现，不表现后台话题管理。",
        "话题指标同一模块内保持统一口径。"
      ],
      ops: [
        "话题分类、推荐话题、活动入口、广告位和展示顺序由运营人工维护。",
        "6-7 月优先维护 P0 内容相关话题，降低冷启动空洞。"
      ],
      acceptance: [
        "话题页不出现后台分类管理视觉。",
        "推荐话题箭头进入话题广场，话题名进入聚合页。",
        "已关注、空态、加载和失败状态可走查。"
      ]
    },
    "c-end-topic-aggregate-v1": {
      title: "话题聚合页",
      purpose: [
        "把某个话题下的内容、闪念和相关入口集中起来，验证从话题到消费和参与的闭环。",
        "承接推荐话题、内容话题 token 和话题广场卡片跳转。"
      ],
      fields: [
        "信息对象：话题标题、说明、统计、关注状态、内容流、相关话题、右侧精选/活动/广告。",
        "状态：推荐、已关注、最新、无内容、加载、失败、不可用、登录关注。"
      ],
      logic: [
        "话题聚合页是话题消费页，不是话题管理页。",
        "关注动作只表达关注状态；登录关注态给出登录引导，不展示权限系统。",
        "内容卡片点击进入详情，闪念不进入独立详情。"
      ],
      ops: [
        "话题说明、精选内容、相关话题、活动入口和广告位由运营人工维护。",
        "无内容态可人工配置推荐话题或返回广场入口。"
      ],
      acceptance: [
        "话题指标口径统一，不混用浏览量/内容量/热度。",
        "无内容、不可用、登录关注状态有用户可读反馈。",
        "右侧运营位与其他频道对齐。"
      ]
    },
    "c-end-detail-page-v1": {
      title: "内容详情页",
      purpose: [
        "承接内容深度阅读、互动、收藏和相关推荐，是内容消费闭环的核心页。",
        "验证评论面板、无评论、未登录、不可见、加载失败、权限不足和不同内容类型；模型对象详情由模型服务频道内的专属详情态承接。"
      ],
      fields: [
        "信息对象：标题、正文、作者、时间、内容类型、话题、阅读/评论/点赞/收藏/分享、评论、相关推荐、右侧作者/目录/话题/广告。",
        "状态：默认、评论面板、无评论、未登录、不可见、加载失败、权限不足、文章、图文、视频、工作流、Skill、MCP、AIGC、闪念。",
        "模型相关内容在本页只作为单篇官方介绍、案例、作品说明或用户经验出现，不再承担单模型聚合详情。"
      ],
      logic: [
        "评论只支持纯文字输入；回复按二级楼层承载，不做无限嵌套。",
        "已点赞和已收藏使用填充图标 + 深色文本，不加外层背景。",
        "相关推荐卡片进入详情，推荐话题进入话题聚合页。",
        "单篇模型内容必须反链到模型服务专属详情，让用户回到模型对象、案例集合和 API 经验的聚合入口。"
      ],
      ops: [
        "相关推荐、推荐话题、广告位和作者侧重点由运营人工维护。",
        "不可见、权限不足和加载失败文案先以配置文件维护，不暴露后台审核细节。",
        "模型官方介绍、关联案例、作品反链、API 用户经验和模型类型纠偏由模型服务清单维护，本页只展示单篇内容。"
      ],
      acceptance: [
        "评论输入后有发布按钮，回复点击后出现当前评论下的回复框。",
        "二级回复外部无框体。",
        "C端不展示审核命中、治理状态或实现备注。",
        "模型相关内容不展示真实密钥、余额、调用日志、消费清单、在线调用入口或实时价格承诺。"
      ]
    },
    "c-end-user-profile-v1": {
      title: "用户主页与关系",
      purpose: [
        "提供轻量用户成长底座，让用户能看自己的主页、资料状态、关注和粉丝。",
        "验证作者公开主页、资料编辑、手机号/微信绑定和关系列表。"
      ],
      fields: [
        "信息对象：用户资料、头像、昵称、简介、关注/粉丝、内容列表、收藏入口、作者工作台入口、绑定状态。",
        "状态：我的主页、资料待完善、作者主页、已关注作者、资料编辑、手机号绑定、微信绑定、关注列表、粉丝列表、无内容。"
      ],
      logic: [
        "主页 hero 可以展示昵称，不强制加 @；主页内容卡片仍按内容流作者规则呈现。",
        "关注只表达关注/已关注关系，不引入推荐关注、等级、积分或私信。",
        "手机号使用验证码绑定/解绑，微信使用扫码绑定/解绑。"
      ],
      ops: [
        "资料完善提示、作者工作台入口、无内容推荐和成长提示由运营人工维护。",
        "6-7 月先验证轻路径，不扩展完整用户体系。"
      ],
      acceptance: [
        "已关注状态不用外层背景。",
        "资料编辑和绑定状态不展示敏感完整字段。",
        "关注/粉丝列表和无内容态可走查。"
      ]
    },
    "c-end-favorites-v1": {
      title: "收藏夹",
      purpose: [
        "承接内容复访，验证用户是否能按类型和标签找回已收藏内容。",
        "服务留存和二次消费，不做文件管理器或后台素材库。"
      ],
      fields: [
        "信息对象：收藏内容、内容类型、收藏时间、标签、分类筛选、空态。",
        "状态：全部收藏、文章、AIGC、模型服务、API 标签、空态。"
      ],
      logic: [
        "筛选只改变收藏列表，不创建复杂文件夹层级。",
        "收藏状态使用填充图标 + 深色文本，不加外层背景。",
        "收藏内容点击进入对应详情或目标页。"
      ],
      ops: [
        "空态推荐、默认标签和类型筛选文案由运营人工维护。",
        "6-7 月先支持分类/标签的轻管理，不做完整收藏夹运营后台。"
      ],
      acceptance: [
        "收藏列表不出现后台管理按钮。",
        "空态有返回内容消费或发现入口。",
        "API 标签筛选能单独走查。"
      ]
    },
    "c-end-creation-platform-v2": {
      title: "创作服务中心",
      purpose: [
        "承接作者工作台和内容发布路径，让创作者能管理草稿、审核中、未通过、已发布和基础数据。",
        "验证轻创作、文章、图文/视频、Skill/MCP 的发布入口和状态流。"
      ],
      fields: [
        "信息对象：作品、草稿、审核状态、发布路径、Markdown/正文、媒体字段、Skill/MCP 来源、数据概览。",
        "状态：首页、内容管理、草稿箱、数据概览、创作规范、闪念编辑、文章编辑、图文编辑、视频编辑、Skill 路径、Skill GitHub、Skill 自定义、MCP 路径、MCP GitHub、MCP 自定义、审核中、未通过、已发布。"
      ],
      logic: [
        "发布字段按对象分离，媒体作为独立字段，不和正文混排成不可控展示。",
        "审核中、未通过、已发布只表达用户可见状态，不暴露审核命中或操作日志。",
        "作者工作台是轻版能力，不扩展完整运营后台。"
      ],
      ops: [
        "创作规范、状态提示、推荐发布路径和右侧提示由运营人工维护。",
        "6-7 月先用配置文件维护发布指引和状态文案。"
      ],
      acceptance: [
        "编辑态字段清晰，发布后状态能进入对应管理列表。",
        "未通过态只给用户可执行修改方向。",
        "创作服务保持工作台效率，但不出现 B端管理系统口吻。"
      ]
    },
    "c-end-announcement-list-v1": {
      title: "社区公告",
      purpose: [
        "承接社区规则、隐私公告和运营通知，让用户能查看官方说明。",
        "验证公告列表、公告详情、空态、加载和失败。"
      ],
      fields: [
        "信息对象：公告标题、公告类型、发布时间、摘要、正文、状态、返回入口。",
        "状态：社区公告、隐私公告详情、空态、加载、失败。"
      ],
      logic: [
        "公告是用户阅读页，不展示后台发布流程、审核状态或配置字段。",
        "公告详情只承接阅读和返回，不放多余运营按钮。",
        "失败态给用户可读反馈和重试/返回入口。"
      ],
      ops: [
        "公告标题、正文、排序、置顶和展示周期由运营人工维护。",
        "6-7 月先由配置文件维护公告内容，不做后台。"
      ],
      acceptance: [
        "公告列表不后台化，不出现系统日志或配置说明。",
        "空态、加载和失败态可走查。",
        "公告详情正文排版保持阅读优先。"
      ]
    }
  };

  const RULE_SECTION_LABELS = {
    purpose: "页面目的",
    fields: "字段状态",
    logic: "产品逻辑",
    ops: "运营维护",
    acceptance: "验收口径"
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
        right: 0;
        top: 92px;
        bottom: 24px;
        z-index: 1600;
        width: 360px;
        max-height: calc(100vh - 116px);
        color: #172033;
        font: 13px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        pointer-events: none;
      }

      [data-prototype-shell] * {
        box-sizing: border-box;
      }

      .prototype-shell-trigger {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        min-height: 94px;
        padding: 10px 6px;
        border: 1px solid #dddddd;
        border-right: 0;
        border-radius: 8px 0 0 8px;
        background: #ffffff;
        color: #242424;
        box-shadow: 0 12px 28px rgba(15, 23, 42, 0.10);
        writing-mode: vertical-rl;
        letter-spacing: 0;
        font-size: 13px;
        line-height: 16px;
        font-weight: 700;
        pointer-events: auto;
        cursor: pointer;
      }

      .prototype-shell-panel {
        position: absolute;
        top: 0;
        right: 0;
        display: none;
        width: 360px;
        max-height: min(680px, calc(100vh - 116px));
        overflow: auto;
        padding: 14px;
        border: 1px solid #dddddd;
        border-right: 0;
        border-radius: 12px 0 0 12px;
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 18px 44px rgba(15, 23, 42, 0.16);
        color: #242424;
        pointer-events: auto;
      }

      [data-prototype-shell].is-open .prototype-shell-panel {
        display: block;
      }

      [data-prototype-shell].is-open .prototype-shell-trigger {
        display: none;
      }

      .prototype-shell-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }

      .prototype-shell-title {
        display: grid;
        gap: 2px;
        font-size: 14px;
        font-weight: 700;
        color: #242424;
      }

      .prototype-shell-title span {
        color: #8a8a8a;
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
      }

      .prototype-shell-close {
        border: 0;
        background: #242424;
        color: #ffffff;
        border-radius: 50%;
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
        color: #8a8a8a;
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
        border: 1px solid #dddddd;
        border-radius: 999px;
        background: #ffffff;
        color: #4f4f4f;
        text-decoration: none;
        white-space: nowrap;
      }

      .prototype-shell-link.active {
        border-color: #242424;
        background: #242424;
        color: #ffffff;
      }

      .prototype-shell-main-tabs,
      .prototype-shell-rule-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 10px 0 12px;
      }

      .prototype-shell-main-tab,
      .prototype-shell-rule-tab {
        min-height: 28px;
        padding: 5px 10px;
        border: 1px solid #dddddd;
        border-radius: 999px;
        background: #ffffff;
        color: #4f4f4f;
        font-size: 12px;
        line-height: 16px;
        font-weight: 650;
        pointer-events: auto;
      }

      .prototype-shell-main-tab.is-active,
      .prototype-shell-rule-tab.is-active {
        border-color: #242424;
        background: #242424;
        color: #ffffff;
      }

      .prototype-shell-page-summary {
        margin: 0 0 10px;
        color: #4f4f4f;
        font-size: 13px;
        line-height: 20px;
      }

      .prototype-shell-rule-pane {
        display: grid;
        gap: 7px;
        margin-top: 8px;
      }

      .prototype-shell-rule-pane[hidden],
      .prototype-shell-main-pane[hidden] {
        display: none !important;
      }

      .prototype-shell-rule-pane ul {
        margin: 0;
        padding-left: 17px;
      }

      .prototype-shell-rule-pane li {
        margin: 0 0 6px;
        color: #4f4f4f;
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
        padding: 18px !important;
        overflow: hidden !important;
      }

      [data-topic-rail-standard] .rail-head,
      [data-topic-rail-standard] .right-title {
        height: auto !important;
        min-height: 22px !important;
        padding: 0 !important;
        margin: 0 0 14px !important;
        border-bottom: 0 !important;
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
        font: 700 16px/22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
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
        gap: 12px !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      [data-topic-rail-standard] .prototype-topic-pill {
        width: 100%;
        min-width: 0;
        height: 22px;
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
        font: 500 13px/18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
        font-weight: 500;
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
        font-size: 16px !important;
        line-height: 22px !important;
        font-weight: 700 !important;
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
        font-weight: 500 !important;
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
        if (detailTarget.matches("[data-service-card]")) {
          const href = detailTarget.getAttribute("data-detail-href");
          if (href) {
            event.preventDefault();
            location.href = href;
            return;
          }
          navigate("c-end-model-service-channel-v1", "detail");
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
      const topics = currentDir() === "c-end-detail-page-v1" && document.body.dataset.state === "model"
        ? MODEL_DETAIL_RECOMMENDED_TOPICS
        : STANDARD_RECOMMENDED_TOPICS;
      list.innerHTML = topics.map(([name, count]) => `
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

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderRuleList(items) {
    return `<ul>${(items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderRuleTabs(rules, activeKey) {
    return Object.keys(RULE_SECTION_LABELS)
      .filter((key) => rules[key]?.length)
      .map((key) => `
        <button
          type="button"
          class="prototype-shell-rule-tab${key === activeKey ? " is-active" : ""}"
          data-prototype-rule-tab="${key}"
          aria-selected="${key === activeKey ? "true" : "false"}"
        >${RULE_SECTION_LABELS[key]}</button>
      `).join("");
  }

  function renderRulePanes(rules, activeKey) {
    return Object.keys(RULE_SECTION_LABELS)
      .filter((key) => rules[key]?.length)
      .map((key) => `
        <section class="prototype-shell-rule-pane" data-prototype-rule-pane="${key}" ${key === activeKey ? "" : "hidden"}>
          <div class="prototype-shell-label">${RULE_SECTION_LABELS[key]}</div>
          ${renderRuleList(rules[key])}
        </section>
      `).join("");
  }

  function setPrototypeShellMainTab(shell, nextKey) {
    const key = nextKey === "rules" ? "rules" : "walkthrough";
    shell.querySelectorAll("[data-prototype-main-tab]").forEach((tab) => {
      const active = tab.getAttribute("data-prototype-main-tab") === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    shell.querySelectorAll("[data-prototype-main-pane]").forEach((pane) => {
      pane.hidden = pane.getAttribute("data-prototype-main-pane") !== key;
    });
  }

  function setPrototypeRuleTab(shell, nextKey) {
    const key = PAGE_RULES[currentDir()]?.[nextKey]?.length ? nextKey : "purpose";
    shell.querySelectorAll("[data-prototype-rule-tab]").forEach((tab) => {
      const active = tab.getAttribute("data-prototype-rule-tab") === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    shell.querySelectorAll("[data-prototype-rule-pane]").forEach((pane) => {
      pane.hidden = pane.getAttribute("data-prototype-rule-pane") !== key;
    });
  }

  function renderPrototypeShell() {
    if (window.location.protocol === "file:") return;
    if (document.querySelector("[data-prototype-shell]")) return;
    if (document.querySelector("[data-prototype-shell-merged]")) return;

    const dir = currentDir();
    const states = STATE_LABELS[dir] || [];
    const rules = PAGE_RULES[dir] || {
      title: "页面走查规则",
      purpose: ["确认页面目的、字段状态、产品规则、运营维护和验收口径。"],
      fields: ["按当前页面对象逐项确认字段、状态和入口。"],
      logic: ["只表达 C端用户可见逻辑，不展示后台实现说明。"],
      ops: ["可运营维护项先用配置文件承接。"],
      acceptance: ["页面无横向溢出，状态和跳转可走查。"]
    };
    const params = new URLSearchParams(window.location.search);
    const activeState = params.get("state") || states[0]?.[0] || "";
    const requestedReview = params.get("review");
    const initialMainTab = requestedReview === "rules" ? "rules" : "walkthrough";
    const initialRuleTab = Object.keys(RULE_SECTION_LABELS).find((key) => rules[key]?.length) || "purpose";

    const shell = document.createElement("aside");
    shell.className = "prototype-shell";
    shell.setAttribute("data-prototype-shell", "true");
    shell.innerHTML = `
      <button class="prototype-shell-trigger" type="button" data-prototype-shell-open aria-label="打开走查规则">走查规则</button>
      <section class="prototype-shell-panel" role="complementary" aria-label="页面走查规则">
        <div class="prototype-shell-head">
          <div class="prototype-shell-title">
            <strong>走查规则</strong>
            <span>${escapeHtml(rules.title)}</span>
          </div>
          <button class="prototype-shell-close" type="button" data-prototype-shell-close aria-label="收起走查规则">×</button>
        </div>
        <div class="prototype-shell-main-tabs" role="tablist" aria-label="走查规则分区">
          <button type="button" class="prototype-shell-main-tab${initialMainTab === "walkthrough" ? " is-active" : ""}" data-prototype-main-tab="walkthrough" aria-selected="${initialMainTab === "walkthrough" ? "true" : "false"}">原型走查</button>
          <button type="button" class="prototype-shell-main-tab${initialMainTab === "rules" ? " is-active" : ""}" data-prototype-main-tab="rules" aria-selected="${initialMainTab === "rules" ? "true" : "false"}">研发规则</button>
        </div>
        <div class="prototype-shell-main-pane" data-prototype-main-pane="walkthrough" ${initialMainTab === "walkthrough" ? "" : "hidden"}>
          <p class="prototype-shell-page-summary">当前页面用于演示可见页面、状态切换和核心跳转；说明面板不影响页面操作。</p>
          <div class="prototype-shell-group" data-prototype-page-group>
            <div class="prototype-shell-label">页面</div>
            <div class="prototype-shell-links">${renderPageLinks(REVIEW_PAGES, dir)}</div>
          </div>
          ${states.length > 1 ? `
            <div class="prototype-shell-group" data-prototype-state-group>
              <div class="prototype-shell-label">状态</div>
              <div class="prototype-shell-links">${renderStateLinks(states, dir, activeState)}</div>
            </div>
          ` : ""}
        </div>
        <div class="prototype-shell-main-pane" data-prototype-main-pane="rules" ${initialMainTab === "rules" ? "" : "hidden"}>
          <p class="prototype-shell-page-summary">以下规则用于产品、运营和研发对齐页面逻辑，6-7 月先按配置文件承接人工维护项。</p>
          <div class="prototype-shell-rule-tabs" role="tablist" aria-label="研发规则栏目">
            ${renderRuleTabs(rules, initialRuleTab)}
          </div>
          ${renderRulePanes(rules, initialRuleTab)}
        </div>
      </section>
    `;
    shell.querySelector("[data-prototype-shell-open]").addEventListener("click", () => {
      shell.classList.add("is-open");
      setPrototypeShellMainTab(shell, "walkthrough");
    });
    shell.querySelector("[data-prototype-shell-close]").addEventListener("click", () => {
      shell.classList.remove("is-open");
    });
    shell.querySelectorAll("[data-prototype-main-tab]").forEach((tab) => {
      tab.addEventListener("click", () => setPrototypeShellMainTab(shell, tab.getAttribute("data-prototype-main-tab")));
    });
    shell.querySelectorAll("[data-prototype-rule-tab]").forEach((tab) => {
      tab.addEventListener("click", () => setPrototypeRuleTab(shell, tab.getAttribute("data-prototype-rule-tab")));
    });
    document.body.appendChild(shell);
    if (requestedReview === "rules" || requestedReview === "walkthrough") {
      shell.classList.add("is-open");
      setPrototypeShellMainTab(shell, initialMainTab);
    }
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
