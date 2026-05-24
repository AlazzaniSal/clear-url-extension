const urlBox = document.getElementById("urlBox");
const statusEl = document.getElementById("status");
const languageSelect = document.getElementById("languageSelect");
let currentUrl = "";
let languageChoice = "auto";

function showStatus(messageKey) {
  statusEl.textContent = t(messageKey, languageChoice);
  setTimeout(() => { statusEl.textContent = ""; }, 1800);
}

async function initLanguage() {
  languageChoice = await getSavedLanguageChoice();
  languageSelect.value = languageChoice;
  applyLanguage(languageChoice);
}

languageSelect.addEventListener("change", async () => {
  languageChoice = languageSelect.value;
  await setSavedLanguageChoice(languageChoice);
  applyLanguage(languageChoice);
  chrome.runtime.sendMessage({ type: "LANGUAGE_CHANGED" });
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

initLanguage();
