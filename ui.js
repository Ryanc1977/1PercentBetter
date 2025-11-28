/* ui.js — Page UI Rendering for 1% Better */

/* Utility: wrapper for making cards */
function card(html) {
  const el = document.createElement("div");
  el.className = "card fade-in";
  el.innerHTML = html;
  return el;
}

/* Format date display */
function todayLabel() {
  const d = new Date(AppState.today);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

/* ---------- HOME PAGE ---------- */
function renderHomePage(container) {
  const progress = getTodayProgress();
  const actions = AppState.actions;
  const log = AppState.logs[AppState.today] || {};

  const header = card(`
    <div style="text-align:center;">
      <div style="font-size:14px; opacity:0.7;">${todayLabel()}</div>
      <div style="font-size:26px; font-weight:700;">${progress}%</div>
      <div style="font-size:12px; opacity:0.6;">Daily Progress</div>
    </div>
  `);
  container.appendChild(header);

  actions.forEach(a => {
    const row = document.createElement("div");
    row.className = "card action-row";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "checkbox";
    cb.checked = !!log[a.id];
    cb.addEventListener("change", () => toggleAction(a.id));

    const info = document.createElement("div");
    info.innerHTML = `
      <div class="action-title">${a.title}</div>
      ${a.subtitle ? `<div class="action-sub">${a.subtitle}</div>` : ""}
    `;

    row.appendChild(cb);
    row.appendChild(info);
    container.appendChild(row);
  });
}

/* ---------- AREAS PAGE ---------- */
function renderAreasPage(container) {
  const grouped = {};
  AppState.actions.forEach(a => {
    if (!grouped[a.area]) grouped[a.area] = [];
    grouped[a.area].push(a);
  });

  Object.keys(grouped).forEach(area => {
    const html = `
      <div style="font-weight:700; margin-bottom:6px;">${area}</div>
      <div style="font-size:13px; opacity:0.6;">${grouped[area].length} actions</div>
    `;
    const section = card(html);
    container.appendChild(section);
  });
}

/* ---------- REFLECTION PAGE ---------- */
function renderReflectPage(container) {
  if (!AppState.logs[AppState.today])
    AppState.logs[AppState.today] = { mood: "", reflect: "" };

  const log = AppState.logs[AppState.today];

  // Morning input
  const morningCard = card(`
    <div style="font-size:14px; font-weight:600;">Morning Focus</div>
    <input type="text" id="morningInput" placeholder="What matters most today?" value="${log.morning || ''}">
  `);
  container.appendChild(morningCard);

  // Evening reflection
  const eveCard = card(`
    <div style="font-size:14px; font-weight:600;">Evening Insight</div>
    <textarea id="eveningInput" placeholder="One win or insight...">${log.evening || ''}</textarea>
  `);
  container.appendChild(eveCard);

  // Save button
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save Reflection";
  saveBtn.style.cssText = `
    width:100%; padding:12px; margin-top:10px;
    background:#10b981; color:white;
    border-radius:12px; border:none;
    font-weight:600; cursor:pointer;
  `;
  saveBtn.addEventListener("click", () => {
    const morningEl = document.getElementById("morningInput");
    const eveningEl = document.getElementById("eveningInput");
    log.morning = morningEl.value;
    log.evening = eveningEl.value;
    saveAppState();
    alert("Saved!");
  });

  container.appendChild(saveBtn);
}

/* ---------- STATS PAGE (Basic Heatmap) ---------- */
function renderStatsPage(container) {
  const days = Object.keys(AppState.logs).slice(-14); // last 14 days only

  const wrap = card(`<div style="font-size:14px; font-weight:600; margin-bottom:10px;">Last 14 Days</div>`);
  const grid = document.createElement("div");
  grid.style.display = "flex";
  grid.style.gap = "6px";

  days.forEach(d => {
    const pct = (() => {
      const log = AppState.logs[d];
      if (!log) return 0;
      const doneCount = Object.values(log).filter(v => v).length;
      const total = AppState.actions.length || 1;
      return Math.round((doneCount / total) * 100);
    })();

    const box = document.createElement("div");
    box.style.cssText = `
      width:20px; height:20px; border-radius:4px;
      background:hsl(140,70%,${100 - pct/2}%);
      border:1px solid rgba(0,0,0,0.08);
    `;
    box.title = `${d}: ${pct}%`;
    grid.appendChild(box);
  });

  wrap.appendChild(grid);
  container.appendChild(wrap);
}
