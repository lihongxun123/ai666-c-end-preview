(function () {
  const icon = (name) => `../../../resources/icons/remixicon/svg/${name}`;
  const params = new URLSearchParams(window.location.search);
  const state = params.get("state") || "default";
  const stage = document.querySelector("[data-stage]");
  const allModels = window.MODEL_SERVICE_MODELS || [];
  const sourceMeta = window.MODEL_SERVICE_META || { counts: { all: allModels.length } };
  const firstBatchModelIds = [
    "gpt-5.2",
    "gpt-4.1",
    "gpt-4.1-mini",
    "gpt-4o",
    "gpt-4o-mini",
    "o3-mini",
    "o4-mini",
    "claude-sonnet-4-6",
    "claude-opus-4-6",
    "gemini-3-pro-preview",
    "gemini-2.5-pro",
    "grok-4.1",
    "text-embedding-3-large",
    "whisper-1",
    "gpt-4o-all"
  ];
  const models = firstBatchModelIds
    .map((modelId) => allModels.find((item) => item.model === modelId))
    .filter(Boolean);
  const visibleProviderKeys = new Set(models.map((item) => item.providerKey));
  const visibleModelIds = new Set(models.map((item) => item.model));
  const catalogCounts = models.reduce((counts, item) => {
    counts.all += 1;
    counts[item.typeKey] = (counts[item.typeKey] || 0) + 1;
    return counts;
  }, { all: 0, text: 0, image: 0, audio: 0, video: 0, api: 0 });
  const meta = {
    ...sourceMeta,
    sourceTotal: sourceMeta.total || allModels.length,
    visibleTotal: models.length,
    visibleModelIds: models.map((item) => item.model),
    counts: catalogCounts
  };
  window.MODEL_SERVICE_VISIBLE_MODELS = models;
  window.MODEL_SERVICE_CATALOG_META = meta;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function syncFilterCounts() {
    const counts = meta.counts || {};
    document.querySelectorAll("[data-type-filter]").forEach((tab) => {
      const key = tab.dataset.typeFilter;
      const count = counts[key] ?? 0;
      tab.dataset.filterCount = String(count);
      const strong = tab.querySelector("strong");
      if (strong) strong.textContent = String(count);
    });
  }

  function providerOptionVisible(provider) {
    if (provider === "xai") return false;
    if (provider === "unknown") return visibleProviderKeys.has("unknown");
    return visibleProviderKeys.has(provider);
  }

  function syncProviderOptions() {
    document.querySelectorAll("[data-provider-option]").forEach((button) => {
      const visible = providerOptionVisible(button.dataset.providerOption);
      button.hidden = !visible;
      button.setAttribute("aria-hidden", visible ? "false" : "true");
    });
  }

  function setActiveType(type) {
    document.querySelectorAll("[data-type-filter]").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.typeFilter === type);
    });
  }

  function setProviderMenu(open) {
    document.querySelector("[data-provider-filter]")?.classList.toggle("is-open", open);
  }

  function modelDetailHref(item) {
    const url = new URL(window.location.href);
    url.searchParams.set("state", "detail");
    url.searchParams.set("model", item.model);
    url.searchParams.delete("content");
    return url.href;
  }

  function contentDetailHref(item, postId) {
    const url = new URL(window.location.href);
    url.searchParams.set("state", "content");
    url.searchParams.set("model", item.model);
    url.searchParams.set("content", postId);
    return url.href;
  }

  function listHref(type = "all") {
    const url = new URL(window.location.href);
    url.searchParams.set("state", type === "all" ? "default" : type);
    url.searchParams.delete("model");
    return url.href;
  }

  function filterByType(type) {
    if (type === "all" || type === "default") return models;
    return models.filter((item) => item.typeKey === type);
  }

  function filterByProvider(provider) {
    return models.filter((item) => {
      if (provider === "xai") return item.providerKey === "grok";
      if (provider === "unknown") return item.providerKey === "unknown";
      return item.providerKey === provider;
    });
  }

  function renderTags(tags) {
    return (tags || []).slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  }

  const TEMPLATE_PROFILES = {
    "通用文本模型介绍": {
      objective: "用克制的官方说明解释对话、摘要、写作、推理和知识整理任务边界。",
      introBlocks: ["模型定位", "适合任务", "不适合任务", "成本口径", "替代建议"],
      caseSlots: ["论文综述辅助", "客服知识库问答", "长文档摘要"],
      reviewPoints: ["供应商归属", "上下文口径", "成本敏感提示"],
      relatedSlots: [
        ["官方介绍", "通用文本模型介绍", "说明模型定位、任务边界、输入输出和替代建议。"],
        ["场景案例", "写作 / 摘要 / 知识整理", "展示输入材料、生成结果和人工修订点。"],
        ["API 经验", "选型与迁移", "沉淀用户从旧模型迁移到当前模型的判断依据。"]
      ]
    },
    "代码 / 工具调用模型介绍": {
      objective: "解释代码、工具调用、结构化输出和复杂任务拆解能力，避免写成泛文本模型。",
      introBlocks: ["代码能力", "工具调用边界", "文件与结构化输出", "错误处理", "人工校验点"],
      caseSlots: ["脚本初稿生成", "软著材料整理", "Vibe Coding 排查"],
      reviewPoints: ["是否夸大自动开发能力", "是否说明人工校验", "是否避开真实凭证"],
      relatedSlots: [
        ["官方介绍", "代码 / 工具调用模型介绍", "说明代码能力、工具边界、结构化输出和错误处理。"],
        ["场景案例", "脚本 / 软著 / 代码解释", "用真实任务展示模型输出和人工校验结果。"],
        ["API 经验", "迁移与排查", "沉淀调用格式、响应稳定性和成本控制经验。"]
      ]
    },
    "多模态文本模型介绍": {
      objective: "突出图像、文件或长上下文输入能力，同时说明输出仍以文本判断为主。",
      introBlocks: ["输入类型", "识图与文件能力", "长上下文边界", "输出限制", "材料适配"],
      caseSlots: ["截图理解", "长文档整理", "图文问答"],
      reviewPoints: ["输入模态是否真实", "文件能力是否保守", "是否说明复杂材料需要人工复核"],
      relatedSlots: [
        ["官方介绍", "多模态文本模型介绍", "说明识图、文件、长上下文和文本输出边界。"],
        ["场景案例", "截图 / 文档 / 图文问答", "展示材料输入、结果摘要和人工复核点。"],
        ["选型排查", "多模态失败原因", "解释识图不稳定、文件过长和成本敏感场景。"]
      ]
    },
    "图像生成模型介绍": {
      objective: "以提示词、风格边界、尺寸口径和结果反链解释生图能力。",
      introBlocks: ["生成能力", "Prompt 示例", "风格与尺寸边界", "结果反链", "版权提醒"],
      caseSlots: ["电商图", "海报素材", "头像与角色图"],
      reviewPoints: ["是否有结果图反链", "是否避免版权承诺", "是否说明提示词可复用"],
      relatedSlots: [
        ["官方介绍", "图像生成模型介绍", "说明生成能力、Prompt 结构、风格边界和成本口径。"],
        ["AIGC 作品", "创意广场反链", "展示提示词、生成结果和使用模型，作品仍归 AIGC 承接。"],
        ["场景案例", "电商图 / 海报 / 头像", "按可复用提示词和结果说明组织案例。"]
      ]
    },
    "视频生成模型介绍": {
      objective: "说明视频生成方式、时长边界、速度质量取舍和作品反链。",
      introBlocks: ["生成方式", "时长边界", "速度与质量", "Prompt 示例", "结果限制"],
      caseSlots: ["短视频镜头", "广告片段", "首尾帧生成"],
      reviewPoints: ["是否说明时长限制", "是否避免效果承诺", "是否反链 AIGC 作品"],
      relatedSlots: [
        ["官方介绍", "视频生成模型介绍", "说明生成方式、时长、速度、质量和成本口径。"],
        ["AIGC 作品", "视频作品反链", "展示镜头结果、提示词和使用模型，作品仍归 AIGC 承接。"],
        ["场景案例", "短视频 / 广告片段", "按镜头任务、结果和人工筛选点组织案例。"]
      ]
    },
    "语音生成模型介绍": {
      objective: "围绕文本转语音、音色、格式和配音场景说明能力。",
      introBlocks: ["文本转语音", "音色与质量", "音频格式", "商用提醒", "工作流入口"],
      caseSlots: ["短视频配音", "课程旁白", "播客片头"],
      reviewPoints: ["是否说明版权和音色边界", "是否标注音频格式", "是否避免商用承诺"],
      relatedSlots: [
        ["官方介绍", "语音生成模型介绍", "说明文本转语音、音色边界、格式和使用提醒。"],
        ["场景案例", "配音 / 旁白 / 播客", "展示文本输入、音频结果说明和人工听检点。"],
        ["API 经验", "音频工作流", "沉淀格式、成本和多轮生成经验。"]
      ]
    },
    "语音转写模型介绍": {
      objective: "解释音频输入、语言转写、字幕和纪要整理链路。",
      introBlocks: ["音频输入", "语言转写", "字幕场景", "纪要整理", "人工校对"],
      caseSlots: ["会议纪要", "字幕整理", "访谈转写"],
      reviewPoints: ["是否强调人工校对", "是否标注语言边界", "是否避免准确率承诺"],
      relatedSlots: [
        ["官方介绍", "语音转写模型介绍", "说明音频输入、语言、字幕和纪要场景。"],
        ["场景案例", "会议纪要 / 字幕 / 访谈", "展示转写结果、摘要和人工校对点。"],
        ["API 经验", "音频格式排查", "沉淀格式、时长和错误处理经验。"]
      ]
    },
    "Embedding / 检索模型介绍": {
      objective: "说明向量用途、资料切分、检索链路和 RAG 中的位置。",
      introBlocks: ["向量用途", "切分策略", "检索链路", "RAG 位置", "成本口径"],
      caseSlots: ["知识库检索", "客服资料问答", "资料库召回"],
      reviewPoints: ["是否避免算法承诺", "是否说明只是检索链路组件", "是否标注成本口径"],
      relatedSlots: [
        ["官方介绍", "Embedding / 检索模型介绍", "说明向量用途、资料切分、检索和 RAG 边界。"],
        ["场景案例", "知识库检索", "展示从材料切分到检索结果的示例。"],
        ["API 经验", "开发者笔记", "沉淀接入、排错和成本控制经验。"]
      ]
    }
  };

  const DETAIL_CONTENT = {
    "gpt-5.2": {
      status: "待补价格/可用性",
      recommendation: "首批候选，暂不强推",
      positioning: "面向复杂任务、代码协作、长文档整理和多步骤推理的高能力模型入口。",
      intro: [
        "gpt-5.2 当前作为 OpenAI 高能力模型入口收录在模型服务中，适合承接需要更强推理、代码理解和复杂材料整理的任务。",
        "正式发布前仍需要人工确认中转站可用性、站内价格口径、是否仍为当前主推入口，以及适合替代的低成本模型。"
      ],
      fit: ["复杂方案拆解", "代码解释与审校", "长文档摘要", "多步骤任务规划"],
      notFit: ["没有人工核验的事实结论", "只需要低成本批处理的轻任务", "价格敏感且不需要高能力的调用"],
      missing: ["中转站真实可用性", "站内价格口径", "替代模型提示", "复杂任务案例"],
      slots: [
        ["官方介绍", "高能力复杂任务入口", "说明模型定位、能力边界、适合任务和替代建议。", "待人工复核"],
        ["场景案例", "论文综述 / 代码审校 / 方案拆解", "用真实材料展示输入、输出、人工修订点和风险提醒。", "待补素材"],
        ["API 经验", "高成本任务如何降级", "沉淀何时用高能力模型，何时切换到 mini 或稳定模型。", "待补经验"]
      ],
      conversion: "适合放在 API 灰度申请的高能力候选入口，但必须在价格和可用性确认后再进入首页强推荐。"
    },
    "gpt-4.1": {
      status: "待补价格/可用性",
      recommendation: "开发者候选",
      positioning: "偏代码、工具调用、结构化输出和开发者任务的稳定模型入口。",
      intro: [
        "gpt-4.1 适合承接代码解释、脚本初稿、结构化输出、软著材料整理和工具链协作类内容。",
        "详情页需要强调人工校验，避免把生成代码、合规材料或业务判断写成可直接上线的确定结果。"
      ],
      fit: ["代码解释", "脚本初稿", "软著材料整理", "结构化输出"],
      notFit: ["无人审核后直接改生产系统", "安全性要求高但缺少测试的代码交付", "需要法律结论的材料"],
      missing: ["站内价格", "快照别名", "代码案例", "工具能力边界"],
      slots: [
        ["官方介绍", "代码与工具调用模型介绍", "说明代码能力、工具边界、错误处理和人工校验点。", "待人工复核"],
        ["场景案例", "软著材料 / 脚本解释", "展示从输入材料到初稿，再到人工修订的完整样例。", "待补案例"],
        ["API 经验", "开发者迁移笔记", "沉淀调用格式、响应稳定性和成本控制经验。", "待补经验"]
      ],
      conversion: "可作为开发者 API 灰度入口，优先引导用户提交代码类或材料整理类试用需求。"
    },
    "gpt-4.1-mini": {
      status: "待补价格/可用性",
      recommendation: "低成本候选",
      positioning: "适合批量摘要、客服草稿、轻量分类和低成本内容处理的模型入口。",
      intro: [
        "gpt-4.1-mini 更适合把高频、可抽检、低风险的文本任务做成低成本工作流。",
        "详情页需要说明它不是高风险事实判断或复杂代码交付的默认选择，必要时应升级到更高能力模型。"
      ],
      fit: ["批量摘要", "客服草稿", "轻量分类", "内容初筛"],
      notFit: ["复杂推理", "高风险事实判断", "无人抽检的大批量发布", "强代码正确性任务"],
      missing: ["站内价格", "批处理边界", "抽检规则", "升级模型建议"],
      slots: [
        ["官方介绍", "低成本文本模型介绍", "说明适合的批处理任务、成本优势和抽检要求。", "待人工复核"],
        ["场景案例", "批量摘要 / 客服草稿", "展示如何把轻任务分批处理并人工抽检。", "待补案例"],
        ["API 经验", "批处理成本控制", "沉淀任务拆分、失败重试和升级路径经验。", "待补经验"]
      ],
      conversion: "适合引导价格敏感用户申请低成本批处理试用，详情页需保留升级建议。"
    },
    "gpt-4o": {
      status: "待补价格/可用性",
      recommendation: "多模态候选",
      positioning: "适合图文理解、截图分析、文件材料整理和多模态问答的模型入口。",
      intro: [
        "gpt-4o 的详情重点应放在图像/文本材料输入后的理解、摘要和结构化能力，而不是图像生成。",
        "正式发布前需要确认中转站 API 侧可用性、图像输入限制、站内价格和隐私图片脱敏提醒。"
      ],
      fit: ["截图理解", "图文问答", "文件材料整理", "多模态内容结构化"],
      notFit: ["未脱敏的隐私图片", "需要完全准确识别细节的高风险材料", "图像生成任务"],
      missing: ["API 可用性", "图像输入限制", "站内价格", "隐私脱敏提醒"],
      slots: [
        ["官方介绍", "多模态文本模型介绍", "说明输入类型、识图边界、文件材料处理和输出限制。", "待人工复核"],
        ["场景案例", "截图分析 / 图文问答", "展示材料输入、模型摘要和人工复核结果。", "待补案例"],
        ["API 经验", "多模态输入排查", "沉淀图片大小、隐私脱敏和失败重试经验。", "待补经验"]
      ],
      conversion: "可作为多模态 API 体验候选，但必须先把输入限制和隐私边界讲清楚。"
    },
    "gpt-4o-mini": {
      status: "待补价格/可用性",
      recommendation: "低成本多模态候选",
      positioning: "适合轻量图文理解、低成本内容初筛和可抽检的多模态任务。",
      intro: [
        "gpt-4o-mini 适合把简单图文理解、截图归类、轻量摘要等任务做成低成本入口。",
        "详情页需要保留升级路径，避免用户把低成本模型用于要求完全准确的复杂视觉判断。"
      ],
      fit: ["轻量图文理解", "截图归类", "素材说明生成", "低成本摘要"],
      notFit: ["复杂视觉细节判断", "隐私材料未脱敏", "需要高准确率的图像审核", "图像生成"],
      missing: ["站内价格", "视觉输入限制", "抽检规则", "AIGC 作品标签案例"],
      slots: [
        ["官方介绍", "低成本多模态介绍", "说明轻量图文理解、成本边界和升级建议。", "待人工复核"],
        ["场景案例", "截图归类 / 素材说明", "展示可抽检的轻量图文任务。", "待补案例"],
        ["API 经验", "低成本多模态工作流", "沉淀输入压缩、抽检和模型升级经验。", "待补经验"]
      ],
      conversion: "适合低成本多模态试用申请，详情页不承诺复杂识图准确率。"
    },
    "o3-mini": {
      status: "延期，不进首页推荐",
      recommendation: "历史模型迁移说明",
      positioning: "更适合作为旧调用兼容和推理模型迁移排查入口，而不是新用户首推模型。",
      intro: [
        "o3-mini 当前详情应以历史兼容、迁移提醒和替代建议为主，不适合作为首页推荐模型。",
        "如果站内仍可调用，也应说明生命周期风险，并引导用户评估更合适的当前模型。"
      ],
      fit: ["旧调用排查", "历史任务复现", "推理模型迁移", "替代模型说明"],
      notFit: ["新项目默认选型", "首页强推荐", "未确认可用性的调用", "长期稳定依赖"],
      missing: ["是否仍可调用", "替代模型", "迁移建议", "站内价格"],
      slots: [
        ["官方介绍", "历史推理模型说明", "说明生命周期、适用边界和迁移建议。", "待人工复核"],
        ["选型排查", "从 o3-mini 迁移", "帮助旧用户判断是否需要切换模型。", "待补说明"],
        ["API 经验", "旧调用兼容问题", "沉淀旧接口、失败原因和替代路径。", "待补经验"]
      ],
      conversion: "不作为首批推荐转化入口，只用于旧用户迁移和排查。"
    },
    "o4-mini": {
      status: "延期，不进首页推荐",
      recommendation: "历史小型推理入口",
      positioning: "适合作为旧小型推理模型的迁移说明和选型排查入口。",
      intro: [
        "o4-mini 当前不适合作为新用户默认推荐，详情页应强调历史兼容、替代模型和迁移路径。",
        "如果站内仍保留该模型，需要明确它的边界和更推荐的当前选择。"
      ],
      fit: ["历史调用排查", "小型推理任务复盘", "迁移说明", "替代模型对照"],
      notFit: ["新项目首选", "首页推荐", "长期稳定依赖", "未确认可用性的自动化调用"],
      missing: ["站内可用性", "替代模型", "迁移建议", "视觉/代码边界"],
      slots: [
        ["官方介绍", "历史小型推理模型说明", "说明旧模型定位、生命周期和替代建议。", "待人工复核"],
        ["选型排查", "从 o4-mini 切换", "帮助用户判断是否保留旧调用或迁移。", "待补说明"],
        ["API 经验", "旧任务兼容", "沉淀旧调用失败、成本和迁移经验。", "待补经验"]
      ],
      conversion: "不进入首页和右栏推荐，只保留排查和迁移用途。"
    },
    "claude-sonnet-4-6": {
      status: "待补价格/可用性",
      recommendation: "Claude 平衡候选",
      positioning: "适合长文档、写作、代码审校和生产工作负载的平衡型 Claude 入口。",
      intro: [
        "claude-sonnet-4-6 的详情应突出长文档理解、写作修订、代码审校和较平衡的生产任务处理。",
        "正式发布前需要确认 Anthropic ID、站内可用性、站内价格和长文档案例。"
      ],
      fit: ["长文档总结", "写作修订", "代码审校", "复杂材料整理"],
      notFit: ["不脱敏的敏感文档", "需要法律/财务确定结论的任务", "无人复核的生产发布"],
      missing: ["站内价格", "模型 ID", "上下文/输出限制", "长文档案例"],
      slots: [
        ["官方介绍", "Claude 平衡型模型介绍", "说明长文档、写作和代码审校边界。", "待人工复核"],
        ["场景案例", "长文档 / 写作修订", "展示材料输入、摘要结果和人工修订。", "待补案例"],
        ["API 经验", "Claude 工作负载迁移", "沉淀成本、上下文和输出稳定性经验。", "待补经验"]
      ],
      conversion: "可作为 Claude API 灰度候选，适合长文档和写作类专业用户。"
    },
    "claude-opus-4-6": {
      status: "待补价格/可用性",
      recommendation: "高能力选型候选",
      positioning: "适合高复杂度分析和高质量输出要求，但需要谨慎解释成本与版本关系。",
      intro: [
        "claude-opus-4-6 可作为高能力 Claude 入口，但详情页不应把它写成当前唯一或默认最优选择。",
        "正式发布前需要复核站内可用性、价格、同族版本变化和与 Sonnet 的任务分工。"
      ],
      fit: ["高复杂度分析", "长文档深度审读", "高质量写作修订", "复杂代码审查"],
      notFit: ["价格敏感的批量任务", "无需高能力的轻量处理", "未确认版本关系的强推荐"],
      missing: ["站内价格", "版本关系", "替代模型", "成本边界"],
      slots: [
        ["官方介绍", "Claude 高能力模型说明", "说明能力优势、成本边界和同族替代。", "待人工复核"],
        ["场景案例", "深度审读 / 高质量修订", "展示高复杂度任务的输入、输出和人工判读。", "待补案例"],
        ["选型排查", "Opus 与 Sonnet 怎么选", "帮助用户按质量、速度和成本选择。", "待补说明"]
      ],
      conversion: "适合放在右栏高能力选型，不建议在价格复核前占首页首屏。"
    },
    "gemini-3-pro-preview": {
      status: "待补别名/聚合映射",
      recommendation: "迁移提醒",
      positioning: "适合作为 Gemini preview 旧名映射和迁移提醒，而不是独立强推模型。",
      intro: [
        "gemini-3-pro-preview 的详情重点应是站内旧名、官方版本变化和可能的迁移目标。",
        "在确认是否映射到更新模型前，不应进入首页推荐或右栏强推。"
      ],
      fit: ["旧名映射说明", "Gemini preview 迁移", "多模态任务排查", "版本变化提醒"],
      notFit: ["独立可选模型强推", "长期稳定依赖", "未确认映射关系的 API 接入"],
      missing: ["旧名映射", "新模型目标", "站内价格", "迁移说明"],
      slots: [
        ["官方介绍", "Gemini preview 迁移说明", "说明版本变化、站内映射和使用风险。", "待人工复核"],
        ["选型排查", "preview 到稳定模型", "帮助用户从旧名切换到可确认模型。", "待补说明"],
        ["API 经验", "Gemini 映射问题", "沉淀接口名、失败原因和迁移经验。", "待补经验"]
      ],
      conversion: "不作为转化主入口，只承接旧用户排查和迁移。"
    },
    "gemini-2.5-pro": {
      status: "待补价格/可用性",
      recommendation: "Gemini 稳定候选",
      positioning: "适合长上下文、多模态理解、复杂资料整理和 Gemini 稳定入口选型。",
      intro: [
        "gemini-2.5-pro 适合作为 Gemini 稳定模型入口，尤其适合长文档、图文材料和多模态理解类任务。",
        "详情页需要补齐站内价格、输入限制、上下文边界和隐私脱敏提醒。"
      ],
      fit: ["长文档整理", "多模态问答", "复杂资料分析", "Gemini 稳定选型"],
      notFit: ["未脱敏的隐私材料", "需要完全准确图像识别的高风险任务", "价格未确认的批量调用"],
      missing: ["站内价格", "输入限制", "上下文边界", "长文档案例"],
      slots: [
        ["官方介绍", "Gemini 稳定长上下文入口", "说明长上下文、多模态和输出边界。", "待人工复核"],
        ["场景案例", "长文档 / 图文资料整理", "展示材料输入、摘要和人工复核。", "待补案例"],
        ["API 经验", "Gemini 长上下文接入", "沉淀上下文、成本和失败重试经验。", "待补经验"]
      ],
      conversion: "通过复核后适合作为首页 Gemini 稳定入口和 API 灰度候选。"
    },
    "grok-4.1": {
      status: "待补别名/聚合映射",
      recommendation: "热点事实核验候选",
      positioning: "适合热点资料辅助、事实核验提示和 Grok 相关能力观察，但需先确认站内映射。",
      intro: [
        "grok-4.1 的详情不能默认承诺实时搜索或事实自动核验，必须先确认站内模型实际映射和能力边界。",
        "如果映射确认，可用于热点信息整理、资料对照和事实核验工作流的辅助说明。"
      ],
      fit: ["热点资料整理", "事实核验辅助", "信息对照", "Grok 选型观察"],
      notFit: ["未经核验的事实结论", "自动真伪判断", "未确认搜索能力的实时信息任务"],
      missing: ["实际映射", "搜索能力边界", "站内价格", "事实核验案例"],
      slots: [
        ["官方介绍", "Grok 热点辅助说明", "说明模型定位、映射风险和事实核验边界。", "待人工复核"],
        ["场景案例", "热点资料对照", "展示多来源资料输入和人工核验流程。", "待补案例"],
        ["选型排查", "Grok 能力边界", "帮助用户判断何时需要其它模型或人工查证。", "待补说明"]
      ],
      conversion: "暂不进入首页强推；通过映射复核后可放入事实核验专题。"
    },
    "text-embedding-3-large": {
      status: "待补价格/可用性",
      recommendation: "API 专业优先候选",
      positioning: "面向文本向量化、知识库检索、RAG 资料召回和相似内容检索的专业入口。",
      intro: [
        "text-embedding-3-large 不是对话生成模型，它的价值在于把文本转成向量，服务知识库检索、RAG 和相似内容召回。",
        "详情页需要明确 endpoint、价格、向量维度、切分策略和检索评测提醒，不能承诺固定召回效果。"
      ],
      fit: ["知识库检索", "RAG 资料召回", "客服问答召回", "相似内容检索"],
      notFit: ["直接生成最终回答", "没有评测就承诺召回质量", "只需要普通对话的任务"],
      missing: ["endpoint", "站内价格", "向量维度", "RAG 入门案例"],
      slots: [
        ["官方介绍", "Embedding / 检索模型介绍", "说明向量用途、资料切分、检索链路和 RAG 边界。", "待人工复核"],
        ["场景案例", "知识库/RAG 入门", "展示材料切分、向量化和召回结果的样例。", "待补案例"],
        ["API 经验", "开发者接入笔记", "沉淀 endpoint、排错、成本和 small 版本替代经验。", "待补经验"]
      ],
      conversion: "优先作为 API 专业用户转化入口，适合引导提交知识库/RAG 试用需求。"
    },
    "whisper-1": {
      status: "待补价格/可用性",
      recommendation: "音频转写候选",
      positioning: "适合语音转文本、字幕整理、会议纪要和访谈资料处理的 API 工具入口。",
      intro: [
        "whisper-1 的详情应强调音频输入、语言/格式支持、人工校对和录音授权，而不是承诺转写完全准确。",
        "正式发布前需要确认站内转写端点、价格、文件限制和格式支持。"
      ],
      fit: ["会议纪要", "字幕整理", "访谈转写", "录音资料归档"],
      notFit: ["未经授权的录音处理", "完全自动发布字幕", "需要法律效力的逐字稿"],
      missing: ["转写端点", "站内价格", "文件限制", "语言/格式支持"],
      slots: [
        ["官方介绍", "语音转写模型介绍", "说明音频输入、语言、字幕和纪要场景。", "待人工复核"],
        ["场景案例", "会议纪要 / 字幕整理", "展示转写结果、摘要和人工校对点。", "待补案例"],
        ["API 经验", "音频格式排查", "沉淀格式、时长、失败处理和授权提醒。", "待补经验"]
      ],
      conversion: "适合放在右栏 API 工具候选，引导音频转写和字幕整理试用。"
    },
    "gpt-4o-all": {
      status: "待补别名/聚合映射",
      recommendation: "中转站聚合说明",
      positioning: "适合解释中转站聚合入口价值，但必须先说明它不是 OpenAI 官方单模型 ID。",
      intro: [
        "gpt-4o-all 更像中转站聚合或封装入口，详情页必须解释它的模型范围、供应商归属、失败回退和能力边界。",
        "在映射确认前，不适合作为首页推荐模型，只适合做聚合入口说明和 API 用户排查。"
      ],
      fit: ["中转站聚合说明", "旧调用排查", "模型别名解释", "API 用户迁移"],
      notFit: ["按官方单模型 ID 宣传", "未确认聚合范围的强推荐", "高风险稳定生产依赖"],
      missing: ["聚合范围", "供应商归属", "失败回退", "站内价格"],
      slots: [
        ["官方介绍", "中转站聚合入口说明", "说明非官方单模型 ID、聚合范围和使用边界。", "待人工复核"],
        ["选型排查", "gpt-4o-all 与 gpt-4o", "帮助用户区分官方模型名和站内封装入口。", "待补说明"],
        ["API 经验", "聚合入口失败排查", "沉淀回退、价格和能力差异经验。", "待补经验"]
      ],
      conversion: "适合作为中转站价值解释页，不作为首批首页强推荐入口。"
    }
  };
  window.MODEL_SERVICE_DETAIL_CONTENT = DETAIL_CONTENT;

  function profileFor(item) {
    return TEMPLATE_PROFILES[item.template] || TEMPLATE_PROFILES["通用文本模型介绍"];
  }

  function renderBullets(items) {
    return `<ul class="detail-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function userConfirmationItems(items) {
    const map = new Map([
      ["中转站真实可用性", "确认当前通道是否可用，避免选型后无法调用。"],
      ["站内可用性", "确认当前通道是否可用，避免选型后无法调用。"],
      ["是否仍可调用", "确认当前通道是否仍可调用，并准备替代模型。"],
      ["站内是否仍可调用", "确认当前通道是否仍可调用，并准备替代模型。"],
      ["站内价格", "确认当前调用价格和预算，避免批量任务成本失控。"],
      ["站内价格口径", "确认当前调用价格和预算，避免批量任务成本失控。"],
      ["替代模型提示", "准备低成本或更稳定的替代模型建议。"],
      ["替代模型", "准备低成本或更稳定的替代模型建议。"],
      ["模型 ID", "确认站内名称、官方名称和实际调用模型一致。"],
      ["旧名映射", "确认站内名称、官方名称和实际调用模型一致。"],
      ["实际映射", "确认站内名称、官方名称和实际调用模型一致。"],
      ["聚合范围", "确认聚合入口实际覆盖哪些模型和能力。"],
      ["供应商归属", "确认供应商和站内封装关系，避免误认官方模型。"],
      ["失败回退", "确认失败时是否有回退模型和提示。"],
      ["图像输入限制", "确认图片大小、格式和隐私脱敏要求。"],
      ["视觉输入限制", "确认图片大小、格式和隐私脱敏要求。"],
      ["输入限制", "确认输入类型、上下文和文件限制。"],
      ["上下文边界", "确认上下文长度和输出限制。"],
      ["上下文/输出限制", "确认上下文长度和输出限制。"],
      ["文件限制", "确认文件大小、时长、格式和上传要求。"],
      ["语言/格式支持", "确认语言、格式和人工校对要求。"],
      ["endpoint", "确认 endpoint、请求格式和错误处理方式。"],
      ["转写端点", "确认 endpoint、请求格式和错误处理方式。"],
      ["向量维度", "确认维度、切分策略和召回评测口径。"],
      ["RAG 入门案例", "准备知识库/RAG 样例，帮助用户理解接入方式。"],
      ["复杂任务案例", "准备一个真实任务样例，展示输入、输出和人工复核。"],
      ["代码案例", "准备一个代码或材料整理案例，展示人工校验点。"],
      ["事实核验案例", "准备多来源核验样例，避免把模型输出当事实。"],
      ["AIGC 作品标签案例", "准备可反链的作品或素材案例。"],
      ["迁移建议", "准备从旧模型迁移到当前可用模型的建议。"],
      ["旧名映射、新模型目标、站内价格、迁移说明", "确认旧名是否映射到新模型，并给出迁移路径。"],
      ["搜索能力边界", "确认是否支持搜索，以及搜索结果需要人工核验。"],
      ["隐私脱敏提醒", "准备隐私图片、文件和录音的脱敏提醒。"],
      ["抽检规则", "设置批量任务的人工抽检规则。"],
      ["升级模型建议", "准备何时升级到更高能力模型的判断标准。"]
    ]);
    return (items || []).map((item) => map.get(item) || item);
  }

  function userScenarioItems(items) {
    const map = new Map([
      ["首页强推荐", "未确认可用性前作为默认首选"],
      ["首页推荐", "未确认可用性前作为默认首选"],
      ["独立可选模型强推", "把旧名当作独立稳定模型选择"],
      ["未确认版本关系的强推荐", "未确认版本关系时作为默认选择"],
      ["未确认聚合范围的强推荐", "未确认聚合范围时作为默认生产依赖"],
      ["未确认可用性的调用", "未确认通道可用性的生产调用"],
      ["未确认可用性的自动化调用", "未确认通道可用性的自动化调用"],
      ["未确认映射关系的 API 接入", "未确认映射关系的生产接入"]
    ]);
    return (items || []).map((item) => map.get(item) || item);
  }

  function detailUserLabel(item) {
    const labels = {
      "gpt-5.2": "复杂任务",
      "gpt-4.1": "代码 / 工具",
      "gpt-4.1-mini": "低成本文本",
      "gpt-4o": "多模态理解",
      "gpt-4o-mini": "轻量多模态",
      "o3-mini": "迁移参考",
      "o4-mini": "迁移参考",
      "claude-sonnet-4-6": "长文档写作",
      "claude-opus-4-6": "高质量审读",
      "gemini-3-pro-preview": "版本迁移",
      "gemini-2.5-pro": "长上下文",
      "grok-4.1": "热点辅助",
      "text-embedding-3-large": "RAG / 检索",
      "whisper-1": "语音转写",
      "gpt-4o-all": "聚合入口"
    };
    return labels[item.model] || `${item.type || "模型"}服务`;
  }

  function detailUserIntro(item, detail) {
    const fullIntro = {
      "o3-mini": [
        "o3-mini 当前详情以历史兼容、迁移提醒和替代建议为主，帮助旧调用用户判断是否还需要保留。",
        "使用前先确认当前通道是否仍可调用；如果是新项目，建议按页面给出的迁移路径选择更稳定模型。"
      ],
      "o4-mini": [
        "o4-mini 当前详情以历史兼容、迁移提醒和替代建议为主，帮助旧调用用户判断是否还需要保留。",
        "使用前先确认当前通道是否仍可调用；如果是新项目，建议按页面给出的迁移路径选择更稳定模型。"
      ],
      "gpt-4o-all": [
        "gpt-4o-all 更像中转站聚合或封装入口，详情页需要解释它的模型范围、供应商归属、失败回退和能力边界。",
        "使用前先确认站内聚合范围和回退逻辑；它更适合帮助用户理解中转站封装，而不是当作官方单模型名称。"
      ]
    };
    if (fullIntro[item.model]) return fullIntro[item.model];
    const notes = {
      "gpt-5.2": "使用前重点确认当前通道、价格和低成本替代方案；高价值复杂任务可以优先试用，批量轻任务建议先看 mini 或稳定模型。",
      "gpt-4o": "使用前重点确认图片输入限制、站内价格和隐私脱敏要求；涉及个人图片、合同截图或业务资料时先做脱敏。",
      "claude-sonnet-4-6": "使用前确认 Anthropic ID、站内可用性、价格和长文档案例；更适合先从文档审读、写作修订等可人工复核任务试用。",
      "claude-opus-4-6": "使用前确认站内可用性、价格和与 Sonnet 的分工；建议用于高价值审读、复杂修订和质量优先任务。",
      "gemini-3-pro-preview": "使用前先确认站内是否已映射到更新的 Gemini 模型；如果只是旧名兼容，优先按迁移说明选择稳定入口。",
      "whisper-1": "使用前确认转写端点、价格、文件大小/时长限制和格式支持；涉及会议或访谈录音时先确认授权和脱敏。"
    };
    if (!notes[item.model]) return detail.intro;
    return [detail.intro?.[0], notes[item.model]].filter(Boolean);
  }

  function detailUserPositioning(item, detail) {
    const summaries = {
      "gemini-3-pro-preview": "适合作为 Gemini preview 旧名映射和迁移提醒页，帮助用户确认是否应切换到稳定入口。",
      "gpt-4o-all": "适合解释中转站聚合入口价值，同时说明它不是 OpenAI 官方单模型 ID。"
    };
    return summaries[item.model] || detail.positioning;
  }

  function detailUserConversion(item, detail) {
    const conversions = {
      "gpt-5.2": "适合从高价值复杂任务开始试用：方案拆解、代码审校、长文档整理；批量任务建议先确认预算和替代模型。",
      "gpt-4.1": "适合提交代码解释、脚本初稿、软著材料整理等试用意向；输出进入人工校验后再复用。",
      "gpt-4.1-mini": "适合从批量摘要、客服草稿、轻量分类开始试用；需要设置抽检和升级到高能力模型的条件。",
      "gpt-4o": "适合用截图分析、图文问答和材料整理发起体验；上传前先做隐私脱敏。",
      "gpt-4o-mini": "适合用轻量截图归类、素材说明和低成本图文任务试用；复杂识图再切换到更高能力模型。",
      "o3-mini": "适合旧调用用户查看迁移说明，优先确认是否仍能调用以及推荐替代模型。",
      "o4-mini": "适合旧调用用户查看迁移说明，优先确认是否仍能调用以及推荐替代模型。",
      "claude-sonnet-4-6": "适合长文档、写作修订和代码审校试用；先从可人工复核的专业材料开始。",
      "claude-opus-4-6": "适合高质量审读、复杂修订和质量优先任务；价格敏感的批量任务先看 Sonnet 或轻量模型。",
      "gemini-3-pro-preview": "适合处理旧名映射和迁移咨询，帮助用户切换到当前可确认的 Gemini 入口。",
      "gemini-2.5-pro": "适合长文档、图文资料和稳定 Gemini 入口试用；重点确认上下文、文件和价格边界。",
      "grok-4.1": "适合围绕热点资料对照和事实核验做辅助体验；结论需要多来源人工确认。",
      "text-embedding-3-large": "适合知识库/RAG 接入意向，帮助用户理解向量化、召回和评测链路。",
      "whisper-1": "适合会议纪要、字幕整理和访谈转写试用；音频授权、格式和人工校对要先确认。",
      "gpt-4o-all": "适合解释中转站聚合入口，让用户先理解封装范围、回退逻辑和与官方模型名的区别。"
    };
    return conversions[item.model] || detail.conversion;
  }

  const MODEL_POST_COPY = {
    "gpt-5.2": {
      caseTitle: "用 gpt-5.2 拆解复杂方案评审材料",
      caseInput: "输入一份 6000 字产品方案、3 条待决策问题和已有风险清单，让模型先拆出目标、约束、关键分歧和可验证动作。",
      caseOutput: "输出被整理成决策摘要、风险分层、3 个低成本验证动作和人工复核清单，适合放进项目复盘或老板汇报。",
      apiTitle: "高能力模型如何控制调用成本",
      apiInput: "记录同一任务在 gpt-5.2 与 mini 模型上的输出差异、耗时感受、人工修订量和预算敏感点。",
      apiOutput: "沉淀出先用 mini 批量整理，再用 gpt-5.2 处理关键段落的组合策略，避免把所有任务都交给高能力模型。"
    },
    "gpt-4.1": {
      caseTitle: "用 gpt-4.1 生成软著材料初稿",
      caseInput: "输入项目功能说明、模块清单、页面截图说明和已有技术关键词，要求模型生成可人工编辑的软件说明书结构。",
      caseOutput: "输出包括模块功能、操作流程、术语解释和待人工补证点，用户可以继续进入软著材料整理流程。",
      apiTitle: "开发者迁移到 gpt-4.1 的排查笔记",
      apiInput: "记录从旧模型迁移时的提示词差异、结构化输出稳定性、代码解释质量和失败重试原因。",
      apiOutput: "形成一篇开发者经验贴：哪些任务适合迁移，哪些仍需要人工测试和代码审查。"
    },
    "gpt-4.1-mini": {
      caseTitle: "用 gpt-4.1-mini 批量整理客服问答",
      caseInput: "输入 30 条用户咨询和标准回复草稿，让模型归类问题、合并重复问法，并生成可抽检的回复版本。",
      caseOutput: "输出按问题类型分组，附带低风险回复草稿和需要人工确认的敏感问题。",
      apiTitle: "低成本文本任务的抽检经验",
      apiInput: "记录 100 条轻量文本任务的抽样比例、人工改动原因和升级到高能力模型的条件。",
      apiOutput: "沉淀出批处理经验：低风险任务用 mini，命中事实、价格、政策类问题时升级。"
    },
    "gpt-4o": {
      caseTitle: "用 gpt-4o 分析产品截图并生成改版建议",
      caseInput: "输入一组页面截图和用户反馈，让模型先识别页面结构、核心按钮、信息密度和可能的理解障碍。",
      caseOutput: "输出截图观察、问题归因、改版建议和人工复核点，适合作为产品走查案例。",
      apiTitle: "多模态输入的隐私脱敏经验",
      apiInput: "记录图片大小、截图内容、脱敏方式和失败重试情况，避免直接上传包含个人信息的图片。",
      apiOutput: "形成多模态 API 经验：上传前裁剪敏感区域，复杂材料先拆图，再合并人工判断。"
    },
    "gpt-4o-mini": {
      caseTitle: "用 gpt-4o-mini 给素材截图打标签",
      caseInput: "输入一批运营素材截图，让模型识别主题、适用场景、可复用标签和需要人工改写的文案。",
      caseOutput: "输出轻量标签表和素材说明，适合做 AIGC 内容归档或素材库初筛。",
      apiTitle: "低成本多模态工作流经验",
      apiInput: "记录同一批截图在轻量模型上的识别准确点、漏判点和升级到更高模型的条件。",
      apiOutput: "沉淀出先用轻量模型筛选，再人工抽检或升级关键样本的工作流。"
    },
    "o3-mini": {
      caseTitle: "从 o3-mini 旧调用迁移到当前模型",
      caseInput: "输入旧调用任务、旧提示词和失败样例，让页面解释迁移风险，并给出替代模型选择路径。",
      caseOutput: "输出旧任务保留建议、替代模型推荐和迁移前需要确认的通道信息。",
      apiTitle: "旧推理模型兼容排查经验",
      apiInput: "记录旧接口名、错误提示、可用性确认结果和替代模型测试记录。",
      apiOutput: "形成旧用户经验贴：保留历史说明，重点引导用户迁移到当前可确认模型。"
    },
    "o4-mini": {
      caseTitle: "从 o4-mini 旧任务切换到稳定入口",
      caseInput: "输入旧任务目标、模型名、输出样例和当前可选模型，让页面解释是否需要继续保留旧入口。",
      caseOutput: "输出迁移建议、替代模型和人工验证步骤，避免把历史模型当作新项目默认选择。",
      apiTitle: "小型推理旧调用的回退经验",
      apiInput: "记录旧模型调用失败、回退策略、成本变化和人工验证结果。",
      apiOutput: "沉淀出兼容经验：旧调用先确认可用性，新任务优先看当前稳定入口。"
    },
    "claude-sonnet-4-6": {
      caseTitle: "用 Claude Sonnet 处理长文档修订",
      caseInput: "输入一份长文档、修订目标和语气要求，让模型生成摘要、结构问题和分段修订建议。",
      caseOutput: "输出长文档摘要、重点段落修订和人工复核清单，适合写作、方案和材料审读。",
      apiTitle: "Claude 长上下文任务接入经验",
      apiInput: "记录文档长度、拆分方式、输出稳定性、人工修订量和成本敏感点。",
      apiOutput: "形成长文档经验贴：材料先分段，关键结论人工确认，再决定是否升级到更高能力模型。"
    },
    "claude-opus-4-6": {
      caseTitle: "用 Claude Opus 做高质量审读",
      caseInput: "输入深度报告、评审标准和目标读者，让模型输出质量问题、逻辑漏洞和改写建议。",
      caseOutput: "输出高质量审读记录，强调模型给出的是辅助判断，最终结论仍由人工确认。",
      apiTitle: "Opus 与 Sonnet 的任务分工经验",
      apiInput: "记录同一文档在 Sonnet 与 Opus 上的输出差异、成本感受和人工修改量。",
      apiOutput: "沉淀出选型经验：质量优先任务用 Opus，批量和速度优先任务先看 Sonnet。"
    },
    "gemini-3-pro-preview": {
      caseTitle: "Gemini preview 旧名如何迁移",
      caseInput: "输入站内旧模型名、调用目标和当前失败信息，让页面解释旧名映射与稳定入口选择。",
      caseOutput: "输出旧名说明、迁移路径和使用前确认项，帮助用户避免误用 preview 名称。",
      apiTitle: "Gemini 旧名映射排查经验",
      apiInput: "记录接口名、响应差异、失败原因和当前可确认的替代模型。",
      apiOutput: "形成 API 经验贴：先确认站内映射，再进入真实任务测试。"
    },
    "gemini-2.5-pro": {
      caseTitle: "用 Gemini 2.5 Pro 整理长图文资料",
      caseInput: "输入长文档摘要、图片说明和待提取问题，让模型整理关键信息、疑点和后续核验清单。",
      caseOutput: "输出图文资料摘要、关键问题和人工复核点，适合长上下文材料整理。",
      apiTitle: "Gemini 长上下文接入经验",
      apiInput: "记录上下文长度、文件限制、失败重试和成本变化。",
      apiOutput: "沉淀出经验：长材料先拆结构，输出按章节复核，再决定是否进入自动化流程。"
    },
    "grok-4.1": {
      caseTitle: "用 Grok 做热点资料对照",
      caseInput: "输入热点事件摘要、多个来源片段和待核验问题，让模型整理观点差异和需要人工查证的事实。",
      caseOutput: "输出多来源对照表、争议点和人工核验清单，不把模型结果当事实结论。",
      apiTitle: "热点辅助模型的事实核验经验",
      apiInput: "记录搜索能力边界、来源差异、模型回答偏差和人工确认结果。",
      apiOutput: "形成经验贴：热点任务只做辅助整理，最终判断依赖多来源核验。"
    },
    "text-embedding-3-large": {
      caseTitle: "用 Embedding 搭建知识库检索样例",
      caseInput: "输入一组 FAQ、产品文档和用户问题，让页面演示资料切分、向量化、召回和人工评测。",
      caseOutput: "输出知识库/RAG 入门案例，解释 embedding 不直接生成回答，而是服务检索链路。",
      apiTitle: "Embedding 接入与召回评测经验",
      apiInput: "记录切分粒度、向量维度、召回命中、误召回和成本估算。",
      apiOutput: "沉淀出 API 经验：先评估召回质量，再接生成模型，不直接承诺回答准确率。"
    },
    "whisper-1": {
      caseTitle: "用 Whisper 整理会议纪要",
      caseInput: "输入已授权的会议录音说明、参会角色和纪要目标，让页面展示转写、摘要和人工校对流程。",
      caseOutput: "输出转写摘要、行动项和人工校对点，强调录音授权与隐私处理。",
      apiTitle: "音频格式和转写失败排查经验",
      apiInput: "记录音频格式、时长、语言、失败原因和人工修正量。",
      apiOutput: "形成 API 经验贴：先确认格式和授权，再做转写，重要纪要必须人工校对。"
    },
    "gpt-4o-all": {
      caseTitle: "解释 gpt-4o-all 与官方模型名的区别",
      caseInput: "输入站内模型名、官方模型名和用户任务，让页面解释聚合入口、封装范围和回退逻辑。",
      caseOutput: "输出中转站聚合说明，帮助用户理解它不是官方单模型 ID。",
      apiTitle: "聚合入口失败回退经验",
      apiInput: "记录聚合入口调用结果、可能回退模型、价格差异和能力差异。",
      apiOutput: "形成 API 经验贴：先确认聚合范围，再用于任务测试，避免误把封装入口当作官方模型。"
    }
  };

  function postCopyFor(item) {
    return MODEL_POST_COPY[item.model] || {
      caseTitle: `${item.title} 场景案例`,
      caseInput: `输入一个 ${item.type} 任务样例，让模型说明适用边界、生成结果和人工复核点。`,
      caseOutput: "输出可阅读的场景案例，帮助用户理解这个模型适合什么任务。",
      apiTitle: `${item.title} API 使用经验`,
      apiInput: "记录调用目标、输入限制、失败原因和人工复核结果。",
      apiOutput: "输出 API 用户经验，帮助后续用户理解接入方式和风险边界。"
    };
  }

  function generatedPostsFor(item) {
    const copy = postCopyFor(item);
    return [
      {
        id: "case",
        kind: "场景案例",
        source: "脚本生成样例",
        title: copy.caseTitle,
        summary: copy.caseOutput,
        input: copy.caseInput,
        output: copy.caseOutput,
        review: ["确认输入材料已脱敏", "确认输出只作为初稿", "保留人工复核和修订记录"],
        next: "读完案例后，可以回到模型详情提交 API 体验意向或收藏模型。"
      },
      {
        id: "api",
        kind: "API 经验",
        source: "用户经验样例",
        title: copy.apiTitle,
        summary: copy.apiOutput,
        input: copy.apiInput,
        output: copy.apiOutput,
        review: ["不展示真实密钥和账户信息", "记录失败原因而不是只写成功结果", "把价格和可用性留给站内实时口径确认"],
        next: "读完经验后，可以回到模型详情判断是否适合自己的任务。"
      }
    ];
  }

  function detailContentFor(item) {
    return DETAIL_CONTENT[item.model] || {
      status: "资料待补",
      recommendation: "长尾模型骨架",
      positioning: `${item.model} 当前已进入模型对象库，详情内容待运营复核后补齐。`,
      intro: [item.summary],
      fit: ["查看模型对象", "等待官方介绍", "等待案例回流"],
      notFit: ["把未复核信息写成确定事实", "展示真实密钥或账户信息"],
      missing: ["官方来源", "站内价格", "可用性", "关联案例"],
      slots: [
        ["官方介绍", "待生成官方介绍", "补齐来源、边界、成本口径和替代建议。", "待补"],
        ["场景案例", "待补场景案例", "补齐用户能复用的输入、输出和人工复核点。", "待补"],
        ["API 经验", "待补 API 经验", "补齐接入、排错和成本控制经验。", "待补"]
      ],
      conversion: "该模型暂不作为前台推荐入口。"
    };
  }

  function renderIntroParagraphs(paragraphs) {
    return (paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  }

  function renderScenarioCard(title, items, type) {
    return `
      <article class="detail-scenario-card" data-detail-scenario-card="${escapeHtml(type)}">
        <span>${escapeHtml(title)}</span>
        ${renderBullets(items)}
      </article>
    `;
  }

  function renderContentSlots(slots) {
    return (slots || []).map(([label, title, desc]) => `
      <article class="detail-content-card detail-slot-card" data-detail-slot-card>
        <div class="slot-head">
          <span>${escapeHtml(label)}</span>
        </div>
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(desc)}</p>
      </article>
    `).join("");
  }

  function renderGeneratedPostCards(item) {
    return generatedPostsFor(item).map((post) => `
      <article
        class="generated-post-card"
        data-generated-post-card
        data-content-href="${escapeHtml(contentDetailHref(item, post.id))}"
        data-content-id="${escapeHtml(post.id)}"
        role="link"
        tabindex="0"
        aria-label="查看 ${escapeHtml(post.title)}"
      >
        <div class="post-card-top">
          <span>${escapeHtml(post.kind)}</span>
          <em>${escapeHtml(post.source)}</em>
        </div>
        <strong>${escapeHtml(post.title)}</strong>
        <p>${escapeHtml(post.summary)}</p>
        <div class="post-card-footer">
          <span>使用模型</span>
          <b>${escapeHtml(item.title)}</b>
        </div>
      </article>
    `).join("");
  }

  function renderReviewItems(items) {
    return (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderCard(item) {
    return `
      <article
        class="service-card"
        data-service-card
        data-model-name="${escapeHtml(item.model)}"
        data-provider="${escapeHtml(item.providerKey)}"
        data-type="${escapeHtml(item.typeKey)}"
        data-detail-href="${escapeHtml(modelDetailHref(item))}"
        role="link"
        tabindex="0"
        aria-label="查看 ${escapeHtml(item.title)} 模型档案"
      >
        <div class="card-top">
          <div class="badge-row">
            <span class="badge ${escapeHtml(item.badgeClass)}">${escapeHtml(item.type)}</span>
            <span class="badge ${escapeHtml(item.badgeClass)}">${escapeHtml(item.badge)}</span>
          </div>
          <span class="source">${escapeHtml(item.source)}</span>
        </div>
        <h3 class="service-title">${escapeHtml(item.title)}</h3>
        <p class="summary">${escapeHtml(item.summary)}</p>
        <div class="tag-row">${renderTags(item.tags)}</div>
        <div class="spec-row">
          <span class="spec">类型 <strong>${escapeHtml(item.type)}</strong></span>
          <span class="spec">计费 <strong>${escapeHtml(item.billing)}</strong></span>
          <span class="spec">接口 <strong>${escapeHtml(item.endpoint)}</strong></span>
        </div>
        <div class="card-footer">
          <div class="provider-line">
            <span>中转站清单</span>
            <span>·</span>
            <span>${escapeHtml(item.updated)}</span>
          </div>
          <div class="stat-line">
            <span class="stat"><img class="meta-icon" data-icon src="${icon("Document/article-line.svg")}" alt="" />官方介绍</span>
            <span class="stat"><img class="meta-icon" data-icon src="${icon("Business/links-line.svg")}" alt="" />案例集合</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderGrid(list) {
    const visibleList = list;
    stage.innerHTML = `<div class="service-grid" data-service-grid>${visibleList.map((item) => renderCard(item)).join("")}</div>`;
  }

  function renderEmpty(scope = "当前筛选") {
    stage.innerHTML = `
      <section class="panel empty-state" data-empty>
        <div class="empty-box">
          <div class="state-icon">
            <img data-icon src="${icon("System/star-line.svg")}" alt="" />
          </div>
          <h2 class="state-title">${escapeHtml(scope)}暂无可展示服务</h2>
          <p class="state-desc">当前开放 15 个已整理模型；其它模型会在补齐介绍和案例后陆续开放。</p>
          <button class="ghost-btn primary-soft" data-reset-filter>回到全部模型</button>
        </div>
      </section>
    `;
    stage.querySelector("[data-reset-filter]")?.addEventListener("click", () => applyTypeFilter("all"));
  }

  function renderLoading() {
    stage.innerHTML = `
      <section class="loading-state" data-loading>
        <div class="loading-grid">
          ${Array.from({ length: 6 }).map(() => `<div class="skeleton-card" data-skeleton-card></div>`).join("")}
        </div>
      </section>
    `;
  }

  function renderFailed() {
    stage.innerHTML = `
      <section class="panel failed-state" data-failed>
        <div class="failed-box">
          <div class="state-icon">
            <img data-icon src="${icon("System/error-warning-line.svg")}" alt="" />
          </div>
          <h2 class="state-title">模型服务加载失败</h2>
          <p class="state-desc">网络可能暂时不可用，可以重试或先回到模型目录。</p>
          <button class="ghost-btn primary-soft" data-reset-filter>重新加载</button>
        </div>
      </section>
    `;
    stage.querySelector("[data-reset-filter]")?.addEventListener("click", () => applyTypeFilter("all"));
  }

  function findModel() {
    const requested = params.get("model");
    if (!requested) return models.find((item) => item.model === "gpt-5.2") || models[0] || allModels[0];
    return models.find((item) => item.model === requested) || models[0] || allModels[0];
  }

  function findGeneratedPost(item) {
    const postId = params.get("content") || "case";
    const posts = generatedPostsFor(item);
    return posts.find((post) => post.id === postId) || posts[0];
  }

  function renderDetail() {
    const item = findModel();
    if (!item) {
      renderEmpty("模型详情");
      return;
    }
    setActiveType("");
    setProviderMenu(false);
    const detail = detailContentFor(item);
    const userLabel = detailUserLabel(item);
    const introParagraphs = detailUserIntro(item, detail);
    const detailSummary = detailUserPositioning(item, detail);
    const conversionCopy = detailUserConversion(item, detail);
    const slotHtml = renderContentSlots(detail.slots);
    const generatedPostHtml = renderGeneratedPostCards(item);
    stage.innerHTML = `
      <section class="panel model-detail-panel" data-model-service-detail data-detail-surface="model-service" data-model-name="${escapeHtml(item.model)}" data-official-template="${escapeHtml(item.template)}" data-production-mode="content-driven">
        <div class="model-detail-hero">
          <a class="detail-back" href="${escapeHtml(listHref("all"))}" data-back-model-list>
            <img data-icon src="${icon("Arrows/arrow-left-line.svg")}" alt="" />
            模型服务
          </a>
          <div class="detail-kicker">
            <span class="badge ${escapeHtml(item.badgeClass)}">${escapeHtml(item.type)}</span>
            <span class="badge">${escapeHtml(item.provider)}</span>
            <span class="badge">${escapeHtml(userLabel)}</span>
            <span class="source">${escapeHtml(item.source)}</span>
          </div>
          <h1 class="detail-title">${escapeHtml(item.title)}</h1>
          <p class="detail-summary">${escapeHtml(detailSummary)}</p>
          <div class="tag-row detail-tags">${renderTags(item.tags)}</div>
        </div>
        <div class="model-detail-grid">
          <div class="detail-fact"><span>供应商</span><strong>${escapeHtml(item.provider)}</strong></div>
          <div class="detail-fact"><span>前台分类</span><strong>${escapeHtml(item.type)}</strong></div>
          <div class="detail-fact"><span>计费口径</span><strong>${escapeHtml(item.billing)}</strong></div>
          <div class="detail-fact"><span>接口类型</span><strong>${escapeHtml(item.endpoint)}</strong></div>
          <div class="detail-fact"><span>页面内容</span><strong>官方介绍 / 案例集合</strong></div>
          <div class="detail-fact"><span>清单日期</span><strong>${escapeHtml(item.updated)}</strong></div>
        </div>
        <div class="detail-section detail-intro-section" data-detail-official-intro data-detail-status="${escapeHtml(detail.status)}">
          <div class="panel-title-row">
            <div>
              <h2>模型介绍</h2>
              <p>先解释这个模型适合什么任务，再给出使用边界和下一步入口。</p>
            </div>
            <span class="detail-status-pill">${escapeHtml(userLabel)}</span>
          </div>
          <div class="detail-intro-copy">${renderIntroParagraphs(introParagraphs)}</div>
        </div>
        <div class="detail-section detail-scenario-section">
          <div class="panel-title-row">
            <div>
              <h2>适合与不适合</h2>
              <p>先给用户选型判断，再进入案例或 API 体验。</p>
            </div>
          </div>
          <div class="detail-scenario-grid">
            ${renderScenarioCard("适合场景", detail.fit, "fit")}
            ${renderScenarioCard("不适合场景", userScenarioItems(detail.notFit), "not-fit")}
            ${renderScenarioCard("使用前确认", userConfirmationItems(detail.missing), "confirm")}
          </div>
        </div>
        <div class="detail-section">
          <div class="panel-title-row">
            <div>
              <h2>内容看点</h2>
              <p>把官方说明、场景案例和 API 经验放在同一个模型页里。</p>
            </div>
          </div>
          <div class="detail-content-grid">${slotHtml}</div>
        </div>
        <div class="detail-section detail-generated-section" data-generated-post-section>
          <div class="panel-title-row">
            <div>
              <h2>案例与经验</h2>
              <p>用生成贴承接模型能力说明，读完内容可以回到模型详情继续转化。</p>
            </div>
          </div>
          <div class="generated-post-grid">${generatedPostHtml}</div>
        </div>
        <div class="detail-section detail-conversion-section" data-detail-conversion>
          <div class="panel-title-row">
            <div>
              <h2>下一步入口</h2>
              <p>${escapeHtml(conversionCopy)}</p>
            </div>
          </div>
          <div class="detail-action-grid">
            <article class="detail-action-card" data-detail-action-card>
              <span>API 体验申请</span>
              <strong>提交模型试用意向</strong>
              <p>进入人工灰度名单，由运营复核用户任务、模型需求和风险边界。</p>
            </article>
            <article class="detail-action-card" data-detail-action-card>
              <span>收藏模型</span>
              <strong>放入选型清单</strong>
              <p>用于后续对比模型、补充案例和回访 API 使用意向。</p>
            </article>
            <article class="detail-action-card" data-detail-action-card>
              <span>查看相关内容</span>
              <strong>浏览案例与经验</strong>
              <p>围绕模型的官方说明、场景案例和用户经验都会聚合回本页。</p>
            </article>
          </div>
        </div>
        <div class="safe-note detail-safe-note">价格、可用性、别名和聚合范围需要以实际站内显示为准；本页只用于模型选型和内容理解，不展示真实密钥、账户余额、调用日志或调用控制台。</div>
      </section>
    `;
  }

  function renderContentDetail() {
    const item = findModel();
    if (!item) {
      renderEmpty("内容详情");
      return;
    }
    setActiveType("");
    setProviderMenu(false);
    const post = findGeneratedPost(item);
    stage.innerHTML = `
      <section class="panel model-content-panel" data-model-generated-content-detail data-model-name="${escapeHtml(item.model)}" data-content-id="${escapeHtml(post.id)}" data-content-kind="${escapeHtml(post.kind)}">
        <div class="content-detail-hero">
          <a class="detail-back" href="${escapeHtml(modelDetailHref(item))}" data-back-model-detail>
            <img data-icon src="${icon("Arrows/arrow-left-line.svg")}" alt="" />
            ${escapeHtml(item.title)}
          </a>
          <div class="detail-kicker">
            <span class="badge">${escapeHtml(post.kind)}</span>
            <span class="badge">${escapeHtml(item.provider)}</span>
            <span class="source">使用模型：${escapeHtml(item.title)}</span>
          </div>
          <h1 class="detail-title">${escapeHtml(post.title)}</h1>
          <p class="detail-summary">${escapeHtml(post.summary)}</p>
        </div>
        <div class="content-detail-grid">
          <article class="content-main-article">
            <div class="content-block" data-content-input>
              <span>输入材料</span>
              <p>${escapeHtml(post.input)}</p>
            </div>
            <div class="content-block" data-content-output>
              <span>生成结果摘要</span>
              <p>${escapeHtml(post.output)}</p>
            </div>
            <div class="content-block" data-content-review>
              <span>人工复核点</span>
              <ul>${renderReviewItems(post.review)}</ul>
            </div>
          </article>
          <aside class="content-side-panel">
            <div class="content-model-card" data-content-model-card>
              <span>关联模型</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.summary)}</p>
              <a href="${escapeHtml(modelDetailHref(item))}" data-content-model-link>查看模型详情</a>
            </div>
            <div class="content-model-card">
              <span>下一步</span>
              <strong>回到模型页完成转化</strong>
              <p>${escapeHtml(post.next)}</p>
            </div>
          </aside>
        </div>
        <div class="safe-note detail-safe-note">生成贴为内容形态样例，只展示脱敏后的任务描述、结果摘要和人工复核点；不展示真实密钥、账户余额、调用日志或用户隐私数据。</div>
      </section>
    `;
  }

  function applyTypeFilter(type) {
    setActiveType(type);
    setProviderMenu(false);
    const list = filterByType(type);
    if (list.length) {
      renderGrid(list);
    } else {
      renderEmpty(`${type || "当前"}模型服务`);
    }
  }

  function bindFilters() {
    document.querySelectorAll("[data-type-filter]").forEach((button) => {
      button.addEventListener("click", () => applyTypeFilter(button.dataset.typeFilter));
    });

    document.querySelector("[data-provider-trigger]")?.addEventListener("click", () => {
      const filter = document.querySelector("[data-provider-filter]");
      filter?.classList.toggle("is-open");
    });

    document.querySelectorAll("[data-provider-option]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-provider-option]").forEach((item) => item.classList.toggle("active", item === button));
        document.querySelector("[data-provider-label]").textContent = button.textContent.trim();
        setProviderMenu(false);
        setActiveType("all");
        const list = filterByProvider(button.dataset.providerOption);
        if (list.length) {
          renderGrid(list);
        } else {
          renderEmpty(button.textContent.trim());
        }
      });
    });

    stage.addEventListener("click", (event) => {
      const back = event.target.closest("[data-back-model-list]");
      if (back) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = back.href;
        return;
      }
      const generatedPost = event.target.closest("[data-generated-post-card]");
      if (generatedPost) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = generatedPost.dataset.contentHref;
        return;
      }
      const card = event.target.closest("[data-service-card]");
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.href = card.dataset.detailHref;
    });

    stage.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const generatedPost = event.target.closest("[data-generated-post-card]");
      if (generatedPost) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = generatedPost.dataset.contentHref;
        return;
      }
      const card = event.target.closest("[data-service-card]");
      if (!card) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.href = card.dataset.detailHref;
    });
  }

  function initState() {
    if (state === "detail") {
      renderDetail();
    } else if (state === "content") {
      renderContentDetail();
    } else if (state === "text") {
      applyTypeFilter("text");
    } else if (state === "image") {
      applyTypeFilter("image");
    } else if (state === "audio") {
      applyTypeFilter("audio");
    } else if (state === "video") {
      applyTypeFilter("video");
    } else if (state === "api") {
      applyTypeFilter("api");
    } else if (state === "provider") {
      applyTypeFilter("all");
      setProviderMenu(true);
    } else if (state === "hover") {
      applyTypeFilter("all");
    } else if (state === "empty") {
      setActiveType("all");
      renderEmpty("未知供应商");
    } else if (state === "loading") {
      setActiveType("all");
      renderLoading();
    } else if (state === "failed") {
      setActiveType("all");
      renderFailed();
    } else {
      applyTypeFilter("all");
    }
  }

  syncFilterCounts();
  syncProviderOptions();
  bindFilters();
  initState();
})();
