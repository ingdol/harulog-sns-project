"use client";

import { uploadFile } from "@/actions/storage-action";
import { createNewFeed } from "@/helpers/feed";
import { NewFeedDTO } from "@/lib/feed";
import { useCreateFeed } from "@/lib/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useFeedStore } from "@/stores/feed/useFeedStore";
import React from "react";
import FeedForm from "./FeedForm";

export default function FeedCreateCard() {
  const { user } = useAuthStore();
  const { content, imageFile, resetForm } = useFeedStore();

  const { mutateAsync: createFeedMutate, isPending: isLoading } =
    useCreateFeed();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile && !content) return;

    try {
      const uploadedImageUrl = await handleImageUpload();
      if (user) {
        const newFeedData: NewFeedDTO = {
          user_id: user.id,
          feed_content: content,
          feed_image: uploadedImageUrl,
        };

        const newFeed = createNewFeed(newFeedData, uploadedImageUrl);

        await createFeedMutate(newFeed);
        console.log("Created Feed:", newFeed);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating Feed:", (error as Error).message);
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!imageFile) return "";
    const uniqueFileName = `${crypto.randomUUID()}_${imageFile.name}`;
    const renamedFile = new File([imageFile], uniqueFileName, {
      type: imageFile.type,
    });
    const formData = new FormData();
    formData.append("file", renamedFile);
    const result = await uploadFile(formData);
    return result?.path || "";
  };

  return <FeedForm isLoading={isLoading} onSubmit={handleSubmit} />;
}
