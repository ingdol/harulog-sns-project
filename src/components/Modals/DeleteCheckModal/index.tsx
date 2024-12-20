"use client";

import { useEffect, useRef } from "react";

interface DeleteCheckModalProps {
  onCloseModal: () => void;
  onClickDelete: () => void;
}

export default function DeleteCheckModal({
  onCloseModal,
  onClickDelete,
}: DeleteCheckModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-80 text-center"
      >
        <h2 className="text-lg font-semibold mb-2">
          게시글을 삭제하시겠습니까?
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          이 작업은 되돌릴 수 없으며, 게시물은 내 프로필, 팔로워의 타임라인에서
          삭제됩니다.
        </p>
        <button
          onClick={onClickDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-full w-full mb-2 hover:bg-red-600"
        >
          삭제
        </button>
        <button
          onClick={onCloseModal}
          className="border border-gray-300 py-2 px-4 rounded-full w-full hover:bg-gray-100"
        >
          취소
        </button>
      </div>
    </div>
  );
}
