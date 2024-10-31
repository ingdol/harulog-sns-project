import { IFeed } from "@/lib/feed";
import { getImageUrl } from "@/utils/supabase/storage";
import { getTimeDisplay } from "@/utils/time/timeUtils";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Post({ post }: { post: IFeed }) {
  return (
    <div className="bg-white p-4 w-[24rem] md:w-[28rem] lg:w-[36rem] mx-auto">
      <div className="flex items-center mb-4">
        <Image
          src={`/images/default-profile.jpg`}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <div className="flex items-center gap-1">
          <p className="font-semibold text-sm">{post.user_nickname}</p>
          <p className="text-gray-500">•</p>
          <p className="text-gray-500 text-sm">
            {getTimeDisplay(post.created_at)}
          </p>
        </div>
      </div>
      {post.feed_image && (
        <div className="mb-4 aspect-video max-w-full relative">
          <Image
            src={getImageUrl(post.feed_image)}
            alt="Post image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <p className="mb-4">{post.feed_content}</p>
      <div className="flex gap-2 text-gray-500">
        <div className="flex items-center gap-1">
          <HeartIcon className="w-6 h-6" />
          <p>{post.like_count || ""}</p>
        </div>
        <div className="flex items-center gap-1">
          <Link href={`/post/${post.id}`}>
            <ChatBubbleBottomCenterIcon className="w-6 h-6 hover:text-gray-800" />
          </Link>
          <p>{post.comment_count || ""}</p>
        </div>
      </div>
    </div>
  );
}
