import zhCN from "./zh-CN";

export const t = (key: keyof typeof zhCN) => {
  return zhCN[key];
};

export const getLocale = () => "zh-CN";
