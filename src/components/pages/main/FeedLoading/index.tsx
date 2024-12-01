import { CloudIcon } from "@heroicons/react/24/solid";

export default function FeedLoading() {
  return (
    <div className="mt-10 p-4 max-w-xl mx-auto flex flex-col justify-center items-center text-center gap-6">
      <CloudIcon className="w-8 h-8 text-slate-200" />
      <p className="text-xl text-gray-500">로딩 중</p>
    </div>
  );
}
