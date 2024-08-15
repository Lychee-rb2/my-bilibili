export const matches = () => ["https://*.bilibili.com/*"];

export async function main() {
  const qs = new URLSearchParams(window.location.search);
  const token = qs.get("token");
  if (token) {
    await chrome.runtime.sendMessage({
      type: "SITE_ASK_COOKIE",
      data: { token },
    });
  }
}
