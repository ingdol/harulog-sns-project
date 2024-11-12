import { useFetchFollowCounts } from "@/lib/follow/hooks";

export default function FollowStats({ profileId }: { profileId: string }) {
  const { data } = useFetchFollowCounts(profileId);

  return (
    <>
      <div className="cursor-pointer">
        <span className="mr-2">팔로워</span>
        <span className="font-semibold">{data?.followerCount || 0}</span>
      </div>
      <div className="cursor-pointer">
        <span className="mr-2">팔로우</span>
        <span className="font-semibold">{data?.followingCount || 0}</span>
      </div>
    </>
  );
}
