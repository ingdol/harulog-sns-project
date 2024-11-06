"use client";

import FeedSubMenu from "@/components/Menus/FeedSubMenu";
import { useFetchFeedDetail } from "@/lib/feed/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { getImageUrl } from "@/utils/supabase/storage";
import { getTimeDisplay } from "@/utils/time";
import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function FeedDetailCard() {
  const { user } = useAuthStore();
  const params = useParams() as { id: string };
  const id = params?.id;

  const { data } = useFetchFeedDetail(id);

  return (
    <div className="flex items-center justify-center w-full h-full overflow-y-auto ">
      {data ? (
        <div className="flex gap-6 w-full h-full flex-col md:flex-row ">
          <div className="md:w-3/5 relative aspect-square">
            <Image
              src={getImageUrl(data.feed_image)}
              alt="Feed image"
              priority
              fill
              className="object-contain"
            />
          </div>
          <div className="md:w-2/5 flex flex-col ">
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
            <div className="flex w-full items-center justify-between border-t pt-2 text-gray-500 md:mb-0 mb-6">
              <div className="flex items-center gap-1">
                <HeartIcon className="w-6 h-6" />
                <p>{data.like_count || ""}</p>
              </div>

              {data.user_id === user?.id && (
                <FeedSubMenu
                  feedId={Number(id)}
                  imagePath={data.feed_image}
                  isTopMenu
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-white">게시글을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
