"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteFeed } from "@/lib/feed/hooks";
import { DeleteConfirmModal } from "@/components/modal/check";

interface FeedSubMenuProps {
  feedId: number;
  imagePath: string;
  isTopMenu?: boolean;
}

export default function FeedSubMenu({
  feedId,
  imagePath,
  isTopMenu,
}: FeedSubMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { mutateAsync: deleteFeedMutate } = useDeleteFeed();

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const openModal = () => {
    setIsVisible(false);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      await deleteFeedMutate({ feedId, imagePath });
      console.log("삭제되었습니다.");
      setIsModalVisible(false);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  const handleEdit = () => {
    router.push(`/feed/edit/${feedId}`);
    setIsModalVisible(false);
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
    <div className="relative flex items-center" ref={menuRef}>
      <button onClick={toggleMenu}>
        <EllipsisHorizontalIcon className="w-6 h-6 text-gray-600" />
      </button>

      {isVisible && (
        <div
          className={`absolute right-0 ${
            isTopMenu ? "-top-24" : "top-8"
          } w-40 bg-white border border-gray-200 rounded-lg shadow-md text-sm z-50`}
        >
          <ul className="flex flex-col divide-y divide-gray-200">
            <li
              onClick={openModal}
              className="px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100 rounded-t-lg"
            >
              삭제
            </li>
            <li
              onClick={handleEdit}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-b-lg"
            >
              수정
            </li>
          </ul>
        </div>
      )}
      {isModalVisible && (
        <DeleteConfirmModal onClose={closeModal} onDelete={handleDelete} />
      )}
    </div>
  );
}
