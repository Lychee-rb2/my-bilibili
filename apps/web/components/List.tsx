import { BilibiliVideo } from '@repo/types'
import { getBlackList, getCookie } from '../util/cookie'
import Link from 'next/link'

const fetchList = () => {
  const cookie = getCookie()
  const blackList = getBlackList()
  return fetch("https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd", {
    headers: { cookie }
  }).then(res => res.json())
    .then(res => res.data.item as BilibiliVideo[])
    .then(items => items.filter(item => !item.business_info).filter(item => !blackList.video.includes(item.id)).filter(item => !blackList.author.includes(item.owner.mid)))
}

const fetchMore = async (): Promise<BilibiliVideo[]> => {
  const list = await fetchList()
  if (list.length < 24) {
    return Object.values([...list, ...(await fetchMore())].reduce<Record<string, BilibiliVideo>>((pre, cur) => ({
      ...pre,
      [cur.id]: cur
    }), {})).slice(0, 24)
  }
  return list.slice(0, 24)
}
export default async function List() {
  const list = await fetchMore()

  return <div
    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    {list.map((item) => (
      <article key={item.id} className="flex flex-col items-start justify-between">
        <div className="relative w-full">
          <img
            alt=""
            src={item.pic}
            referrerPolicy="no-referrer"
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
          <Link target="_blank" referrerPolicy="no-referrer" href={item.uri}>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
          </Link>
        </div>
        <div className="max-w-xl">
          <div className="mt-4 group relative">
            <h3
              className="mt-2 text-lg font-semibold h-12 line-clamp-2 leading-6 text-gray-900 group-hover:text-pink-600">
              <Link referrerPolicy="no-referrer" target="_blank" href={item.uri}>
                <span className="absolute inset-0"/>
                {item.title}
              </Link>
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <time dateTime={new Date(item.pubdate).toLocaleString()} className="text-gray-500">
              {new Date(item.pubdate).toLocaleString()}
            </time>
            <p
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {item.bvid}
            </p>
          </div>
          <div className="relative group mt-4 flex items-center gap-x-4">
            <img referrerPolicy="no-referrer" alt="" src={item.owner.face}
                 className="h-10 w-10 rounded-full bg-gray-100"/>
            <div className="text-sm leading-6">
              <Link href={`https://space.bilibili.com/${item.owner.mid}`} target="_blank" referrerPolicy="no-referrer"
                    className="font-semibold text-gray-900 group-hover:text-pink-600">
                <span className="absolute inset-0"/>
                {item.owner.name}
              </Link>
              <p className="text-gray-600">{item.owner.mid}</p>
            </div>
          </div>
        </div>
      </article>
    ))}
  </div>

}
