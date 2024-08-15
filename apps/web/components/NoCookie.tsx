"use server";
import { v4 } from "uuid";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Login from "./Login";

export async function NoCookie() {
  const token = v4();
  return (
    <div>
      <main>
        <div className="flex flex-col justify-center items-center p-5">
          <Link
            href={`https://www.bilibili.com?token=${token}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowTopRightOnSquareIcon width={24} className="animate-bounce" />
          </Link>
          <Login token={token} />
        </div>
      </main>
    </div>
  );
}
