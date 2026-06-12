(function render() {
  const data = window.__STAR_CHEF_V07_TEST_DATA__;
  const app = document.getElementById("app");
  const roleList = document.getElementById("roleList");
  let activeRole = data.roles[0].id;

  function tagClass(value) {
    if (value === "技术" || value === "权限") return "ok";
    if (value === "治理") return "block";
    return "warn";
  }

  function roleById(id) {
    return data.roles.find((role) => role.id === id) || data.roles[0];
  }

  function renderRoles() {
    roleList.innerHTML = data.roles.map((role) => `
      <button class="role-card ${role.id === activeRole ? "active" : ""}" data-role="${role.id}" type="button">
        <strong>${role.name}</strong>
        <span>${role.accountability}</span>
      </button>
    `).join("");

    roleList.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        activeRole = button.dataset.role;
        renderRoles();
        renderMain();
      });
    });
  }

  function fileCards() {
    return data.toolkitFiles.map((file) => `
      <article class="mini-card">
        <span class="tag">${file.type}</span>
        <h3>${file.path}</h3>
        <p>${file.purpose}</p>
      </article>
    `).join("");
  }

  function commandCards() {
    return data.commandFlow.map((item) => `
      <article class="mini-card">
        <span class="tag ok">${item.step}</span>
        <h3>${item.result}</h3>
        <code>${item.command}</code>
      </article>
    `).join("");
  }

  function smokeRows() {
    return data.smokeChecks.map((check) => `
      <tr>
        <td><span class="tag ${tagClass(check.level)}">${check.level}</span></td>
        <td><strong>${check.name}</strong></td>
        <td>${check.pass}</td>
        <td>${check.owner}</td>
      </tr>
    `).join("");
  }

  function renderMain() {
    const role = roleById(activeRole);
    app.innerHTML = `
      <section class="panel">
        <div class="panel-body hero-grid">
          <div class="hero-title">
            <h2>${data.project.name} · ${data.project.region}</h2>
            <p>${data.project.objective}</p>
            <div class="chips">
              <span class="chip">项目：${data.project.code}</span>
              <span class="chip">版本：${data.version}</span>
              <span class="chip">schema + seed + smoke</span>
            </div>
          </div>
          <div class="mini-card">
            <span class="tag block">上线门禁</span>
            <h3>${role.name}测试责任</h3>
            <p>${role.accountability}</p>
            <div class="chips">
              ${role.mustSee.map((item) => `<span class="chip">${item}</span>`).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="panel section">
        <div class="panel-head">
          <h2>1. 交付文件</h2>
          <span class="tag">可复制到本地或云服务器</span>
        </div>
        <div class="panel-body grid-3">
          ${fileCards()}
        </div>
      </section>

      <section class="panel section">
        <div class="panel-head">
          <h2>2. 测试命令</h2>
          <span class="tag ok">先静态，再真实建库</span>
        </div>
        <div class="panel-body grid-2">
          ${commandCards()}
        </div>
      </section>

      <section class="panel section">
        <div class="panel-head">
          <h2>3. Smoke Test 覆盖项</h2>
          <span class="tag warn">测技术，也测业务</span>
        </div>
        <div class="panel-body">
          <table>
            <thead>
              <tr><th>层级</th><th>检查项</th><th>通过口径</th><th>Owner</th></tr>
            </thead>
            <tbody>${smokeRows()}</tbody>
          </table>
        </div>
      </section>

      <section class="grid-2">
        <article class="panel">
          <div class="panel-head">
            <h2>4. 通过标准</h2>
            <span class="tag ok">Definition of Done</span>
          </div>
          <div class="panel-body">
            <ul>
              ${data.passCriteria.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </article>
        <article class="panel">
          <div class="panel-head">
            <h2>5. 失败处理</h2>
            <span class="tag block">不要绕过</span>
          </div>
          <div class="panel-body">
            ${data.failurePlaybook.map((item) => `
              <div class="mini-card">
                <h3>${item.symptom}</h3>
                <p>${item.action}</p>
              </div>
            `).join("")}
          </div>
        </article>
      </section>
    `;
  }

  renderRoles();
  renderMain();
})();
