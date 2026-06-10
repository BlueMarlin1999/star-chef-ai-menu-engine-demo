(() => {
  const data = window.__STAR_CHEF_V03_DATA__;
  if (!data) return;

  const state = { assumptions: { ...data.assumptions } };
  const money = (value) => Number.isFinite(value) ? `¥${value.toFixed(0)}` : "-";
  const pct = (value) => `${(value * 100).toFixed(1)}%`;
  const num = (value) => Number(value || 0);
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const portionKeyByCategory = {
    "大荤": "bigMeatPortions",
    "小荤": "smallMeatPortions",
    "素菜": "vegPortions",
    "面档": "noodlePortions",
    "特色": "specialtyPortions",
    "甜品": "dessertPortions",
  };

  const rateKeyByCategory = {
    "大荤": "bigMeatCostRate",
    "小荤": "smallMeatCostRate",
    "素菜": "vegCostRate",
    "面档": "noodleCostRate",
    "特色": "specialtyCostRate",
    "甜品": "dessertCostRate",
  };

  function plannedPortions(line) {
    return num(state.assumptions[line.defaultPortionsKey || portionKeyByCategory[line.category]]);
  }

  function targetCostRate(line) {
    return num(state.assumptions[rateKeyByCategory[line.category]]);
  }

  function revenue(line) {
    return num(line.salePrice) * plannedPortions(line);
  }

  function targetCostCeiling(line) {
    const rev = revenue(line);
    return rev > 0 ? rev * targetCostRate(line) : null;
  }

  function riskLevel(line) {
    if (!line.salePrice) return { label: "高", cls: "bad", reason: "缺售价，不能测算收入" };
    if (line.dataStatus.includes("缺成本") || line.dataStatus.includes("仅有截图")) {
      return { label: "高", cls: "bad", reason: "缺真实成本卡，只能做目标成本上限" };
    }
    if (line.windowAppearances > 1) return { label: "中", cls: "warn", reason: "多窗口陈列，采购需按菜池去重" };
    return { label: "低", cls: "ok", reason: "基础口径清楚" };
  }

  function baseRows() {
    return data.lines.map((line) => {
      const portions = plannedPortions(line);
      const rev = revenue(line);
      const ceiling = targetCostCeiling(line);
      const risk = riskLevel(line);
      return {
        ...line,
        portions,
        revenue: rev,
        targetCostCeiling: ceiling,
        targetGrossMargin: ceiling == null ? null : rev - ceiling,
        targetCostRate: targetCostRate(line),
        risk,
      };
    });
  }

  function freeRows() {
    const riceCost = num(state.assumptions.freeRicePortions) * num(state.assumptions.freeRiceCostPerPortion);
    const soupCost = num(state.assumptions.freeSoupPortions) * num(state.assumptions.freeSoupCostPerPortion);
    return [
      {
        id: "F-RICE",
        meal: "午餐",
        stall: "免费自取",
        category: "免费项",
        dishName: "米饭",
        portions: num(state.assumptions.freeRicePortions),
        salePrice: 0,
        revenue: 0,
        targetCostCeiling: riceCost,
        targetGrossMargin: -riceCost,
        dataStatus: "缺摊销规则",
        sourceNote: "用户规则：免费自取但计成本",
        risk: { label: "高", cls: "bad", reason: "免费项会拉低综合成本率" },
      },
      {
        id: "F-SOUP",
        meal: "午餐",
        stall: "免费自取",
        category: "免费项",
        dishName: "汤",
        portions: num(state.assumptions.freeSoupPortions),
        salePrice: 0,
        revenue: 0,
        targetCostCeiling: soupCost,
        targetGrossMargin: -soupCost,
        dataStatus: "缺摊销规则",
        sourceNote: "用户规则：免费自取但计成本",
        risk: { label: "高", cls: "bad", reason: "免费项必须进入综合成本" },
      },
    ];
  }

  function allRows() {
    return [...baseRows(), ...freeRows()];
  }

  function totals() {
    const rows = allRows();
    const sales = rows.reduce((sum, row) => sum + num(row.revenue), 0);
    const targetCost = rows.reduce((sum, row) => sum + num(row.targetCostCeiling), 0);
    const highRisk = rows.filter((row) => row.risk.cls === "bad").length;
    const duplicatedDisplays = data.lines.reduce((sum, row) => sum + Math.max(0, row.windowAppearances - 1), 0);
    return {
      sales,
      targetCost,
      targetMargin: sales - targetCost,
      targetCostRate: sales ? targetCost / sales : 0,
      highRisk,
      duplicatedDisplays,
    };
  }

  function renderKpis() {
    const t = totals();
    const s = data.sourceSummary;
    document.getElementById("v03-kpis").innerHTML = [
      ["周菜单明细", `${s.weeklyMenuRecords}条`, "project+date+meal+stall+dish"],
      ["唯一菜品", `${s.weeklyUniqueDishes}个`, "菜品库建设基数"],
      ["成本卡命中", pct(s.costCoverageRate), `${s.exactCostCardMatches}个精确命中`],
      ["同时有售价+成本", `${s.calcReadyUniqueItems}个`, "真实毛利暂不能自动宣称"],
      ["目标成本上限", money(t.targetCost), `示范收入 ${money(t.sales)}`],
      ["高风险项", `${t.highRisk}项`, "缺成本/免费项/缺口"],
    ].map(([label, value, note]) => `
      <div class="v03-kpi">
        <b>${escapeHtml(value)}</b>
        <span>${escapeHtml(label)}</span>
        <small>${escapeHtml(note)}</small>
      </div>
    `).join("");
  }

  function renderAssumptions() {
    const fields = [
      ["bigMeatPortions", "午餐大荤单品计划份数"],
      ["smallMeatPortions", "午餐小荤单品计划份数"],
      ["vegPortions", "午餐素菜单品计划份数"],
      ["noodlePortions", "面档单品计划份数"],
      ["specialtyPortions", "特色档单品计划份数"],
      ["dessertPortions", "甜品计划份数"],
      ["freeRicePortions", "免费米饭份数"],
      ["freeSoupPortions", "免费汤份数"],
    ];
    const rateFields = [
      ["bigMeatCostRate", "大荤目标成本率"],
      ["smallMeatCostRate", "小荤目标成本率"],
      ["vegCostRate", "素菜目标成本率"],
      ["noodleCostRate", "面档目标成本率"],
      ["specialtyCostRate", "特色档目标成本率"],
      ["dessertCostRate", "甜品目标成本率"],
    ];
    document.getElementById("v03-assumptions").innerHTML = `
      <div class="v03-panel">
        <h3>经营假设控制台</h3>
        <p class="note">这些是 v0.3 演示参数，不是华住最终成本。修改后页面会重新计算三张业务输出表。</p>
        <div class="v03-input-grid">
          ${fields.map(([key, label]) => `
            <label><span>${escapeHtml(label)}</span><input data-v03-input="${key}" type="number" min="0" step="1" value="${state.assumptions[key]}"></label>
          `).join("")}
          ${rateFields.map(([key, label]) => `
            <label><span>${escapeHtml(label)}</span><input data-v03-input="${key}" type="number" min="0" max="1" step="0.01" value="${state.assumptions[key]}"></label>
          `).join("")}
        </div>
      </div>
    `;
    document.querySelectorAll("[data-v03-input]").forEach((input) => {
      input.addEventListener("input", () => {
        state.assumptions[input.dataset.v03Input] = Number(input.value);
        renderOutputs();
      });
    });
  }

  function renderDataGate() {
    const s = data.sourceSummary;
    document.getElementById("v03-data-gate").innerHTML = `
      <div class="v03-panel">
        <h3>数据闸口</h3>
        <div class="v03-warning-list">
          ${data.hardWarnings.map((item) => `<div class="v03-warning">${escapeHtml(item)}</div>`).join("")}
        </div>
        <table class="compact-table">
          <tbody>
            <tr><td>售价覆盖</td><td>${pct(s.priceCoverageRate)} / ${s.exactPriceMatches}个</td></tr>
            <tr><td>成本卡覆盖</td><td>${pct(s.costCoverageRate)} / ${s.exactCostCardMatches}个</td></tr>
            <tr><td>同菜多价冲突</td><td>${s.priceConflictItems}个</td></tr>
            <tr><td>价格表外菜</td><td>${s.priceOnlyItems}个</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  function renderProcurement() {
    const rows = allRows();
    document.getElementById("v03-procurement").innerHTML = `
      <div class="v03-table-actions">
        <button type="button" data-download="procurement">下载采购口径 CSV</button>
      </div>
      <div class="v03-table-wrap">
        <table>
          <thead>
            <tr>
              <th>餐别</th><th>档口</th><th>菜品/项目</th><th>品类</th><th>计划份数</th><th>售价</th><th>目标成本上限</th><th>采购口径</th><th>数据状态</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${escapeHtml(row.meal)}</td>
                <td>${escapeHtml(row.stall)}</td>
                <td><strong>${escapeHtml(row.dishName)}</strong></td>
                <td>${escapeHtml(row.category)}</td>
                <td>${row.portions}</td>
                <td>${row.salePrice ? `${row.salePrice}元` : "0元"}</td>
                <td>${money(row.targetCostCeiling)}</td>
                <td>${row.windowAppearances > 1 ? `出现${row.windowAppearances}个窗口，采购不乘倍数` : "按单品/免费项汇总"}</td>
                <td><span class="status ${row.risk.cls}">${escapeHtml(row.dataStatus)}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderChefTasks() {
    const tasks = [
      { meal: "早餐", owner: "早餐面档负责人", task: "确认包点、粉面、豆浆、鸡蛋 SKU 池；补早餐售价；确认高峰出餐速度。", risk: "早餐成本卡有部分命中，但售价缺失。" },
      { meal: "午餐", owner: "厨师长", task: "确认大荤菜池 A-E；确认 ABC/BCD/CDE 三窗口陈列；确认毛豆香菇炖鸡不按窗口重复备料。", risk: "午餐炒菜多为缺成本卡，需先补克重/SOP。" },
      { meal: "午餐", owner: "特色档负责人", task: "确认红烧牛肉拉面、隆江猪脚饭、香辣小龙虾等特色品的预制能力和出餐时长。", risk: "特色档售价清楚，但成本和出成率缺失。" },
      { meal: "晚餐", owner: "晚餐负责人", task: "只确认面档和炒菜1；特色档、炒菜2、炒菜3不生成备餐任务。", risk: "晚餐截图价格存在，但周菜单表未同步。" },
    ];
    document.getElementById("v03-chef-tasks").innerHTML = `
      <div class="v03-table-wrap">
        <table>
          <thead><tr><th>餐别</th><th>责任人</th><th>备餐任务</th><th>风险提示</th></tr></thead>
          <tbody>
            ${tasks.map((task) => `
              <tr>
                <td>${escapeHtml(task.meal)}</td>
                <td>${escapeHtml(task.owner)}</td>
                <td>${escapeHtml(task.task)}</td>
                <td><span class="status warn">${escapeHtml(task.risk)}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderRisk() {
    const rows = allRows().sort((a, b) => (b.risk.cls === "bad") - (a.risk.cls === "bad") || num(b.revenue) - num(a.revenue));
    document.getElementById("v03-risk").innerHTML = `
      <div class="v03-table-actions">
        <button type="button" data-download="risk">下载毛利风险 CSV</button>
      </div>
      <div class="v03-table-wrap">
        <table>
          <thead><tr><th>风险</th><th>菜品/项目</th><th>收入测算</th><th>目标成本上限</th><th>目标毛利</th><th>依据</th><th>下一步动作</th></tr></thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td><span class="status ${row.risk.cls}">${row.risk.label}</span></td>
                <td><strong>${escapeHtml(row.dishName)}</strong><br><small>${escapeHtml(row.meal)} / ${escapeHtml(row.stall)}</small></td>
                <td>${money(row.revenue)}</td>
                <td>${money(row.targetCostCeiling)}</td>
                <td>${money(row.targetGrossMargin)}</td>
                <td>${escapeHtml(row.risk.reason)}<br><small>${escapeHtml(row.sourceNote)}</small></td>
                <td>${escapeHtml(row.recommendedAction || "补齐数据后复算")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderCostExamples() {
    document.getElementById("v03-cost-examples").innerHTML = `
      <div class="v03-table-wrap">
        <table>
          <thead><tr><th>成本卡命中菜</th><th>餐别/类别</th><th>出现次数</th><th>单份成本</th><th>当前缺口</th></tr></thead>
          <tbody>
            ${data.exactCostExamples.slice(0, 11).map((row) => `
              <tr>
                <td><strong>${escapeHtml(row.dishName)}</strong></td>
                <td>${escapeHtml(row.mealPeriods)} / ${escapeHtml(row.categories)}</td>
                <td>${row.appearances}</td>
                <td>${money(row.portionCost)}</td>
                <td>${escapeHtml(row.recommendedAction)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function toCsv(rows, headers) {
    const esc = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    return [headers.map(([label]) => esc(label)).join(","), ...rows.map((row) => headers.map(([, getter]) => esc(getter(row))).join(","))].join("\n");
  }

  function download(name, content) {
    const blob = new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function bindDownloads() {
    document.querySelectorAll("[data-download]").forEach((button) => {
      button.addEventListener("click", () => {
        const rows = allRows();
        if (button.dataset.download === "procurement") {
          download("star-chef-v03-procurement.csv", toCsv(rows, [
            ["餐别", (row) => row.meal],
            ["档口", (row) => row.stall],
            ["菜品", (row) => row.dishName],
            ["品类", (row) => row.category],
            ["计划份数", (row) => row.portions],
            ["售价", (row) => row.salePrice],
            ["目标成本上限", (row) => row.targetCostCeiling],
            ["数据状态", (row) => row.dataStatus],
            ["来源", (row) => row.sourceNote],
          ]));
        } else {
          download("star-chef-v03-margin-risk.csv", toCsv(rows, [
            ["风险", (row) => row.risk.label],
            ["菜品", (row) => row.dishName],
            ["收入测算", (row) => row.revenue],
            ["目标成本上限", (row) => row.targetCostCeiling],
            ["目标毛利", (row) => row.targetGrossMargin],
            ["风险原因", (row) => row.risk.reason],
            ["下一步动作", (row) => row.recommendedAction],
          ]));
        }
      });
    });
  }

  function renderOutputs() {
    renderKpis();
    renderProcurement();
    renderChefTasks();
    renderRisk();
    renderCostExamples();
    bindDownloads();
  }

  function init() {
    renderAssumptions();
    renderDataGate();
    renderOutputs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
