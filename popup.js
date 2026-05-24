const urlBox = document.getElementById("urlBox");
const statusEl = document.getElementById("status");
let currentUrl = "";

function showStatus(message) {
  statusEl.textContent = message;
  setTimeout(() => { statusEl.textContent = ""; }, 1800);
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentUrl = tabs?.[0]?.url || "";
  urlBox.value = safeDecodeUrl(currentUrl);
});

document.getElementById("copyClean").addEventListener("click", async () => {
  await copyToClipboard(safeDecodeUrl(currentUrl));
  showStatus("تم نسخ الرابط الواضح");
});

document.getElementById("copyNoTracking").addEventListener("click", async () => {
  await copyToClipboard(removeTrackingParams(currentUrl));
  showStatus("تم نسخ الرابط بدون تتبّع");
});

document.getElementById("copyEncoded").addEventListener("click", async () => {
  await copyToClipboard(currentUrl);
  showStatus("تم نسخ الرابط المشفّر");
});
