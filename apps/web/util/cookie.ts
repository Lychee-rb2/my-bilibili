import { cookies } from "next/headers";
import { BilibiliProfile } from "@repo/types";

const COOKIE_KEY = {
  BLACK_LIST: "BLACK_LIST",
  BILIBILI_COOKIE: "BILIBILI_COOKIE",
  BILIBILI_COOKIE_TOKEN: "BILIBILI_COOKIE_TOKEN",
};

interface BlackList {
  author: number[];
  video: number[];
}

export const getBlackList = () => {
  const _blacklist = cookies().get(COOKIE_KEY.BLACK_LIST)?.value;
  if (!_blacklist) return { author: [], video: [] };
  try {
    return JSON.parse(_blacklist) as BlackList;
  } catch {
    return { author: [], video: [] };
  }
};

export const addBlackListVideo = (id: number) => {
  const blackList = getBlackList();
  blackList.video.push(id);
  blackList.video = [...new Set(blackList.video)];
  cookies().set(COOKIE_KEY.BLACK_LIST, JSON.stringify(blackList));
};

export const addBlackListAuthor = (id: number) => {
  const blackList = getBlackList();
  blackList.author.push(id);
  blackList.author = [...new Set(blackList.author)];
  cookies().set(COOKIE_KEY.BLACK_LIST, JSON.stringify(blackList));
};

export const login = async (cookie: string) => {
  const me = await fetch("https://api.bilibili.com/x/space/v2/myinfo", {
    headers: { cookie },
  })
    .then((res) => res.json())
    .then((res) => res.data.profile as BilibiliProfile)
    .catch(() => null);
  if (me) {
    cookies().set(COOKIE_KEY.BILIBILI_COOKIE, cookie);
    return me;
  } else {
    logout();
    return;
  }
};
export const logout = () => cookies().delete(COOKIE_KEY.BILIBILI_COOKIE);
export const getCookie = () =>
  cookies().get(COOKIE_KEY.BILIBILI_COOKIE)?.value || "";
