"use client";

import { DeleteCheckModal } from "@/components/Modals";
import { useDeleteFeed } from "@/services/feed/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubMenu from "../../../Menus/SubMenu";

interface FeedSubMenuProps {
  isTopMenu?: boolean;
  feedId: number;
  imagePath: string;
}

export default function FeedSubMenu({
  isTopMenu,
  feedId,
  imagePath,
}: FeedSubMenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const { mutateAsync: deleteFeedMutate } = useDeleteFeed();

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleEditFeedRoute = () => {
    router.push(`/feed/edit/${feedId}`);
  };

  const handleDeleteClcik = () => {
    setIsModalVisible(true);
  };

  const handleDeleteFeed = async () => {
    try {
      await deleteFeedMutate({ feedId, imagePath });
      console.log("삭제되었습니다.");
      handleCloseModal();
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <SubMenu
        isTopMenu={isTopMenu}
        onClickEditButton={handleEditFeedRoute}
        onClickDeleteButton={handleDeleteClcik}
      />
      {isModalVisible && (
        <DeleteCheckModal
          onCloseModal={handleCloseModal}
          onClickDelete={handleDeleteFeed}
        />
      )}
    </div>
  );
}
