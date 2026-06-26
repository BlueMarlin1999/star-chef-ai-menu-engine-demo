(function renderStarChefV08A() {
  const data = window.__STAR_CHEF_V08A_DATA__;
  const importSummary = window.__STAR_CHEF_V08A_IMPORT_SUMMARY__;
  if (!data) return;

  const state = {
    filter: "all",
    selectedItemId: data.supplierItems[0]?.id,
    selectedMenu: null,
    activityLog: [
      "系统已载入蓝鼎 2026.6 报价、新品和时令菜候选池。",
      "项目规则已应用：早餐只开面档；午餐 5 档齐开；晚餐只开面档和炒菜 1。",
    ],
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function append(parent, children) {
    children.forEach((child) => {
      if (child) parent.appendChild(child);
    });
    return parent;
  }

  function button(className, text, attrs = {}) {
    const node = el("button", className, text);
    node.type = "button";
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function selectedItem() {
    return data.supplierItems.find((item) => item.id === state.selectedItemId) || data.supplierItems[0];
  }

  function statusClass(status) {
    return {
      ready: "ok",
      trial: "trial",
      review: "warn",
      blocked: "blocked",
      pass: "ok",
    }[status] || "warn";
  }

  function statusText(status) {
    return {
      ready: "可入候选",
      trial: "需试推",
      review: "需人工确认",
      blocked: "阻断",
      pass: "通过",
    }[status] || status;
  }

  function requiresHuman(item) {
    return item.status !== "ready" || item.missing.length > 0 || item.supplyRisk === "高";
  }

  function filteredItems() {
    if (state.filter === "all") return data.supplierItems;
    if (state.filter === "human") return data.supplierItems.filter(requiresHuman);
    return data.supplierItems.filter((item) => item.status === state.filter);
  }

  function ensureSelectedItemVisible() {
    const items = filteredItems();
    if (items.length > 0 && !items.some((item) => item.id === state.selectedItemId)) {
      state.selectedItemId = items[0].id;
      state.selectedMenu = null;
    }
  }

  function pill(text, tone = "plain") {
    return el("span", `pill ${tone}`, text);
  }

  function percent(value) {
    if (typeof value !== "number") return "-";
    return `${Math.round(value * 1000) / 10}%`;
  }

  function list(items, className = "tight-list") {
    const ul = el("ul", className);
    items.forEach((item) => ul.appendChild(el("li", "", item)));
    return ul;
  }

  function section(targetId, title, subtitle, content) {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.replaceChildren();
    const wrapper = el("section", "panel");
    const head = el("div", "panel-head");
    append(head, [el("h2", "", title), el("p", "", subtitle)]);
    const body = el("div", "panel-body");
    body.appendChild(content);
    append(wrapper, [head, body]);
    target.appendChild(wrapper);
  }

  function renderHero() {
    const target = document.getElementById("hero");
    if (!target) return;

    const wrapper = el("section", "hero");
    const copy = el("div", "hero-copy");
    append(copy, [
      el("p", "project-code", `${data.project.name} / ${data.project.region} / ${data.project.code}`),
      el("h1", "", `Star Chef ${data.version} · ${data.title}`),
      el("p", "hero-subtitle", data.subtitle),
      el("p", "decision", data.project.decision),
    ]);

    const operation = el("div", "operation-card");
    append(operation, [
      el("h2", "", "本轮上线边界"),
      el("p", "", data.project.operatingBoundary),
      el("h3", "", "当前项目规则"),
      el("p", "", data.project.serviceModel),
    ]);

    const metrics = el("div", "metric-strip");
    data.metrics.forEach((metric) => {
      const metricNode = el("article", "metric");
      append(metricNode, [el("span", "", metric.label), el("strong", "", metric.value), el("p", "", metric.note)]);
      metrics.appendChild(metricNode);
    });

    append(wrapper, [copy, operation, metrics]);
    target.replaceChildren(wrapper);
  }

  function renderImportSummary() {
    if (!importSummary) return;

    const summary = importSummary.summary;
    const wrap = el("div", "import-layout");
    const metrics = el("div", "import-metrics");
    [
      ["真实报价行", `${summary.row_count}`, `${importSummary.sheet_name} sheet / ${importSummary.source_file}`],
      ["供应商主体", `${summary.supplier_count} 家`, "后续用于保供、账期和履约评分。"],
      ["缺价格", `${summary.missing_price_count} 行`, "不能直接进入自动菜单候选。"],
      ["缺规格", `${summary.missing_spec_count} 行`, "影响单位换算、成本卡和采购拆分。"],
    ].forEach(([label, value, note]) => {
      const metric = el("article", "import-metric");
      append(metric, [el("span", "", label), el("strong", "", value), el("p", "", note)]);
      metrics.appendChild(metric);
    });

    const gates = el("div", "import-panel");
    const gateList = el("div", "gate-mini-list");
    importSummary.gate_status.forEach((gate) => {
      const node = el("article", "gate-mini");
      append(node, [
        pill(statusText(gate.status), statusClass(gate.status)),
        el("h4", "", gate.gate),
        el("strong", "", gate.value),
        el("p", "", gate.detail),
      ]);
      gateList.appendChild(node);
    });
    append(gates, [el("h3", "", "导入门禁"), gateList]);

    const categories = el("div", "import-panel");
    const categoryList = el("div", "category-bars");
    importSummary.category_quality.slice(0, 8).forEach((category) => {
      const row = el("div", "category-row");
      const bar = el("span", "bar-track");
      const fill = el("i", "bar-fill");
      fill.style.width = `${Math.round(category.price_coverage * 100)}%`;
      bar.appendChild(fill);
      append(row, [
        el("b", "", category.category),
        el("span", "", `${category.row_count} 行 / 报价覆盖 ${percent(category.price_coverage)}`),
        bar,
        el("em", "", `${category.public_price_band} · 缺价 ${category.missing_price_count} 行`),
      ]);
      categoryList.appendChild(row);
    });
    append(categories, [el("h3", "", "品类覆盖与价格完整性"), categoryList]);

    const candidates = el("div", "import-panel full");
    const candidateGrid = el("div", "candidate-grid");
    importSummary.public_candidates.slice(0, 10).forEach((candidate) => {
      const node = el("article", "candidate-card");
      append(node, [
        el("span", "candidate-code", candidate.item_code),
        el("h4", "", candidate.item_name),
        el("p", "", `${candidate.category} / ${candidate.price_band} / ${candidate.spec_status}`),
        el("small", "", candidate.mapping_hint),
      ]);
      if (candidate.gaps.length) {
        node.appendChild(pill(candidate.gaps.join("、"), "warn"));
      } else {
        node.appendChild(pill("字段可进入映射", "ok"));
      }
      candidateGrid.appendChild(node);
    });
    append(candidates, [el("h3", "", "公开脱敏候选物料"), candidateGrid]);

    const privacy = el("div", "privacy-note");
    append(privacy, [
      pill("公开脱敏", "ok"),
      el("p", "", "公开页只展示统计、区间和候选摘要；完整原始行和精确报价保存在本地私有 JSON，不提交公开仓库。"),
      el("small", "", importSummary.column_interpretation.note),
    ]);

    append(wrap, [metrics, gates, categories, candidates, privacy]);
    section("import-summary", "真实供应商报价导入摘要", "蓝鼎 2026 年 6 月报价已读取上海项目 sheet，先做数据门禁和候选物料摘要，再进入产品库 / SOP / 价格资料库映射。", wrap);
  }

  function renderWorkflow() {
    const grid = el("div", "workflow-grid");
    data.workflowSteps.forEach((step, index) => {
      const card = el("article", "workflow-step");
      append(card, [
        el("span", "step-number", String(index + 1).padStart(2, "0")),
        el("h3", "", step.title),
        el("p", "owner-line", `主责：${step.owner}`),
        el("p", "", step.detail),
        el("b", "", `输出：${step.output}`),
        el("p", "gate-line", step.gate),
      ]);
      grid.appendChild(card);
    });
    section("workflow", "供应商数据进入菜单引擎的四步门禁", "从文件导入到候选菜单，不允许跳过标准化和人工确认。", grid);
  }

  function renderSupplierTable() {
    const items = filteredItems();
    const wrap = el("div", "table-wrap");
    const table = el("table", "supplier-table");
    const thead = el("thead");
    const headRow = el("tr");
    ["商品", "类别", "报价", "状态", "保供", "下一动作"].forEach((label) => headRow.appendChild(el("th", "", label)));
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = el("tbody");
    items.forEach((item) => {
      const row = el("tr", item.id === state.selectedItemId ? "selected" : "");
      row.setAttribute("data-item-id", item.id);

      const nameCell = el("td", "name-cell");
      append(nameCell, [
        button("text-button", item.name, { "data-item-id": item.id }),
        el("small", "", `${item.supplier} · ${item.source}`),
      ]);

      const statusCell = el("td", "");
      statusCell.appendChild(pill(item.statusLabel, statusClass(item.status)));

      append(row, [
        nameCell,
        el("td", "", item.category),
        el("td", "", item.price),
        statusCell,
        el("td", "", `${item.supplyRisk} / ${item.delivery}`),
        el("td", "", item.recommendedAction),
      ]);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function renderSupplierCards() {
    const cards = el("div", "supplier-card-list");
    filteredItems().forEach((item) => {
      const card = button(item.id === state.selectedItemId ? "supplier-card selected" : "supplier-card", "", {
        "data-item-id": item.id,
        "aria-label": `查看${item.name}`,
      });
      append(card, [
        el("strong", "", item.name),
        pill(item.statusLabel, statusClass(item.status)),
        el("span", "", `${item.category} / ${item.price}`),
        el("span", "", `保供：${item.supplyRisk} / ${item.delivery}`),
        el("p", "", item.recommendedAction),
      ]);
      cards.appendChild(card);
    });
    return cards;
  }

  function renderItemDetail(item) {
    const detail = el("aside", "detail-panel");
    const title = el("div", "detail-title");
    append(title, [el("h3", "", item.name), pill(item.statusLabel, statusClass(item.status))]);

    const meta = el("div", "detail-grid");
    [
      ["报价", item.price],
      ["规格", item.spec],
      ["税金/账期", `${item.tax} / ${item.accountPeriod}`],
      ["储存", item.storage],
      ["保质期", item.shelfLife],
      ["最佳口味", item.bestTaste],
      ["价格趋势", item.trend],
      ["责任人", item.owner],
    ].forEach(([label, value]) => {
      const row = el("div", "detail-row");
      append(row, [el("b", "", label), el("p", "", value)]);
      meta.appendChild(row);
    });

    const mapping = el("div", "mapping-block");
    append(mapping, [el("h4", "", "四库映射"), list(Object.values(item.matched))]);

    const missing = el("div", "mapping-block");
    append(missing, [
      el("h4", "", "缺口 / 风险"),
      item.missing.length ? list(item.missing) : el("p", "empty-note", "暂无关键缺口，可进入候选菜单。"),
    ]);

    const suggestions = el("div", "mapping-block");
    append(suggestions, [el("h4", "", "可生成菜品"), list(item.suggestions)]);

    append(detail, [
      title,
      meta,
      mapping,
      missing,
      suggestions,
      el("p", "gate-summary", `门禁结论：${item.gate}`),
    ]);
    return detail;
  }

  function renderSupplierBoard() {
    ensureSelectedItemVisible();
    const board = el("div", "supplier-board");
    const control = el("div", "filter-bar");
    [
      ["all", "全部"],
      ["ready", "可入候选"],
      ["trial", "需试推"],
      ["review", "需人工确认"],
      ["blocked", "阻断"],
      ["human", "只看需人工处理"],
    ].forEach(([filter, label]) => {
      control.appendChild(button(state.filter === filter ? "filter active" : "filter", label, { "data-filter": filter }));
    });

    const left = el("div", "supplier-left");
    append(left, [control, renderSupplierTable(), renderSupplierCards()]);
    append(board, [left, renderItemDetail(selectedItem())]);
    section("supplier", "供应商报价与新品导入队列", "采购先看价格和保供，厨师长看 SOP 与生产，系统只把通过门禁的品项送入菜单候选池。", board);
  }

  function renderLibraries() {
    const grid = el("div", "library-grid");
    data.libraryPanels.forEach((panel) => {
      const node = el("article", "library-panel");
      const counts = el("div", "library-counts");
      append(counts, [
        pill(`通过 ${panel.ready}`, "ok"),
        pill(`待确认 ${panel.review}`, "warn"),
        pill(`阻断 ${panel.blocked}`, "blocked"),
      ]);
      append(node, [
        el("h3", "", panel.name),
        counts,
        el("p", "", panel.decision),
        list(panel.examples),
      ]);
      grid.appendChild(node);
    });
    section("libraries", "产品库 / SOP / 价格资料库 / 菜单规则库", "v0.8a 的重点是让新品先变成可治理对象，再让 AI 排菜单。", grid);
  }

  function renderMenuLane(stall) {
    const lane = el("article", stall.open ? "menu-lane" : "menu-lane closed");
    const head = el("div", "lane-head");
    append(head, [el("h3", "", stall.stall), pill(stall.open ? "开放" : "关闭", stall.open ? "ok" : "plain")]);
    lane.appendChild(head);

    stall.items.forEach((item) => {
      const itemNode = button("menu-item", "", {
        "data-menu-name": item.name,
        "data-source-id": item.sourceId || "",
      });
      append(itemNode, [
        el("strong", "", item.name),
        el("span", "", item.tag),
        el("em", "", item.price),
      ]);
      lane.appendChild(itemNode);
    });
    return lane;
  }

  function renderMealGroup(mealKey, label, subtitle) {
    const group = el("div", "meal-group");
    const head = el("div", "meal-head");
    append(head, [el("h3", "", label), el("p", "", subtitle)]);
    const lanes = el("div", "menu-lanes");
    data.menuCandidate[mealKey].forEach((stall) => lanes.appendChild(renderMenuLane(stall)));
    append(group, [head, lanes]);
    return group;
  }

  function selectedMenuContext() {
    if (!state.selectedMenu) {
      return {
        title: selectedItem().name,
        source: selectedItem(),
        text: "当前选中的是供应商商品。可以直接锁定、请求补 SOP、试推或阻断。",
      };
    }
    const source = data.supplierItems.find((item) => item.id === state.selectedMenu.sourceId);
    return {
      title: state.selectedMenu.name,
      source,
      text: source ? `菜单项来源：${source.name}。系统会同步供应商价格、SOP 状态和风险门禁。` : "这是成熟菜单项，没有绑定本轮供应商新品。",
    };
  }

  function renderManualPanel() {
    const context = selectedMenuContext();
    const panel = el("aside", "manual-panel");
    append(panel, [
      el("h3", "", "人工调整台"),
      el("p", "manual-context", context.text),
      el("h4", "", context.title),
    ]);

    if (context.source) {
      append(panel, [
        pill(context.source.statusLabel, statusClass(context.source.status)),
        el("p", "manual-line", `报价：${context.source.price} / 保供：${context.source.supplyRisk}`),
        el("p", "manual-line", `建议：${context.source.recommendedAction}`),
      ]);
    }

    const actions = el("div", "action-grid");
    data.manualActions.forEach((action) => {
      actions.appendChild(button("action-button", action.label, { "data-action-id": action.id }));
    });

    const log = el("div", "activity-log");
    append(log, [el("h4", "", "调整记录")]);
    state.activityLog.slice(-5).reverse().forEach((entry) => log.appendChild(el("p", "", entry)));
    append(panel, [actions, log]);
    return panel;
  }

  function renderMenuEngine() {
    const board = el("div", "menu-board");
    const menu = el("div", "menu-canvas");
    append(menu, [
      renderMealGroup("breakfast", "早餐", "只开一个面档，约 20 个早餐 SKU 由面档管理。"),
      renderMealGroup("lunch", "午餐", "面档、特色档和三个炒菜档齐开；炒菜档错位陈列，采购按总菜池去重。"),
      renderMealGroup("dinner", "晚餐", "只开面档和一个炒菜档；关闭档口不生成采购、备餐和企业微信确认任务。"),
    ]);
    append(board, [menu, renderManualPanel()]);
    section("menu", "智能周菜单编排与人工调整", "AI 先生成草案，人再锁定、替换、试推、补 SOP 或阻断。", board);
  }

  function renderQuality() {
    const wrap = el("div", "quality-layout");
    const gates = el("div", "gate-list");
    data.validationGates.forEach((gate) => {
      const node = el("article", "gate-item");
      append(node, [
        pill(statusText(gate.status), statusClass(gate.status)),
        el("h3", "", gate.name),
        el("p", "", gate.detail),
        el("small", "", `负责人：${gate.owner}`),
      ]);
      gates.appendChild(node);
    });

    const outputs = el("div", "output-list");
    append(outputs, [el("h3", "", "下一步输出物"), list(data.nextOutputs)]);
    append(wrap, [gates, outputs]);
    section("quality", "质量门禁与下一步工程输出", "这一步的验收标准不是页面好看，而是业务数据能被治理、追溯、阻断和复核。", wrap);
  }

  function renderAll() {
    renderHero();
    renderImportSummary();
    renderWorkflow();
    renderSupplierBoard();
    renderLibraries();
    renderMenuEngine();
    renderQuality();
  }

  document.addEventListener("click", (event) => {
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      state.filter = filter.getAttribute("data-filter");
      renderSupplierBoard();
      return;
    }

    const row = event.target.closest("[data-item-id]");
    if (row) {
      state.selectedItemId = row.getAttribute("data-item-id");
      state.selectedMenu = null;
      renderSupplierBoard();
      renderMenuEngine();
      return;
    }

    const menuItem = event.target.closest("[data-menu-name]");
    if (menuItem) {
      state.selectedMenu = {
        name: menuItem.getAttribute("data-menu-name"),
        sourceId: menuItem.getAttribute("data-source-id"),
      };
      if (state.selectedMenu.sourceId) state.selectedItemId = state.selectedMenu.sourceId;
      renderSupplierBoard();
      renderMenuEngine();
      return;
    }

    const action = event.target.closest("[data-action-id]");
    if (action) {
      const found = data.manualActions.find((item) => item.id === action.getAttribute("data-action-id"));
      const target = selectedMenuContext().title;
      state.activityLog.push(`${target}：${found ? found.result : "已记录人工调整。"}`);
      renderMenuEngine();
    }
  });

  renderAll();
}());
