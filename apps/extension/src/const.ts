import { ExtensionVersion } from "@repo/types";

export const MESSAGE_TYPE = {
  SITE_ASK_COOKIE: "SITE_ASK_COOKIE",
  ASK_VERSION: "ASK_VERSION",
  GET_VERSION: "GET_VERSION",
  BILIBILI_COOKIE: "BILIBILI_COOKIE",
};

export const MESSAGE_FROM = {
  BILIBILI: "BILIBILI",
  BACKGROUND: "BACKGROUND",
  POPUP: "POPUP",
  MY_BILIBILI: "MY_BILIBILI",
};

export interface MessageData {
  SITE_ASK_COOKIE: {
    token: string;
  };
  ASK_VERSION: {};
  GET_VERSION: ExtensionVersion;
  BILIBILI_COOKIE: {
    cookieString: string;
    token: string;
  };
}

export interface MessageFrom {
  BACKGROUND: "GET_VERSION" | "BILIBILI_COOKIE";
  BILIBILI: "SITE_ASK_COOKIE";
  POPUP: "ASK_VERSION";
  MY_BILIBILI: "ASK_VERSION";
}
