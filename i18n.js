const TRANSLATIONS = {
  en: {
    appName: "Clear URL",
    tagline: "Copy readable links",
    language: "Language",
    currentUrl: "Current URL",
    copyClean: "Copy clean URL",
    copyNoTracking: "Copy without tracking",
    copyEncoded: "Copy encoded URL",
    copiedClean: "Clean URL copied",
    copiedNoTracking: "URL copied without tracking",
    copiedEncoded: "Encoded URL copied",
    contextCopyPage: "Copy page URL clearly",
    contextCopyLink: "Copy this link clearly",
    contextCopyNoTracking: "Copy page URL without tracking"
  },
  ar: {
    appName: "رابط واضح",
    tagline: "انسخ الروابط بشكل مقروء",
    language: "اللغة",
    currentUrl: "الرابط الحالي",
    copyClean: "نسخ الرابط الواضح",
    copyNoTracking: "نسخ بدون تتبع",
    copyEncoded: "نسخ الرابط المشفر",
    copiedClean: "تم نسخ الرابط الواضح",
    copiedNoTracking: "تم نسخ الرابط بدون تتبع",
    copiedEncoded: "تم نسخ الرابط المشفر",
    contextCopyPage: "نسخ رابط الصفحة بشكل واضح",
    contextCopyLink: "نسخ هذا الرابط بشكل واضح",
    contextCopyNoTracking: "نسخ رابط الصفحة بدون تتبع"
  },
  zh: {
    appName: "清晰链接",
    tagline: "复制可读链接",
    language: "语言",
    currentUrl: "当前链接",
    copyClean: "复制清晰链接",
    copyNoTracking: "复制无跟踪链接",
    copyEncoded: "复制编码链接",
    copiedClean: "已复制清晰链接",
    copiedNoTracking: "已复制无跟踪链接",
    copiedEncoded: "已复制编码链接",
    contextCopyPage: "清晰复制页面链接",
    contextCopyLink: "清晰复制此链接",
    contextCopyNoTracking: "复制无跟踪页面链接"
  }
};

function normalizeLang(lang) {
  if (!lang || lang === "auto") {
    const uiLang = chrome.i18n?.getUILanguage?.() || navigator.language || "en";
    return uiLang.toLowerCase().startsWith("ar") ? "ar" : uiLang.toLowerCase().startsWith("zh") ? "zh" : "en";
  }
  return TRANSLATIONS[lang] ? lang : "en";
}

function t(key, lang) {
  const activeLang = normalizeLang(lang);
  return TRANSLATIONS[activeLang]?.[key] || TRANSLATIONS.en[key] || key;
}

async function getSavedLanguageChoice() {
  const result = await chrome.storage.sync.get({ language: "auto" });
  return result.language || "auto";
}

async function setSavedLanguageChoice(language) {
  await chrome.storage.sync.set({ language });
}

function applyLanguage(languageChoice) {
  const lang = normalizeLang(languageChoice);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t("appName", lang);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n, lang);
  });

  const logoText = document.getElementById("logoText");
  if (logoText) logoText.textContent = lang === "ar" ? "ر" : lang === "zh" ? "清" : "C";
}
