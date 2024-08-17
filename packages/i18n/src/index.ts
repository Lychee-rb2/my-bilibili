import zhCN from "./zh-CN";

export const t = (key: keyof typeof zhCN, replace?: Record<string, string>) =>
  zhCN[key].replace(/{([^}]+)}/g, (ori, k) => replace?.[k] || ori);

export const getLocale = () => "zh-CN";
