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

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
