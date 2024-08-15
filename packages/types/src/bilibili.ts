export interface BilibiliProfile {
  face: string;
  name: string;
  mid: number;
  sign?: string;
}

export interface BilibiliVideo {
  id: number;
  bvid: string;
  cid: number;
  goto: "av";
  uri: string;
  pic: string;
  pic_4_3: string;
  title: string;
  duration: number;
  pubdate: number;
  owner: BilibiliProfile;
  stat: {
    view: number;
    like: number;
    danmaku: number;
    vt: number;
  };
  business_info: null | unknown;
}
