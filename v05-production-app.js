(function () {
  const source = window.__STAR_CHEF_V05_DATA__;
  const storageKey = "star-chef-v05-state";
  const roleNames = Object.fromEntries(source.roles.map((role) => [role.id, role.name]));

  const state = loadState();

  function loadState() {
    const base = {
      roleId: "operations",
      mappings: Object.fromEntries(source.mappingCandidates.map((item) => [item.id, item.status])),
      approvals: Object.fromEntries(source.approvals.map((item) => [item.id, item.status])),
      checks: Object.fromEntries(source.launchChecks.map((item) => [item.id, item.done])),
      audit: [
        "系统初始化：v0.5 生产骨架载入华住项目样本。",
        "数据门禁：真实毛利计算仍被 P0 缺口阻断。",
      ],
    };
    try {
      return { ...base, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
    } catch {
      return base;
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function role() {
    return source.roles.find((item) => item.id === state.roleId) || source.roles[0];
  }

  function approvedMappings() {
    return source.mappingCandidates.filter((item) => state.mappings[item.id] === "approved");
  }

  function readyApprovals() {
    return source.approvals.filter((item) => state.approvals[item.id] === "approved");
  }

  function doneChecks() {
    return source.launchChecks.filter((item) => state.checks[item.id]);
  }

  function gateStatus(gate) {
    if (gate.id === "gate-001") {
      return approvedMappings().length >= source.mappingCandidates.length ? "pass" : "blocked";
    }
    if (gate.id === "gate-002") {
      const missing = source.mappingCandidates.filter((item) => state.mappings[item.id] === "approved" && !item.costCard);
      return missing.length === 0 ? "pass" : "blocked";
    }
    if (gate.id === "gate-003") {
      const missing = source.mappingCandidates.filter((item) => state.mappings[item.id] === "approved" && !item.supplierMapped);
      return missing.length === 0 ? "pass" : "blocked";
    }
    if (gate.id === "gate-004") return "warning";
    if (gate.id === "gate-005") return state.checks["check-006"] ? "pass" : "warning";
    return "warning";
  }

  function readinessScore() {
    const importScore = Math.round(source.importStreams.filter((item) => item.status === "imported").length / source.importStreams.length * 25);
    const mappingScore = Math.round(approvedMappings().length / source.mappingCandidates.length * 30);
    const gateScore = Math.round(source.gates.filter((item) => gateStatus(item) === "pass").length / source.gates.length * 25);
    const approvalScore = Math.round(readyApprovals().length / source.approvals.length * 20);
    return importScore + mappingScore + gateScore + approvalScore;
  }

  function statusText(value) {
    return {
      imported: "已导入",
      partial: "部分命中",
      mapping_required: "需映射",
      missing: "缺失",
      pending: "待确认",
      approved: "已确认",
      rejected: "已驳回",
      ready: "待确认",
      blocked: "阻断",
      pass: "通过",
      warning: "预警",
    }[value] || value;
  }

  function statusClass(value) {
    if (["imported", "approved", "pass"].includes(value)) return "ok";
    if (["partial", "mapping_required", "pending", "ready", "warning"].includes(value)) return "warn";
    return "bad";
  }

  function money(value) {
    return value == null ? "-" : `${Number(value).toFixed(0)}元`;
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

  function render() {
    const activeRole = role();
    const score = readinessScore();
    document.getElementById("role-switcher").innerHTML = source.roles.map((item) => `
      <button class="${item.id === state.roleId ? "active" : ""}" data-role="${item.id}">
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.owner)}</span>
      </button>
    `).join("");

    document.getElementById("score-card").innerHTML = `
      <div class="score-ring" style="--score:${score};"><b>${score}</b><span>上线准备度</span></div>
      <div>
        <h2>${escapeHtml(source.project.projectName)} · ${escapeHtml(source.project.region)}</h2>
        <p>${escapeHtml(source.project.goLiveRule)}</p>
        <div class="meta-row">
          <span>上线形态：${escapeHtml(source.project.targetDomain)}</span>
          <span>试运行：${escapeHtml(source.project.launchMode)}</span>
          <span>目标成本率：${Math.round(source.project.targetCostRate * 100)}%</span>
        </div>
      </div>
    `;

    document.getElementById("role-panel").innerHTML = `
      <h3>${escapeHtml(activeRole.name)}工作台</h3>
      <p>${escapeHtml(activeRole.mission)}</p>
      <div class="role-lists">
        <div><b>可编辑</b>${activeRole.canEdit.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <div><b>必须确认</b>${activeRole.mustApprove.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <div><b>禁止越权</b>${activeRole.blockedFrom.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </div>
    `;

    document.getElementById("import-streams").innerHTML = source.importStreams.map((item) => `
      <article class="line-card">
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          <p>${escapeHtml(item.source)}</p>
        </div>
        <strong>${item.records}</strong>
        <span class="status ${statusClass(item.status)}">${statusText(item.status)}</span>
        <small>${escapeHtml(item.owner)} · ${escapeHtml(item.impact)}</small>
      </article>
    `).join("");

    document.getElementById("mapping-table").innerHTML = `
      <table>
        <thead><tr><th>源菜名</th><th>标准菜名</th><th>类别</th><th>售价</th><th>置信度</th><th>责任角色</th><th>数据状态</th><th>操作</th></tr></thead>
        <tbody>
          ${source.mappingCandidates.map((item) => {
            const current = state.mappings[item.id];
            const canOperate = item.ownerRole === state.roleId || state.roleId === "operations";
            return `
              <tr>
                <td><strong>${escapeHtml(item.sourceName)}</strong><br><small>${escapeHtml(item.note)}</small></td>
                <td>${escapeHtml(item.standardName)}</td>
                <td>${escapeHtml(item.category)}</td>
                <td>${money(item.salePrice)}</td>
                <td>${Math.round(item.confidence * 100)}%</td>
                <td>${escapeHtml(roleNames[item.ownerRole])}</td>
                <td>
                  <span class="status ${statusClass(current)}">${statusText(current)}</span>
                  <small>${item.costCard ? "有成本卡" : "缺成本卡"} · ${item.supplierMapped ? "报价已映射" : "缺报价映射"}</small>
                </td>
                <td class="actions-cell">
                  <button data-map="${item.id}" data-status="approved" ${canOperate ? "" : "disabled"}>确认</button>
                  <button data-map="${item.id}" data-status="rejected" ${canOperate ? "" : "disabled"}>驳回</button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;

    document.getElementById("gate-panel").innerHTML = source.gates.map((item) => {
      const current = gateStatus(item);
      return `
        <article class="gate ${statusClass(current)}">
          <div>
            <span>${escapeHtml(item.level)}</span>
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.rule)}</p>
            <small>${escapeHtml(item.blocking)}</small>
          </div>
          <strong>${statusText(current)}</strong>
        </article>
      `;
    }).join("");

    document.getElementById("approval-flow").innerHTML = source.approvals.map((item, index) => {
      const current = state.approvals[item.id];
      const canApprove = item.roleId === state.roleId || state.roleId === "operations";
      return `
        <article class="approval">
          <b>${index + 1}</b>
          <div>
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.action)}</p>
            <span class="status ${statusClass(current)}">${statusText(current)}</span>
          </div>
          <button data-approval="${item.id}" ${canApprove ? "" : "disabled"}>确认</button>
        </article>
      `;
    }).join("");

    document.getElementById("launch-checks").innerHTML = source.launchChecks.map((item) => `
      <label class="check-row">
        <input type="checkbox" data-check="${item.id}" ${state.checks[item.id] ? "checked" : ""} ${item.ownerRole === state.roleId || state.roleId === "operations" ? "" : "disabled"}>
        <span>${escapeHtml(item.label)}</span>
        <small>${escapeHtml(roleNames[item.ownerRole])}</small>
      </label>
    `).join("");

    document.getElementById("audit-log").innerHTML = state.audit.slice(-8).reverse().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    bindEvents();
  }

  function bindEvents() {
    document.querySelectorAll("[data-role]").forEach((button) => {
      button.addEventListener("click", () => {
        state.roleId = button.dataset.role;
        state.audit.push(`切换角色：${roleNames[state.roleId]}。`);
        saveState();
        render();
      });
    });

    document.querySelectorAll("[data-map]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = source.mappingCandidates.find((candidate) => candidate.id === button.dataset.map);
        state.mappings[button.dataset.map] = button.dataset.status;
        state.audit.push(`${role().name}${statusText(button.dataset.status)}菜名映射：${item.sourceName} -> ${item.standardName}。`);
        saveState();
        render();
      });
    });

    document.querySelectorAll("[data-approval]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = source.approvals.find((approval) => approval.id === button.dataset.approval);
        state.approvals[button.dataset.approval] = "approved";
        state.audit.push(`${role().name}完成审批：${item.title}。`);
        saveState();
        render();
      });
    });

    document.querySelectorAll("[data-check]").forEach((input) => {
      input.addEventListener("change", () => {
        const item = source.launchChecks.find((check) => check.id === input.dataset.check);
        state.checks[input.dataset.check] = input.checked;
        state.audit.push(`${role().name}${input.checked ? "完成" : "取消"}上线检查：${item.label}。`);
        saveState();
        render();
      });
    });

    document.getElementById("reset-demo").onclick = () => {
      localStorage.removeItem(storageKey);
      location.reload();
    };

    document.getElementById("export-checklist").onclick = () => {
      const text = [
        "Star Chef v0.5 上线检查清单",
        `项目：${source.project.projectName} / ${source.project.region}`,
        `上线准备度：${readinessScore()}`,
        "",
        ...source.launchChecks.map((item) => `${state.checks[item.id] ? "[x]" : "[ ]"} ${item.label} - ${roleNames[item.ownerRole]}`),
        "",
        "P0 数据门禁：",
        ...source.gates.map((item) => `${item.level} ${item.name}: ${statusText(gateStatus(item))}`),
      ].join("\n");
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "star-chef-v05-launch-checklist.txt";
      link.click();
      URL.revokeObjectURL(url);
    };
  }

  render();
})();
