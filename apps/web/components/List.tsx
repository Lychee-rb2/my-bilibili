"use server";
import { Video } from "@repo/types";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { revalidateTag } from "next/cache";
import ScrollToTopButton from "./ScrollToTopButton";
import Card from "./Card";
import { fetchList } from "../core/rcmd";

const fetchMore = async (): Promise<Video[]> => {
  const list = await fetchList();
  const DISPLAY = 24;
  if (list.length < DISPLAY) {
    return Object.values(
      [...list, ...(await fetchMore())].reduce<Record<string, Video>>(
        (pre, cur) => ({
          ...pre,
          [cur.bvid]: cur,
        }),
        {},
      ),
    ).slice(0, DISPLAY);
  }
  return list.slice(0, DISPLAY);
};

const Reload = () => (
  <div className="my-8 flex items-center justify-center">
    <form
      action={() => {
        "use server";
        revalidateTag("list");
      }}
    >
      <ScrollToTopButton>
        <ArrowPathIcon className="hover:animate-spin" width={24} height={24} />
      </ScrollToTopButton>
    </form>
  </div>
);

export default async function List() {
  const list = await fetchMore();
  return (
    <div>
      <Reload />
      <div className="mx-auto my-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {list.map((item) => (
          <Card video={item} key={item.bvid} />
        ))}
      </div>
      <Reload />
    </div>
  );
}
