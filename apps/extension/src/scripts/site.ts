async function main() {
  console.log('site.js')
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    if (message.type === "BILIBILI_COOKIE") {
      const $token = document.querySelector('input#token') as HTMLInputElement
      if ($token.value === message.data.token) {
        const cookie = message.data.cookieString as string
        const $cookie = document.querySelector('input#cookie') as HTMLInputElement
        if ($cookie) {
          $cookie.value = cookie
        }
        const $login = document.querySelector('button#login') as HTMLButtonElement
        $login?.click()
      }
    }
    return false
  });
}

main()
