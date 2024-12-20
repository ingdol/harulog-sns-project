import { IProfile } from "@/services/profile";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import Image from "next/image";
import FollowButton from "../FollowButton";
import FollowStats from "../FollowStats";

export default function ProfileInfo({
  nickname,
  data,
}: {
  nickname: string;
  data: IProfile;
}) {
  const { user } = useAuthStore();
  const isOwner = nickname === user?.nickname;
  return (
    <div className="flex items-center">
      <div className="w-1/3 flex items-center justify-center">
        <div className="w-[150px] h-[150px] md:w-32 md:h-32 lg:w-[150px] lg:h-[150px]">
          <Image
            src={data?.info?.profile_image || "/images/default-profile.jpg"}
            alt="Profile Image"
            width={150}
            height={150}
            className="rounded-full"
            layout="responsive"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl">{data?.info?.nickname}</h1>

          {isOwner ? (
            <div>edit</div>
          ) : (
            <FollowButton profileId={data?.info?.id} />
          )}
        </div>
        <div className="flex gap-12">
          <div>
            <span className="mr-2">게시글</span>
            <span className="font-semibold">{data?.feeds?.length}</span>
          </div>
          <FollowStats profileId={data?.info?.id} />
        </div>
      </div>
    </div>
  );
}
