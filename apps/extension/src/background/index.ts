async function main() {
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'SITE_ASK_COOKIE') {
      sendCookies(message.data.token).then(() => {
        sender.tab?.id && chrome.tabs.remove(sender.tab.id);
      })
    }
    return false
  });
}

async function sendCookies(token: string) {
  const cookies = await chrome.cookies.getAll({ domain: ".bilibili.com" });
  const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
  chrome.tabs.query({}).then(tabs => {
    tabs.filter(i => i.id).forEach(tab => {
      chrome.tabs.sendMessage(tab.id!, {
        type: 'BILIBILI_COOKIE', data: { cookieString, token }
      }).catch(() => {
      })
    });
  })
}

main()
