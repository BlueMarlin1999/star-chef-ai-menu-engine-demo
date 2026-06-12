(function () {
  const source = window.__STAR_CHEF_V06_DATA__;
  const storageKey = "star-chef-v06-state";
  const roleNames = Object.fromEntries(source.roles.map((role) => [role.id, role.name]));
  const state = loadState();

  function loadState() {
    try {
      return { roleId: "operations", ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
    } catch {
      return { roleId: "operations" };
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function role() {
    return source.roles.find((item) => item.id === state.roleId) || source.roles[0];
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function statusText(value) {
    return {
      ready: "已具备",
      partial: "部分具备",
      blocked: "阻断",
      warning: "预警",
      pass: "通过",
    }[value] || value;
  }

  function renderRoles() {
    document.getElementById("role-switcher").innerHTML = source.roles.map((item) => `
      <button class="${item.id === state.roleId ? "active" : ""}" data-role="${item.id}">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.focus)}</span>
      </button>
    `).join("");
  }

  function renderHero() {
    const activeRole = role();
    document.getElementById("project-panel").innerHTML = `
      <h2>${escapeHtml(source.project.name)} · ${escapeHtml(source.project.region)}</h2>
      <p>${escapeHtml(source.project.principle)}</p>
      <div class="meta-row">
        <span class="pill">目标数据库：${escapeHtml(source.project.targetDatabase)}</span>
        <span class="pill">上线方式：${escapeHtml(source.project.launchMode)}</span>
        <span class="pill">版本：${escapeHtml(source.version)}</span>
      </div>
    `;
    document.getElementById("role-panel").innerHTML = `
      <h2>${escapeHtml(activeRole.name)}数据库责任</h2>
      <p>${escapeHtml(activeRole.focus)}</p>
      <div class="owned">${activeRole.dataOwner.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
    `;
  }

  function renderReadiness() {
    document.getElementById("readiness-panel").innerHTML = source.readiness.map((item) => `
      <article class="score-card">
        <b>${item.value}%</b>
        <span>${escapeHtml(item.label)}</span>
        <span class="status ${item.status}">${statusText(item.status)}</span>
      </article>
    `).join("");
  }

  function renderLayers() {
    document.getElementById("layer-panel").innerHTML = source.layers.map((item) => `
      <article class="layer-card">
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.purpose)}</p>
        <small>${escapeHtml(item.risk)}</small>
      </article>
    `).join("");
  }

  function renderTables() {
    document.getElementById("table-panel").innerHTML = `
      <table>
        <thead><tr><th>表名</th><th>层级</th><th>Owner</th><th>作用</th><th>状态</th><th>依赖</th></tr></thead>
        <tbody>
          ${source.tables.map((item) => `
            <tr>
              <td><strong>${escapeHtml(item.name)}</strong></td>
              <td>${escapeHtml(item.layer)}</td>
              <td>${escapeHtml(item.owner)}</td>
              <td>${escapeHtml(item.purpose)}</td>
              <td><span class="status ${item.readiness}">${statusText(item.readiness)}</span></td>
              <td>${escapeHtml(item.dependency)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  function renderFlow() {
    document.getElementById("flow-panel").innerHTML = source.importFlow.map((item) => `
      <article class="flow-step">
        <b>${item.step}</b>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.detail)}</p>
        <small>${escapeHtml(item.owner)}</small>
      </article>
    `).join("");
  }

  function renderGates() {
    document.getElementById("gate-panel").innerHTML = source.gates.map((item) => `
      <article class="gate-card">
        <span class="status ${item.status}">${escapeHtml(item.level)} · ${statusText(item.status)}</span>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.evidence)}</p>
        <small>Owner：${escapeHtml(item.owner)}</small>
      </article>
    `).join("");
  }

  function renderDecisions() {
    document.getElementById("decision-panel").innerHTML = source.decisions.map((item) => `
      <article class="decision-card">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.answer)}</p>
      </article>
    `).join("");
  }

  function renderCosts() {
    document.getElementById("cost-panel").innerHTML = source.costBands.map((item) => `
      <article class="cost-card">
        <h3>${escapeHtml(item.stage)}</h3>
        <p><strong>${escapeHtml(item.monthly)}</strong></p>
        <p>${escapeHtml(item.scope)}</p>
      </article>
    `).join("");
  }

  function bindEvents() {
    document.querySelectorAll("[data-role]").forEach((button) => {
      button.addEventListener("click", () => {
        state.roleId = button.dataset.role;
        saveState();
        render();
      });
    });
    document.getElementById("reset-demo").onclick = () => {
      localStorage.removeItem(storageKey);
      location.reload();
    };
  }

  function render() {
    renderRoles();
    renderHero();
    renderReadiness();
    renderLayers();
    renderTables();
    renderFlow();
    renderGates();
    renderDecisions();
    renderCosts();
    bindEvents();
  }

  render();
})();
