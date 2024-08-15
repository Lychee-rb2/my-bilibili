async function main() {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "BILIBILI_COOKIE") {
      const $token = document.querySelector("input#token") as HTMLInputElement;
      if ($token.value !== message.data.token) {
        alert("Token invalid");
      } else {
        const cookie = message.data.cookieString as string;
        if (!cookie) {
          alert("No cookie");
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
    return false;
  });
}

main();
