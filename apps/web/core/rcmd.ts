import { BilibiliRcmdVideo, Video } from "@repo/types";
import { getBlackList, getCookie } from "../util/cookie";

const dto = (item: BilibiliRcmdVideo): Video => ({
  bvid: item.bvid,
  cover: item.pic,
  url: item.uri,
  duration: item.duration,
  view: item.stat.view,
  like: item.stat.like,
  danmaku: item.stat.danmaku,
  pubdate: item.pubdate,
  title: item.title,
  author: {
    avatar: item.owner.face,
    name: item.owner.name,
    mid: item.owner.mid,
  },
});

export const fetchList = async (): Promise<Video[]> => {
  const cookie = getCookie();
  const blackList = getBlackList();
  const response = await fetch(
    "https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd",
    {
      headers: { cookie },
      next: { revalidate: 60, tags: ["list", "me"] },
    },
  );
  const res = await response.json();
  const items = res.data.item as BilibiliRcmdVideo[];
  return items
    .filter((item) => !item.business_info)
    .filter((item_1) => !blackList.video.includes(item_1.bvid))
    .filter((item_2) => !blackList.author.includes(item_2.owner.mid))
    .map(dto);
};
