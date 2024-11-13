import {
  useAddLike,
  useFetchLikeStatus,
  useRemoveLike,
} from "@/lib/like/hooks";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  feedId: number;
  initialLikeCount: number;
}

export default function LikeButton({
  feedId,
  initialLikeCount,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const addLike = useAddLike(feedId);
  const removeLike = useRemoveLike(feedId);

  const handleLikeToggle = () => {
    if (isLiked) {
      removeLike.mutate();
      setLikeCount((prev) => prev - 1);
    } else {
      addLike.mutate();
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const { data: likeStatusData } = useFetchLikeStatus(feedId);

  useEffect(() => {
    if (likeStatusData) {
      setIsLiked(likeStatusData.isLiked);
    }
  }, [likeStatusData]);

  return (
    <button onClick={handleLikeToggle} className="flex items-center gap-1">
      {isLiked ? (
        <SolidHeartIcon className="w-6 h-6 text-red-500" />
      ) : (
        <OutlineHeartIcon className="w-6 h-6 text-gray-500" />
      )}
      <span className="text-sm text-gray-500">{likeCount || ""}</span>
    </button>
  );
}
