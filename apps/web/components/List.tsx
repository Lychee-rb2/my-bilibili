'use server'
import { BilibiliVideo } from '@repo/types'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { getBlackList, getCookie } from '../util/cookie'
import { revalidateTag } from 'next/cache'
import ScrollToTopButton from './ScrollToTopButton'
import Card from './Card'

const fetchList = async () => {
  const cookie = getCookie()
  const blackList = getBlackList()
  const res = await fetch("https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd", {
    headers: { cookie },
    next: { revalidate: 60, tags: ['list', 'me'] }
  })
  const res_1 = await res.json()
  const items = res_1.data.item as BilibiliVideo[]
  return items.filter(item => !item.business_info).filter(item_1 => !blackList.video.includes(item_1.id)).filter(item_2 => !blackList.author.includes(item_2.owner.mid))
}

const fetchMore = async (): Promise<BilibiliVideo[]> => {
  const list = await fetchList()
  const DISPLAY = 9
  if (list.length < DISPLAY) {
    return Object.values([...list, ...(await fetchMore())].reduce<Record<string, BilibiliVideo>>((pre, cur) => ({
      ...pre,
      [cur.id]: cur
    }), {})).slice(0, DISPLAY)
  }
  return list.slice(0, DISPLAY)
}

const Reload = () => <div className="my-8 flex items-center justify-center">
  <form action={() => {
    'use server'
    revalidateTag('list')
  }}>
    <ScrollToTopButton>
      <ArrowPathIcon className="hover:animate-spin" width={24} height={24}/>
    </ScrollToTopButton>
  </form>
</div>

export default async function List() {
  const list = await fetchMore()
  return <div>
    <Reload/>
    <div
      className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {list.map((item) => (
        <Card video={item} key={item.id}/>
      ))}
    </div>
    <Reload/>
  </div>
}
