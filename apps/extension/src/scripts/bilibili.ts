import { MessageSender } from "../message";

export const matches = () => ["https://*.bilibili.com/*"];
const messageSender = MessageSender("BILIBILI");

export async function main() {
  const qs = new URLSearchParams(window.location.search);
  const token = qs.get("token");
  if (token) {
    await chrome.runtime.sendMessage(
      messageSender("SITE_ASK_COOKIE", { token }),
    );
  }
}
