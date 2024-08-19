"use server";
import Link from "next/link";
import Second from "./Second";
import NumberFormat from "./Number";
import Time from "./Time";
import { addBlackListAuthor, addBlackListVideo } from "../util/cookie";
import { Video } from "@repo/types";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  FilmIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { t } from "@repo/i18n";

export default async function Card({ video }: { video: Video }) {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <img
          alt=""
          src={video.cover}
          referrerPolicy="no-referrer"
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover"
        />
        <Link target="_blank" referrerPolicy="no-referrer" href={video.url}>
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs w-full text-gray-500">
        <p className="flex items-center gap-x-2">
          <span className="flex items-center gap-x-1">
            <ClockIcon width={16} />
            <Second duration={video.duration} />
          </span>
          <span className="flex items-center gap-x-1">
            <FilmIcon width={16} />
            <NumberFormat number={video.view} />
          </span>
          {video.like && (
            <span className="flex items-center gap-x-1">
              <HandThumbUpIcon width={16} />
              <NumberFormat number={video.like} />
            </span>
          )}
          <span className="flex items-center gap-x-1">
            <ChatBubbleOvalLeftEllipsisIcon width={16} />
            <NumberFormat number={video.danmaku} />
          </span>
        </p>
        <p>
          <Time time={video.pubdate * 1000} />
        </p>
      </div>
      <div className="w-full">
        <div className="mt-2 group relative">
          <h3 className="mt-2 text-lg font-semibold h-12 line-clamp-2 leading-6 text-gray-900 group-hover:text-pink-600">
            <Link referrerPolicy="no-referrer" target="_blank" href={video.url}>
              <span className="absolute inset-0" />
              {video.title}
            </Link>
          </h3>
        </div>
        <div className="flex justify-between w-full">
          <div className="relative group mt-4 flex items-center gap-x-4">
            <img
              referrerPolicy="no-referrer"
              alt=""
              src={video.author.avatar}
              className="h-10 w-10 rounded-full bg-gray-100 ring-1 ring-inset ring-gray-900"
            />
            <div className="text-sm leading-6">
              <Link
                href={`https://space.bilibili.com/${video.author.mid}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="font-semibold text-gray-900 hover:text-pink-600"
              >
                <div className="absolute inset-0" />
                {video.author.name}
              </Link>
            </div>
          </div>
          <div className="flex items-end justify-end space-x-1">
            <form
              action={() => {
                "use server";
                addBlackListAuthor(video.author.mid);
              }}
            >
              <button className="text-xs opacity-50 text-gray-500 hover:text-red-500">
                {t("Blacklisted author")}
              </button>
            </form>
            <form
              action={() => {
                "use server";
                addBlackListVideo(video.bvid);
              }}
            >
              <button className="text-xs opacity-50 text-gray-500 hover:text-red-500">
                {t("Blacklisted video")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}
