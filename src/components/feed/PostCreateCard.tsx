"use client";

import { createFeed } from "@/actions/feed-action";
import { uploadFile } from "@/actions/storage-action";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useRef, useState, Suspense } from "react";

export default function PostCreateCard() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("h-44");

  const createFeedMutation = useMutation({
    mutationFn: async (newFeed: any) => await createFeed(newFeed),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile && !content) return;

    try {
      setIsUploading(true);

      let uploadedImageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const result = await uploadFile(formData);

        if (result && result.path) {
          uploadedImageUrl = result.path;
        }
      }
      console.log("Uploaded Image URL:", uploadedImageUrl);
      const newFeed = {
        feed_content: content,
        feed_image: uploadedImageUrl || null,
        user_nickname: user?.nickname,
      };

      createFeedMutation.mutate(newFeed);
      console.log("Created Feed:", newFeed);
    } catch (error) {
      console.error("Error creating Feed:", (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setTextareaHeight("h-20");
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Image
          src="/images/default-profile.jpg"
          alt="Profile Image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-col hidden lg:block">
          <h2 className="text-md font-bold lg:text-left">{user?.nickname}</h2>
          <p className="text-xs text-gray-400 lg:text-left">{user?.email}</p>
        </div>
      </div>

      {imagePreview && (
        <div className="mb-4 relative h-1/3 aspect-video">
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
        className={`w-full ${textareaHeight} min-h-10 rounded-md focus:outline-none focus:border-blue-500 resize-none mb-4`}
      />

      <div className="border-t border-gray-300 w-full my-2"></div>

      <div className="flex justify-between items-center">
        <button type="button" onClick={() => fileInputRef.current?.click()}>
          <PhotoIcon className="w-6 h-6 text-gray-300 hover:text-gray-400" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file);
            }
          }}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={createFeedMutation.isPending}
            className={`bg-cyan-600 text-white px-8 py-1.5 rounded hover:bg-cyan-700 ${
              createFeedMutation.isPending ? "opacity-50" : ""
            }`}
          >
            {createFeedMutation.isPending ? "Posting..." : "Post"}
          </button>
        </Suspense>
      </div>
    </>
  );
}
