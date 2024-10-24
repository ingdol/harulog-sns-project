import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface PostProps {
  post: {
    id: string;
    user_id: string;
    post_contents: string;
    post_image: string;
    comment_count: number;
    like_count: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <div className="bg-white p-4 max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <Image
          src={`/images/default-profile.jpg`}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <div className="flex items-center gap-1">
          <p className="font-semibold text-sm">User {post.user_id}</p>
          <p className="text-gray-500">•</p>
          <p className="text-gray-500 text-sm">{post.created_at}</p>
        </div>
      </div>
      {post.post_image && (
        <div className="mb-4">
          <Image
            src={`/images/test-image.png`}
            alt="Post image"
            width={720}
            height={160}
          />
        </div>
      )}
      <p className="mb-4">{post.post_contents}</p>
      <div className="flex gap-2 text-gray-500">
        <div className="flex items-center gap-1">
          <HeartIcon className="w-6 h-6" />
          <p>{post.like_count || ""}</p>
        </div>
        <div className="flex items-center gap-1">
          <ChatBubbleBottomCenterIcon className="w-6 h-6" />
          <p>{post.comment_count || ""}</p>
        </div>
      </div>
    </div>
  );
}
