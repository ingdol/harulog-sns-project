"use client";

import { useFetchFeedDetail } from "@/lib/feed/hooks";
import { getImageUrl } from "@/utils/supabase/storage";
import { getTimeDisplay } from "@/utils/time/timeUtils";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function FeedDetailCard() {
  const params = useParams() as { id: string };
  const id = params?.id;

  const { data } = useFetchFeedDetail(id);

  return (
    <div className="flex items-center justify-center w-full h-96">
      {data ? (
        <div className="flex">
          <div className="w-2/3">
            <Image
              src={getImageUrl(data.feed_image)}
              alt="Feed image"
              priority
              width={720}
              height={720}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="w-1/3 p-4 flex flex-col">
            <div className="border-b">
              <div className="flex items-center pb-3">
                <Image
                  src={`/images/default-profile.jpg`}
                  alt="User profile"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm">{data.user_nickname}</p>
                  <p className="text-gray-500 text-xs">
                    {getTimeDisplay(data.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-4 text-sm">{data.feed_content}</p>
            </div>
            <div className="flex-1 overflow-y-auto py-3">
              <p className="text-gray-500 text-xs">No comments yet.</p>
            </div>
            <div className="flex items-center gap-1 border-t pt-2 text-gray-500">
              <HeartIcon className="w-5 h-5" />
              <p>{data.like_count || ""}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-white">게시글을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
