const TRANSLATIONS = {
  en: {
    contextCopyPage: "Copy page URL clearly",
    contextCopyLink: "Copy this link clearly",
    contextCopyNoTracking: "Copy page URL without tracking"
  },
  ar: {
    contextCopyPage: "نسخ رابط الصفحة بشكل واضح",
    contextCopyLink: "نسخ هذا الرابط بشكل واضح",
    contextCopyNoTracking: "نسخ رابط الصفحة بدون تتبّع"
  },
  zh: {
    contextCopyPage: "清晰复制页面链接",
    contextCopyLink: "清晰复制此链接",
    contextCopyNoTracking: "复制无跟踪页面链接"
  }
};

function normalizeLang(lang) {
  if (!lang || lang === "auto") {
    const uiLang = chrome.i18n?.getUILanguage?.() || "en";
    return uiLang.toLowerCase().startsWith("ar") ? "ar" : uiLang.toLowerCase().startsWith("zh") ? "zh" : "en";
  }
  return TRANSLATIONS[lang] ? lang : "en";
}

function t(key, lang) {
  const activeLang = normalizeLang(lang);
  return TRANSLATIONS[activeLang]?.[key] || TRANSLATIONS.en[key] || key;
}

function safeDecodeUrl(url) {
  try {
    return decodeURI(url);
  } catch (error) {
    return url;
  }
}

function removeTrackingParams(url) {
  try {
    const parsed = new URL(url);
    const trackingParams = [
      "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
      "fbclid", "gclid", "gbraid", "wbraid", "mc_cid", "mc_eid",
      "igshid", "ref", "ref_src"
    ];
    trackingParams.forEach((param) => parsed.searchParams.delete(param));
    return safeDecodeUrl(parsed.toString());
  } catch (error) {
    return safeDecodeUrl(url);
  }
}

async function getLanguageChoice() {
  const result = await chrome.storage.sync.get({ language: "auto" });
  return result.language || "auto";
}

async function rebuildContextMenus() {
  const lang = await getLanguageChoice();
  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    id: "copy-clean-page-url",
    title: t("contextCopyPage", lang),
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "copy-clean-link-url",
    title: t("contextCopyLink", lang),
    contexts: ["link"]
  });

  chrome.contextMenus.create({
    id: "copy-no-tracking-page-url",
    title: t("contextCopyNoTracking", lang),
    contexts: ["page"]
  });
}

chrome.runtime.onInstalled.addListener(rebuildContextMenus);
chrome.runtime.onStartup.addListener(rebuildContextMenus);

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "LANGUAGE_CHANGED") rebuildContextMenus();
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  let text = "";

  if (info.menuItemId === "copy-clean-link-url") {
    text = safeDecodeUrl(info.linkUrl || "");
  }

  if (info.menuItemId === "copy-clean-page-url") {
    text = safeDecodeUrl(tab?.url || "");
  }

  if (info.menuItemId === "copy-no-tracking-page-url") {
    text = removeTrackingParams(tab?.url || "");
  }

  if (!text || !tab?.id) return;

  chrome.scripting?.executeScript?.({
    target: { tabId: tab.id },
    func: (value) => navigator.clipboard.writeText(value),
    args: [text]
  });
});
