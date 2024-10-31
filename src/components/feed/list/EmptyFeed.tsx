import { CloudIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function EmptyFeed() {
  return (
    <div className="mt-10 p-4 max-w-xl mx-auto flex flex-col justify-center items-center text-center gap-6">
      <p className="text-xl text-gray-500">게시글이 없습니다</p>
      <div className="border border-t border-gray-200 w-4" />
      <div className="flex items-center gap-1">
        <p className="text-xl text-gray-700">
          오늘{" "}
          <Link
            href="/feed/create"
            className="text-2xl text-cyan-700 hover:underline"
          >
            하루 기록
          </Link>{" "}
          하러 가기
        </p>
        <CloudIcon className="w-8 h-8 text-slate-200" />
      </div>
    </div>
  );
}
