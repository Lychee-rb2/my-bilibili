"use server";

import { BilibiliProfile } from "@repo/types";
import { getCookie } from "../util/cookie";
import { NoCookie } from "./NoCookie";

export const Me = async () => {
  const cookie = getCookie();
  const me = await fetch("https://api.bilibili.com/x/space/v2/myinfo", {
    headers: { cookie },
    next: {
      tags: ["me"],
    },
  })
    .then((res) => res.json())
    .then((res) => res.data.profile as BilibiliProfile)
    .catch(() => null);
  if (me) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {me.name}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">{me.sign}</p>
      </div>
    );
  }
  return <NoCookie />;
};
