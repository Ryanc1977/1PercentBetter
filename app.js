/* app.js — Main Application Logic for 1% Better */

/* ---------- GLOBAL STATE ---------- */
const AppState = {
  currentPage: "home",      // home | areas | reflect | stats
  actions: [],              // loaded from actions.js
  logs: {},                 // track daily completions
  today: new Date().toISOString().slice(0, 10)
};

/* ---------- INITIAL LOAD ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  // Load saved state
  const saved = loadFromStorage();
  if (saved) Object.assign(AppState, saved);

  // Load action definitions from actions.js
  AppState.actions = loadActions();

  // UI: Attach bottom nav behavior
  setupNavigation();

  // UI: Show selected page
  renderPage(AppState.currentPage);

  // Simulate loading screen fade out
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  }, 500);

  saveAppState();
}

/* ---------- NAVIGATION ---------- */
function setupNavigation() {
  const buttons = document.querySelectorAll("nav button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-nav");
      if (!page) return;
      AppState.currentPage = page;
      renderPage(page);
      updateNavHighlight();
      saveAppState();
    });
  });
}

function updateNavHighlight() {
  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-nav") === AppState.currentPage) {
      btn.classList.add("active");
    }
  });
}

/* ---------- PAGE ROUTER ---------- */
function renderPage(page) {
  const content = document.getElementById("content");
  content.innerHTML = ""; // clear previous

  if (page === "home") {
    renderHomePage(content);
  } else if (page === "areas") {
    renderAreasPage(content);
  } else if (page === "reflect") {
    renderReflectPage(content);
  } else if (page === "stats") {
    renderStatsPage(content);
  }

  content.classList.add("fade-in");
}

/* Calculate daily completion percentage */
function getTodayProgress() {
  const log = AppState.logs[AppState.today] || {};
  const doneCount = Object.values(log).filter(v => v).length;
  const total = AppState.actions.length || 1;
  return Math.round((doneCount / total) * 100);
}

/* Toggle habit completion */
function toggleAction(actionId) {
  if (!AppState.logs[AppState.today]) {
    AppState.logs[AppState.today] = {};
  }

  const done = AppState.logs[AppState.today][actionId];
  AppState.logs[AppState.today][actionId] = !done;

  saveAppState();
  renderPage(AppState.currentPage);
}
