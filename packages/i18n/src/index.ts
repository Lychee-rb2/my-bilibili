import zhCN from "./zh-CN";

export const t = (key: keyof typeof zhCN) => zhCN[key];

export const getLocale = () => "zh-CN";
