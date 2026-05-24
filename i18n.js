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
  },
  de: {
    appName: "Klare URL",
    tagline: "Lesbare Links kopieren",
    language: "Sprache",
    currentUrl: "Aktuelle URL",
    copyClean: "Klare URL kopieren",
    copyNoTracking: "Ohne Tracking kopieren",
    copyEncoded: "Codierte URL kopieren",
    copiedClean: "Klare URL kopiert",
    copiedNoTracking: "URL ohne Tracking kopiert",
    copiedEncoded: "Codierte URL kopiert",
    contextCopyPage: "Seiten-URL klar kopieren",
    contextCopyLink: "Diesen Link klar kopieren",
    contextCopyNoTracking: "Seiten-URL ohne Tracking kopieren"
  },
  fr: {
    appName: "URL claire",
    tagline: "Copier des liens lisibles",
    language: "Langue",
    currentUrl: "URL actuelle",
    copyClean: "Copier l'URL claire",
    copyNoTracking: "Copier sans suivi",
    copyEncoded: "Copier l'URL encodée",
    copiedClean: "URL claire copiée",
    copiedNoTracking: "URL copiée sans suivi",
    copiedEncoded: "URL encodée copiée",
    contextCopyPage: "Copier clairement l'URL de la page",
    contextCopyLink: "Copier clairement ce lien",
    contextCopyNoTracking: "Copier l'URL de la page sans suivi"
  },
  ja: {
    appName: "クリアURL",
    tagline: "読みやすいリンクをコピー",
    language: "言語",
    currentUrl: "現在のURL",
    copyClean: "クリアなURLをコピー",
    copyNoTracking: "追跡なしでコピー",
    copyEncoded: "エンコード済みURLをコピー",
    copiedClean: "クリアなURLをコピーしました",
    copiedNoTracking: "追跡なしのURLをコピーしました",
    copiedEncoded: "エンコード済みURLをコピーしました",
    contextCopyPage: "ページURLを読みやすくコピー",
    contextCopyLink: "このリンクを読みやすくコピー",
    contextCopyNoTracking: "ページURLを追跡なしでコピー"
  },
  ru: {
    appName: "Clear URL",
    tagline: "Копируйте читаемые ссылки",
    language: "Язык",
    currentUrl: "Текущий URL",
    copyClean: "Копировать читаемый URL",
    copyNoTracking: "Копировать без отслеживания",
    copyEncoded: "Копировать закодированный URL",
    copiedClean: "Читаемый URL скопирован",
    copiedNoTracking: "URL без отслеживания скопирован",
    copiedEncoded: "Закодированный URL скопирован",
    contextCopyPage: "Копировать URL страницы в читаемом виде",
    contextCopyLink: "Копировать эту ссылку в читаемом виде",
    contextCopyNoTracking: "Копировать URL страницы без отслеживания"
  },
  pt: {
    appName: "URL clara",
    tagline: "Copie links legíveis",
    language: "Idioma",
    currentUrl: "URL atual",
    copyClean: "Copiar URL clara",
    copyNoTracking: "Copiar sem rastreamento",
    copyEncoded: "Copiar URL codificada",
    copiedClean: "URL clara copiada",
    copiedNoTracking: "URL copiada sem rastreamento",
    copiedEncoded: "URL codificada copiada",
    contextCopyPage: "Copiar URL da página claramente",
    contextCopyLink: "Copiar este link claramente",
    contextCopyNoTracking: "Copiar URL da página sem rastreamento"
  },
  es: {
    appName: "URL clara",
    tagline: "Copia enlaces legibles",
    language: "Idioma",
    currentUrl: "URL actual",
    copyClean: "Copiar URL clara",
    copyNoTracking: "Copiar sin seguimiento",
    copyEncoded: "Copiar URL codificada",
    copiedClean: "URL clara copiada",
    copiedNoTracking: "URL copiada sin seguimiento",
    copiedEncoded: "URL codificada copiada",
    contextCopyPage: "Copiar claramente la URL de la página",
    contextCopyLink: "Copiar claramente este enlace",
    contextCopyNoTracking: "Copiar URL de la página sin seguimiento"
  }
};

function normalizeLang(lang) {
  if (!lang || lang === "auto") {
    const uiLang = chrome.i18n?.getUILanguage?.() || navigator.language || "en";
    const baseLang = uiLang.toLowerCase().split("-")[0];
    return TRANSLATIONS[baseLang] ? baseLang : "en";
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
  const logoLetters = {
    en: "C",
    ar: "ر",
    zh: "清",
    de: "K",
    fr: "U",
    ja: "ク",
    ru: "C",
    pt: "U",
    es: "U"
  };

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t("appName", lang);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n, lang);
  });

  const logoText = document.getElementById("logoText");
  if (logoText) logoText.textContent = logoLetters[lang] || "C";
}
