"use client";

import { DeleteConfirmationModal } from "@/components/modal/check";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface FeedSubMenuProps {
  id: number;
}

export default function FeedSubMenu({ id }: FeedSubMenuProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const handleDelete = () => {
    console.log("삭제되었습니다.");
    setIsModalVisible(false);
  };

  const handleEdit = () => {
    // 수정 페이지로 이동
    router.push(`/feed/edit/${id}`);
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
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu}>
        <EllipsisHorizontalIcon className="w-6 h-6 text-gray-600" />
      </button>

      {isVisible && (
        <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 text-sm">
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
        <DeleteConfirmationModal onClose={closeModal} onDelete={handleDelete} />
      )}
    </div>
  );
}
