import { IProfile } from "@/lib/profile";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import Image from "next/image";

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
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1 rounded-md">
              Following
            </button>
          )}
        </div>
        <div className="flex gap-12">
          <div>
            <span className="font-semibold mr-2">{data?.feeds?.length}</span>
            <span>potos</span>
          </div>
          <div>
            <span className="font-semibold mr-2">0</span>
            <span>followers</span>
          </div>
          <div>
            <span className="font-semibold mr-2">0</span>
            <span>following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
