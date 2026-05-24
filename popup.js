const urlBox = document.getElementById("urlBox");
const statusEl = document.getElementById("status");
const languageSelect = document.getElementById("languageSelect");
const themeToggle = document.getElementById("themeToggle");
let currentUrl = "";
let languageChoice = "auto";
let themeChoice = "light";

function showStatus(messageKey) {
  statusEl.textContent = t(messageKey, languageChoice);
  setTimeout(() => { statusEl.textContent = ""; }, 1800);
}

async function initLanguage() {
  languageChoice = await getSavedLanguageChoice();
  languageSelect.value = languageChoice;
  applyLanguage(languageChoice);
  updateThemeButtonLabel();
}

function applyTheme(theme) {
  themeChoice = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = themeChoice;
  updateThemeButtonLabel();
}

function updateThemeButtonLabel() {
  const labelKey = themeChoice === "dark" ? "switchToLightMode" : "switchToDarkMode";
  const label = t(labelKey, languageChoice);
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
}

async function initTheme() {
  const result = await chrome.storage.sync.get({ theme: "light" });
  applyTheme(result.theme);
}

languageSelect.addEventListener("change", async () => {
  languageChoice = languageSelect.value;
  await setSavedLanguageChoice(languageChoice);
  applyLanguage(languageChoice);
  updateThemeButtonLabel();
  chrome.runtime.sendMessage({ type: "LANGUAGE_CHANGED" });
});

themeToggle.addEventListener("click", async () => {
  const nextTheme = themeChoice === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  await chrome.storage.sync.set({ theme: nextTheme });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentUrl = tabs?.[0]?.url || "";
  urlBox.value = safeDecodeUrl(currentUrl);
});

document.getElementById("copyClean").addEventListener("click", async () => {
  await copyToClipboard(safeDecodeUrl(currentUrl));
  showStatus("copiedClean");
});

document.getElementById("copyNoTracking").addEventListener("click", async () => {
  await copyToClipboard(removeTrackingParams(currentUrl));
  showStatus("copiedNoTracking");
});

document.getElementById("copyEncoded").addEventListener("click", async () => {
  await copyToClipboard(currentUrl);
  showStatus("copiedEncoded");
});

initTheme();
initLanguage();
