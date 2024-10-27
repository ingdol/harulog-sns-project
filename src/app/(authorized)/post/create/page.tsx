"use client";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";

export default function PostCreatePage() {
  const [content, setContent] = useState("");
  const { user } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(content);
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
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="오늘 하루는 어떠셨나요?"
          className="w-full h-40 rounded-md focus:outline-none focus:border-blue-500 resize-none mb-4"
        />
        <button>
          <PhotoIcon className="w-6 h-6 text-gray-300 hover:text-gray-400" />
        </button>
        <div className="border-t border-gray-300 w-full my-2"></div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-8 py-1.5 rounded hover:bg-cyan-700"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
}
