'use server'

import { cookies } from 'next/headers'
import Link from 'next/link'

export const Me = async () => {
  const cookie = cookies().get('bilibili')?.value
  if (!cookie) {
    return <></>
  }
  const list = await fetch("https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd", {
    headers: { cookie }
  }).then(res => res.json()).then(res => res.data.item as { title: string, uri: string, pic: string }[])
  const me = await fetch("https://api.bilibili.com/x/space/v2/myinfo", {
    headers: { cookie }
  }).then(res => res.json()).then(res => res.data.profile as { face: string, name: string })
  return <div>
    <h1>{me.name}</h1>
    <form action={() => {
      'use server'
      cookies().delete('bilibili')
    }}>
      <button>logout</button>
    </form>
    <ul>
      {list.map(i => <li key={i.uri}>
        <Link href={i.uri}>{i.title}</Link>
        <img width={64} height={64} src={i.pic} referrerPolicy="no-referrer" />
      </li>)}
    </ul>
  </div>
}
