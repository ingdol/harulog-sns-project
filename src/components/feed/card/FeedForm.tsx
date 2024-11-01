import { FileUploadButton, SubmitButton } from "@/components/button";
import UserInfo from "@/components/user/UserInfo";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useFeedStore } from "@/stores/feed/useFeedStore";
import { getImageUrl } from "@/utils/supabase/storage";
import Image from "next/image";
import React from "react";

interface FeedFormProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FeedForm({ isLoading, onSubmit }: FeedFormProps) {
  const { user } = useAuthStore();
  const { content, imageFile, imagePreview, setContent, setImageFile } =
    useFeedStore();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <form onSubmit={onSubmit}>
      <UserInfo user={user} />

      {(imageFile || imagePreview) && (
        <div className="mb-4">
          <Image
            src={
              imageFile
                ? URL.createObjectURL(imageFile)
                : getImageUrl(imagePreview)
            }
            width={100}
            height={50}
            alt="Image preview"
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
            if (file) setImageFile(file);
          }}
        />
        <SubmitButton isUploading={isLoading} onClick={onSubmit} />
      </div>
    </form>
  );
}
