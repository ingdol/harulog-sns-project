import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchInput() {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-md border border-gray-200 px-3 py-0.5">
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </div>
  );
}
