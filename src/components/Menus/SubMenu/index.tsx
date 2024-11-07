"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

interface SubMenuProps {
  isTopMenu?: boolean;
  isComment?: boolean;
  onClickEditButton?: () => void;
  onClickDeleteButton?: () => void;
}

export default function SubMenu({
  isTopMenu,
  isComment,
  onClickEditButton = () => {},
  onClickDeleteButton = () => {},
}: SubMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleEditClick = () => {
    onClickEditButton();
    setIsVisible(false);
  };

  const handleDeleteClcik = () => {
    onClickDeleteButton();
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={
        isComment
          ? `absolute top-0 right-0 ${
              isVisible
                ? "opacity-100"
                : "transition-opacity opacity-0 group-hover:opacity-100"
            }`
          : ""
      }
    >
      <div className="relative flex items-center" ref={menuRef}>
        <button onClick={() => setIsVisible(!isVisible)}>
          <EllipsisHorizontalIcon
            className={
              isComment ? "w-5 h-5 text-gray-400" : "w-6 h-6 text-gray-600"
            }
          />
        </button>

        {isVisible && (
          <div
            className={`absolute right-0 ${
              isTopMenu ? "-top-20" : "top-8"
            } w-40 bg-white border border-gray-200 rounded-lg shadow-md text-sm z-50`}
          >
            <ul className="flex flex-col divide-y divide-gray-200">
              <li
                onClick={handleDeleteClcik}
                className="px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100 rounded-t-lg"
              >
                삭제
              </li>
              <li
                onClick={handleEditClick}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-b-lg"
              >
                수정
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
