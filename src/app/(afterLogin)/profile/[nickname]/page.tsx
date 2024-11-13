"use client";
import { ProfileFeedList, ProfileInfo } from "@/components/pages/profile";
import { useUserProfile } from "@/services/profile/hooks";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams() as { nickname: string };
  const nickname = params?.nickname;
  const { data } = useUserProfile(nickname);
  return (
    <div className="flex-grow p-10 max-w-screen-lg">
      <ProfileInfo nickname={nickname} data={data} />
      <ProfileFeedList feeds={data?.feeds} />
    </div>
  );
}
