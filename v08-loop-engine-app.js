(function renderStarChefV08() {
  const data = window.__STAR_CHEF_V08_LOOP_DATA__;
  if (!data) return;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function appendChildren(parent, children) {
    children.forEach((child) => parent.appendChild(child));
    return parent;
  }

  function list(items) {
    const ul = el("ul", "plain-list");
    items.forEach((item) => ul.appendChild(el("li", "", item)));
    return ul;
  }

  function statusLabel(status) {
    const labels = {
      next: "下一步",
      control: "控制层",
      gated: "门禁后",
    };
    return labels[status] || status;
  }

  function statusClass(status) {
    return `tag ${status === "next" ? "warn" : status === "gated" ? "block" : "ok"}`;
  }

  function renderHero() {
    const target = document.getElementById("hero");
    if (!target) return;

    const project = data.project;
    const panel = el("div", "hero-panel");
    const text = el("div", "hero-copy");
    appendChildren(text, [
      el("p", "eyebrow", `${project.name} / ${project.region}`),
      el("h1", "", `Star Chef ${data.version} · ${data.title}`),
      el("p", "hero-subtitle", data.subtitle),
      el("p", "decision", project.operatingDecision),
    ]);

    const metrics = el("div", "metric-grid");
    [
      ["当前门禁", project.currentGate],
      ["下一门禁", project.nextGate],
      ["系统形态", "Loop Engine"],
      ["上线边界", "候选与缺口报告"],
    ].forEach(([label, value]) => {
      const card = el("div", "metric-card");
      appendChildren(card, [el("span", "", label), el("strong", "", value)]);
      metrics.appendChild(card);
    });

    appendChildren(panel, [text, metrics]);
    target.appendChild(panel);
  }

  function renderPrinciples() {
    const target = document.getElementById("principles");
    if (!target) return;

    const grid = el("div", "principle-grid");
    data.loopPrinciples.forEach((principle) => {
      const card = el("article", "principle-card");
      appendChildren(card, [
        el("span", "principle-key", principle.key),
        el("h3", "", principle.label),
        el("p", "", principle.description),
      ]);
      grid.appendChild(card);
    });
    target.appendChild(section("六段式循环", "每个循环都必须有目标、上下文、动作、反馈、状态和退出条件。", grid));
  }

  function renderLoops() {
    const target = document.getElementById("loops");
    if (!target) return;

    const grid = el("div", "loop-grid");
    data.loops.forEach((loop, index) => {
      const card = el("article", "loop-card");
      const head = el("div", "loop-head");
      appendChildren(head, [
        el("span", "loop-number", String(index + 1).padStart(2, "0")),
        el("span", statusClass(loop.status), statusLabel(loop.status)),
      ]);

      const details = el("div", "loop-details");
      [
        ["目标", loop.goal],
        ["当前状态", loop.currentStatus],
        ["下一动作", loop.nextAction],
      ].forEach(([label, value]) => {
        const row = el("div", "detail-row");
        appendChildren(row, [el("b", "", label), el("p", "", value)]);
        details.appendChild(row);
      });

      const columns = el("div", "loop-columns");
      [
        ["输入", loop.inputs],
        ["动作", loop.actions],
        ["状态表", loop.stateTables],
        ["退出", loop.exitStates],
      ].forEach(([title, items]) => {
        const block = el("div", "loop-column");
        appendChildren(block, [el("h4", "", title), list(items)]);
        columns.appendChild(block);
      });

      appendChildren(card, [
        head,
        el("h3", "", loop.name),
        el("p", "owner", `负责人：${loop.owner}`),
        details,
        columns,
      ]);
      grid.appendChild(card);
    });

    target.appendChild(section("五个运营循环", "v0.8 先把真实数据带入循环，再进入自动菜单候选。", grid));
  }

  function renderRoles() {
    const target = document.getElementById("roles");
    if (!target) return;

    const board = el("div", "role-board");
    data.roles.forEach((role) => {
      const card = el("article", "role-card");
      const owns = role.owns
        .map((id) => data.loops.find((loop) => loop.id === id)?.name)
        .filter(Boolean);
      appendChildren(card, [
        el("h3", "", role.role),
        el("p", "", role.responsibility),
        el("h4", "", "负责循环"),
        list(owns),
      ]);
      board.appendChild(card);
    });

    target.appendChild(section("角色责任", "同一个循环可以多人协同，但必须有清晰的主责角色。", board));
  }

  function renderGates() {
    const target = document.getElementById("gates");
    if (!target) return;

    const table = el("table", "gate-table");
    const thead = el("thead");
    const headRow = el("tr");
    ["门禁", "通过标准", "负责人"].forEach((label) => headRow.appendChild(el("th", "", label)));
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = el("tbody");
    data.acceptanceGates.forEach((gate) => {
      const row = el("tr");
      appendChildren(row, [
        el("td", "", gate.label),
        el("td", "", gate.pass),
        el("td", "", gate.owner),
      ]);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    const milestones = el("div", "milestone-row");
    data.nextMilestones.forEach((milestone) => {
      const card = el("article", "milestone-card");
      appendChildren(card, [
        el("span", "milestone-id", milestone.id),
        el("h3", "", milestone.name),
        el("p", "", milestone.evidence),
      ]);
      milestones.appendChild(card);
    });

    const wrap = el("div", "gate-stack");
    appendChildren(wrap, [table, milestones]);
    target.appendChild(section("验收门禁", "v0.8 只证明循环和证据链，不宣称正式生产上线。", wrap));
  }

  function section(title, subtitle, content) {
    const wrapper = el("section", "panel");
    const head = el("div", "panel-head");
    appendChildren(head, [el("h2", "", title), el("p", "", subtitle)]);
    const body = el("div", "panel-body");
    body.appendChild(content);
    appendChildren(wrapper, [head, body]);
    return wrapper;
  }

  renderHero();
  renderPrinciples();
  renderLoops();
  renderRoles();
  renderGates();
}());
