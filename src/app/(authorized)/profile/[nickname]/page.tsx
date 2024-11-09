"use client";
import { IFeed } from "@/lib/feed";
import { useUserProfile } from "@/lib/profile/hooks";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { getImageUrl } from "@/utils/supabase/storage";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams() as { nickname: string };
  const nickname = params?.nickname;
  const { user } = useAuthStore();
  const isOwner = nickname === user?.nickname;
  const { data } = useUserProfile(nickname);
  console.log(nickname);
  return (
    <div className="flex-grow p-10 max-w-screen-lg">
      {isOwner ? (
        <div>
          <h1 className="text-2xl font-semibold">{data?.profile?.nickname}</h1>
          <button className="text-gray-500 mt-2">Edit Profile</button>
          <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6">
            {data?.feeds?.map((feed: IFeed) => (
              <div
                key={feed.id}
                className="w-full bg-gray-200 aspect-square relative"
              >
                <Image
                  src={getImageUrl(feed.feed_image)}
                  alt="Feed image"
                  priority
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">mkbhd</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Following
            </button>
          </div>
          <p className="text-gray-500">1,428 posts • 654 following</p>
          <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="w-full bg-gray-200 aspect-square" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
