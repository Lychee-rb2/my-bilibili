export interface UP {
  avatar: string;
  name: string;
  mid: number;
}
export interface Video {
  bvid: string;
  cover: string;
  url: string;
  duration: string | number;
  view: number;
  like: number | null;
  danmaku: number;
  pubdate: number;
  title: string;
  author: UP;
}
