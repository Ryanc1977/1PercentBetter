/* storage.js — Local Storage Sync for 1% Better */

const STORAGE_KEY = "onepct_better_state_v1";

/**
 * Save current app state to localStorage
 */
function saveAppState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
  } catch (err) {
    console.warn("⚠️ Error saving state:", err);
  }
}

/**
 * Load saved app state from localStorage
 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("⚠️ Error loading saved state:", err);
    return null;
  }
}

/**
 * Clear saved state — for testing later
 */
function resetAllData() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}
