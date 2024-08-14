import { cookies } from 'next/headers'

const COOKIE_KEY = {
  BLACK_LIST: "BLACK_LIST",
  BILIBILI_COOKIE: "BILIBILI_COOKIE",
  BILIBILI_COOKIE_TOKEN: "BILIBILI_COOKIE_TOKEN"
}

interface BlackList {
  author: number[]
  video: number[]
}

export const getBlackList = () => {
  const _blacklist = (cookies().get(COOKIE_KEY.BLACK_LIST)?.value)
  if (!_blacklist) return { author: [], video: [] }
  try {
    return JSON.parse(_blacklist) as BlackList
  } catch {
    return { author: [], video: [] }
  }
}

export const addBlackListVideo = (id: number) => {
  const blackList = getBlackList()
  blackList.video.push(id)
  blackList.video = [...new Set(blackList.video)]
  cookies().set(COOKIE_KEY.BLACK_LIST, JSON.stringify(blackList))
}

export const addBlackListAuthor = (id: number) => {
  const blackList = getBlackList()
  blackList.author.push(id)
  blackList.author = [...new Set(blackList.author)]
  cookies().set(COOKIE_KEY.BLACK_LIST, JSON.stringify(blackList))
}

export const login = (cookie: string) => cookies().set(COOKIE_KEY.BILIBILI_COOKIE, cookie)
export const logout = () => cookies().delete(COOKIE_KEY.BILIBILI_COOKIE)
export const getCookie = () => cookies().get(COOKIE_KEY.BILIBILI_COOKIE)?.value || ""
