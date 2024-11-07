"use client";

import { CommentBox } from "@/components/Feeds";
import { FeedSubMenu } from "@/components/Menus";
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
  const feedId = params?.id;

  const { data: feedData } = useFetchFeedDetail(feedId);

  return (
    <div className="flex items-center justify-center w-full h-full overflow-y-auto ">
      {feedData ? (
        <div className="flex gap-6 w-full h-full flex-col md:flex-row ">
          <div className="md:w-3/5 relative aspect-square">
            <Image
              src={getImageUrl(feedData.feed_image)}
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
                  <p className="font-semibold text-sm">
                    {feedData.user_nickname}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {getTimeDisplay(feedData.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-4 text-sm">
                {feedData.feed_content}
              </p>
            </div>
            <CommentBox feed={feedData} />
            <div className="flex w-full items-center justify-between border-t pt-2 text-gray-500 md:mb-0 mb-6">
              <div className="flex items-center gap-1">
                <HeartIcon className="w-6 h-6" />
                <p>{feedData.like_count || ""}</p>
              </div>

              {feedData.user_id === user?.id && (
                <FeedSubMenu
                  isTopMenu
                  feedId={feedData.id}
                  imagePath={feedData.feed_image}
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
