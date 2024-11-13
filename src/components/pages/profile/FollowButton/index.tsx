"use client";
import {
  useFetchFollowingStatus,
  useFollowUser,
  useUnfollowUser,
} from "@/services/follow/hooks";
import { useState } from "react";

export default function FollowButton({ profileId }: { profileId: string }) {
  const { data } = useFetchFollowingStatus(profileId);
  const [isFollowing, setFollowing] = useState(data?.isFollowing);

  const { mutateAsync: followUserMutate } = useFollowUser();
  const { mutateAsync: unfollowUserMutate } = useUnfollowUser();

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowUserMutate(profileId);
      setFollowing(false);
    } else {
      followUserMutate(profileId);
      setFollowing(true);
    }
  };

  return (
    <button
      className={`${
        isFollowing
          ? "bg-gray-300 hover:bg-gray-400 text-black"
          : "bg-cyan-600 hover:bg-cyan-700 text-white"
      } px-4 py-1 rounded-md`}
      onClick={handleFollowToggle}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </button>
  );
}
