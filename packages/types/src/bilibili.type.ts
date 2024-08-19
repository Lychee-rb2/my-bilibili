export interface BilibiliProfile {
  face: string;
  name: string;
  mid: number;
  sign?: string;
}

export interface BilibiliRcmdVideo {
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
export interface BilibiliSearchPagination {
  pn: number;
  ps: number;
  count: number;
}
export interface BilibiliSearchItem {
  comment: number;
  typeid: number;
  play: number;
  pic: string;
  subtitle: string;
  description: string;
  copyright: string;
  title: string;
  review: number;
  author: string;
  mid: number;
  created: number;
  length: string; //"01:19";
  video_review: number;
  aid: number;
  bvid: string;
  hide_click: boolean;
  is_pay: number;
  is_union_video: number;
  is_steins_gate: number;
  is_live_playback: number;
  is_lesson_video: number;
  is_lesson_finished: number;
  lesson_update_info: string;
  jump_url: string;
  meta: null;
  is_avoided: number;
  season_id: number;
  attribute: number;
  is_charging_arc: boolean;
  vt: number;
  enable_vt: number;
  vt_display: string;
  playback_position: number;
  is_self_view: boolean;
}
