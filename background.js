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

async function copyText(text) {
  await chrome.offscreen?.createDocument?.({
    url: "offscreen.html",
    reasons: ["CLIPBOARD"],
    justification: "Copy clean URL to clipboard"
  }).catch(() => {});
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-clean-page-url",
    title: "نسخ رابط الصفحة بشكل واضح",
    contexts: ["page"]
  });

  chrome.contextMenus.create({
    id: "copy-clean-link-url",
    title: "نسخ هذا الرابط بشكل واضح",
    contexts: ["link"]
  });

  chrome.contextMenus.create({
    id: "copy-no-tracking-page-url",
    title: "نسخ رابط الصفحة بدون تتبّع",
    contexts: ["page"]
  });
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

  if (!text) return;

  chrome.scripting?.executeScript?.({
    target: { tabId: tab.id },
    func: (value) => navigator.clipboard.writeText(value),
    args: [text]
  });
});
