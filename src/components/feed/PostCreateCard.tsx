"use client";

import { uploadFile } from "@/actions/storage-action";
import { createNewFeed } from "@/helpers/feed";
import { NewFeedDTO } from "@/lib/feed";
import { useAddFeed } from "@/lib/feed/hooks/useAddFeed";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FileUploadButton, SubmitButton } from "../button";
import UserInfo from "../user/UserInfo";

export default function PostCreateCard() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuthStore();

  const { mutateAsync: createFeedMutate, isPending: isLoading } = useAddFeed();

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
      }
    } catch (error) {
      console.error("Error creating Feed:", (error as Error).message);
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!imageFile) return "";
    const formData = new FormData();
    formData.append("file", imageFile);
    const result = await uploadFile(formData);
    return result?.path || "";
  };

  const onFileChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <UserInfo user={user} />

      {imagePreview && (
        <div className="mb-4 relative aspect-video">
          <Image
            src={imagePreview}
            alt="Image preview"
            fill
            objectFit="cover"
          />
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘 하루는 어떠셨나요?"
        className={`w-full ${
          imagePreview ? "min-h-20" : "min-h-64 h-full"
        } rounded-md focus:outline-none focus:border-blue-500 resize-none p-2`}
      />

      <div className="border-t border-gray-300 w-full my-2"></div>

      <div className="flex justify-between items-center">
        <FileUploadButton onClick={() => fileInputRef.current?.click()} />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileChange(file);
          }}
        />
        <SubmitButton isUploading={isLoading} onClick={handleSubmit} />
      </div>
    </>
  );
}
