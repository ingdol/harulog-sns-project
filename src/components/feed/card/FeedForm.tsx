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
    <form onSubmit={onSubmit} className="h-full flex flex-col justify-between">
      <div className="flex items-center justify-center w-full h-full overflow-y-auto md:overflow-hidden">
        <div className="flex gap-6 w-full h-full flex-col md:flex-row ">
          {(imageFile || imagePreview) && (
            <div className="md:w-3/5 relative aspect-square">
              <Image
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : getImageUrl(imagePreview)
                }
                priority
                fill
                className="object-contain"
                alt="Image preview"
              />
            </div>
          )}

          <div
            className={`h-full flex flex-col gap-4 ${
              imageFile || imagePreview ? "py-6 md:w-2/5" : "w-full"
            }`}
          >
            <UserInfo user={user} />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 하루는 어떠셨나요?"
              className={`w-full flex-1 focus:outline-none focus:border-blue-500 resize-none p-2`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-300 pt-2 mt-4">
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
