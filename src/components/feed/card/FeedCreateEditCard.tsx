"use client";

import { uploadFile } from "@/actions/storage-action";
import { NewFeedDTO, UpdateFeedDTO } from "@/lib/feed";
import { useCreateFeed, useUpdateFeed } from "@/lib/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useFeedStore } from "@/stores/feed/useFeedStore";
import React, { useEffect } from "react";
import FeedForm from "./FeedForm";
import { useParams } from "next/navigation";

export default function FeedCreateEditCard() {
  const params = useParams() as { id?: string };
  const id = params?.id;

  const { content, imageFile, imagePreview, resetForm, loadFeedData } =
    useFeedStore();
  const { user } = useAuthStore();
  const { mutateAsync: createFeedMutate, isPending: isCreating } =
    useCreateFeed();
  const { mutateAsync: updateFeedMutate, isPending: isUpdating } =
    useUpdateFeed();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (id) {
      loadFeedData(id);
    } else {
      resetForm();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile && !content) return;

    try {
      const uploadedImageUrl = imageFile
        ? await handleImageUpload(imageFile)
        : imagePreview;
      if (user) {
        if (id) {
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
        } else {
          const newFeedData: NewFeedDTO = {
            user_id: user.id,
            feed_content: content,
            feed_image: uploadedImageUrl,
          };
          await createFeedMutate(newFeedData);
        }
        resetForm();
      }
    } catch (error) {
      console.error("Error creating/updating Feed:", (error as Error).message);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const uniqueFileName = `${crypto.randomUUID()}_${file.name}`;
    const renamedFile = new File([file], uniqueFileName, {
      type: file.type,
    });
    const formData = new FormData();
    formData.append("file", renamedFile);
    const result = await uploadFile(formData);
    return result?.path || "";
  };

  return <FeedForm isLoading={isLoading} onSubmit={handleSubmit} />;
}
