"use client";

import { useDeleteFeed } from "@/lib/feed/hooks";
import { useEffect, useRef } from "react";

interface DeleteConfirmModalProps {
  feedId: number;
  imagePath: string;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  feedId,
  imagePath,
  onClose,
}: DeleteConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: deleteFeedMutate } = useDeleteFeed();

  const handleDelete = async () => {
    try {
      await deleteFeedMutate({ feedId, imagePath });
      console.log("삭제되었습니다.");
      onClose();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-full w-full mb-2 hover:bg-red-600"
        >
          삭제
        </button>
        <button
          onClick={onClose}
          className="border border-gray-300 py-2 px-4 rounded-full w-full hover:bg-gray-100"
        >
          취소
        </button>
      </div>
    </div>
  );
}
