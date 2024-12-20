"use client";
import LikeButton from "@/components/Buttons/LikeButton";
import { IUser } from "@/services/auth";
import { IFeed } from "@/services/feed";
import { getTimeDisplay } from "@/utils/time";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import FeedSubMenu from "../../feed/FeedSubMenu";
import { getImageUrl } from "@/utils/supabase/storage";

interface FeedProps {
  feed: IFeed;
  user?: IUser;
  index: number;
}

export default function Feed({ feed, user, index }: FeedProps) {
  return (
    <div className="bg-white p-4 w-[24rem] md:w-[28rem] lg:w-[36rem] h-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Link
          href={"/profile/" + feed.user_nickname}
          className="flex items-center"
        >
          <Image
            src={`/images/default-profile.jpg`}
            alt="User profile"
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm">{feed.user_nickname}</p>
            <p className="text-gray-500">•</p>
            <p className="text-gray-500 text-sm">
              {getTimeDisplay(feed.created_at)}
            </p>
          </div>
        </Link>
        {feed.user_id === user?.id && (
          <FeedSubMenu feedId={feed.id} imagePath={feed.feed_image} />
        )}
      </div>
      {feed.feed_image && (
        <div className="mb-4">
          <Image
            src={getImageUrl(feed.feed_image)}
            alt="feed image"
            width={0}
            height={0}
            sizes="(max-width: 768px) 24rem, (max-width: 1024px) 28rem, 36rem"
            style={{ width: "100%", height: "auto" }}
            priority={index < 3}
          />
        </div>
      )}
      <p className="mb-4">{feed.feed_content}</p>
      <div className="flex gap-2 text-gray-500">
        <LikeButton feedId={feed.id} initialLikeCount={feed.like_count} />
        <Link
          href={`/feed/${feed.id}`}
          className="flex items-center gap-1 hover:text-gray-800"
        >
          <ChatBubbleBottomCenterIcon className="w-6 h-6 " />
          <p>{feed.comment_count || ""}</p>
        </Link>
      </div>
    </div>
  );
}
