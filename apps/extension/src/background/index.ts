import { GithubRelease, ExtensionVersion } from "@repo/types";
import { MessageListener, MessageSender } from "../message";
const messageSender = MessageSender("BACKGROUND");

async function main() {
  chrome.runtime.onMessage.addListener((message, sender) => {
    console.log(message, sender);

    const bilibiliListener = MessageListener(message, "BILIBILI");
    const myBilibiliListener = MessageListener(message, "MY_BILIBILI");
    const popupListener = MessageListener(message, "POPUP");
    bilibiliListener.on("SITE_ASK_COOKIE", (data) => {
      sendCookies(data.token).then(() => {
        sender.tab?.id && chrome.tabs.remove(sender.tab.id);
      });
    });
    myBilibiliListener.on("ASK_VERSION", () => {
      getVersion().then((data) => {
        sender.tab?.id &&
          chrome.tabs
            .sendMessage(sender.tab.id, messageSender("GET_VERSION", data))
            .catch(() => {});
      });
    });
    popupListener.on("ASK_VERSION", () => {
      getVersion().then((data) => {
        chrome.runtime
          .sendMessage(messageSender("GET_VERSION", data))
          .catch(() => {});
      });
    });
    return false;
  });
}

async function getVersion(): Promise<ExtensionVersion> {
  const latest: GithubRelease = await fetch(
    "https://api.github.com/repos/Lychee-rb2/my-bilibili/releases/latest",
  ).then((res) => res.json());
  const current = process.env.VERSION!;
  const browser_download_url = latest?.assets?.find(
    (i) => i.url,
  )?.browser_download_url;
  return {
    latest: latest.name,
    current,
    isLatest: latest.name === current,
    latestDownloadUrl: browser_download_url,
  };
}
async function sendCookies(token: string) {
  const cookies = await chrome.cookies.getAll({ domain: ".bilibili.com" });
  const cookieString = cookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  await sendToALlTabs(
    messageSender("BILIBILI_COOKIE", { cookieString, token }),
  );
}

async function sendToALlTabs(message: unknown) {
  const tabs = await chrome.tabs.query({});
  tabs
    .filter((i) => i.id)
    .forEach((tab) => {
      chrome.tabs.sendMessage(tab.id!, message).catch(() => {});
    });
}

main().catch((e) => {
  console.error(e);
});
