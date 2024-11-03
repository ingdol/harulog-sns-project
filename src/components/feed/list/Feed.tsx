import { IUser } from "@/lib/auth";
import { IFeed } from "@/lib/feed";
import { getImageUrl } from "@/utils/supabase/storage";
import { getTimeDisplay } from "@/utils/time/timeUtils";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { FeedSubMenu } from "../sub";

interface FeedProps {
  feed: IFeed;
  user?: IUser;
}

export default function Feed({ feed, user }: FeedProps) {
  return (
    <div className="bg-white p-4 w-[24rem] md:w-[28rem] lg:w-[36rem] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
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
        </div>
        {feed.user_id === user?.id && (
          <FeedSubMenu feedId={feed.id} imagePath={feed.feed_image} />
        )}
      </div>
      {feed.feed_image && (
        <div className="mb-4 aspect-video max-w-full relative">
          <Image
            src={getImageUrl(feed.feed_image)}
            alt="feed image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <p className="mb-4">{feed.feed_content}</p>
      <div className="flex gap-2 text-gray-500">
        <div className="flex items-center gap-1">
          <HeartIcon className="w-6 h-6" />
          <p>{feed.like_count || ""}</p>
        </div>
        <div className="flex items-center gap-1">
          <Link href={`/feed/${feed.id}`}>
            <ChatBubbleBottomCenterIcon className="w-6 h-6 hover:text-gray-800" />
          </Link>
          <p>{feed.comment_count || ""}</p>
        </div>
      </div>
    </div>
  );
}
