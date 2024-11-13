import { CloudIcon } from "@heroicons/react/24/solid";

export default function FeedTopMenu() {
  return (
    <div className="flex pb-4 items-center font-semibold border-b border-Slate-50 mb-2">
      <div className="min-w-16 flex justify-center">
        <CloudIcon className="w-6 h-6 text-slate-200" />
      </div>
      <div className="rounded-3xl px-4 py-1 bg-slate-100 text-gray-700 cursor-pointer mr-2">
        All
      </div>
      <div className="rounded-3xl px-4 py-1 hover:bg-slate-100 text-gray-400 hover:text-gray-700 cursor-pointer">
        Following
      </div>
    </div>
  );
}
