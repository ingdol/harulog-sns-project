"use client";

import { handleImageUpload } from "@/utils/uploadUtils";
import { UpdateFeedDTO } from "@/lib/feed";
import { useUpdateFeed } from "@/lib/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useFeedStore } from "@/stores/feed/useFeedStore";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import FeedForm from "@/components/Forms/FeedForm";

export default function FeedEditCard() {
  const params = useParams() as { id: string };
  const id = params.id;

  const { content, imageFile, imagePreview, resetForm, loadFeedData } =
    useFeedStore();
  const { user } = useAuthStore();
  const { mutateAsync: updateFeedMutate, isPending: isUpdating } =
    useUpdateFeed();

  useEffect(() => {
    if (id) {
      loadFeedData(id);
    }
    return () => resetForm();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile && !content) return;

    try {
      const uploadedImageUrl = imageFile
        ? await handleImageUpload(imageFile)
        : imagePreview;
      if (user) {
        const updateFeedData: UpdateFeedDTO = {
          feed_image: uploadedImageUrl,
          feed_content: content,
        };
        await updateFeedMutate({
          feedId: id,
          updateFeedData,
          imageFile,
          imagePreview,
        });
        resetForm();
      }
    } catch (error) {
      console.error("Error updating Feed:", (error as Error).message);
    }
  };

  return <FeedForm isLoading={isUpdating} onSubmit={handleSubmit} />;
}
