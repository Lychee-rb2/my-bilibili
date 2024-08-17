import { MessageListener, MessageSender } from "../message";
import { MessageData } from "../const";
import { t } from "@repo/i18n";

export const matches = () =>
  [process.env.SITE_DOMAIN, process.env.LOCALE_TEST]
    .filter(Boolean)
    .map((i) => `${i}/*`);

const messageSender = MessageSender("MY_BILIBILI");

export async function main() {
  await chrome.runtime.sendMessage(messageSender("ASK_VERSION", {}));

  chrome.runtime.onMessage.addListener((message) => {
    const backgroundListener = MessageListener(message, "BACKGROUND");

    backgroundListener.on("BILIBILI_COOKIE", login);
    backgroundListener.on("GET_VERSION", (data) => {
      localStorage.setItem("extension_version", JSON.stringify(data));
    });
    return false;
  });
}

function login(data: MessageData["BILIBILI_COOKIE"]) {
  const $token = document.querySelector("input#token") as HTMLInputElement;
  if ($token.value !== data.token) {
    alert(t("Token invalid"));
  } else {
    const cookie = data.cookieString as string;
    if (!cookie) {
      alert(t("Login fail"));
    } else {
      const $cookie = document.querySelector(
        "input#cookie",
      ) as HTMLInputElement;
      if ($cookie) {
        $cookie.value = cookie;
      }
      const $login = document.querySelector(
        "button#login",
      ) as HTMLButtonElement;
      $login?.click();
    }
  }
}
