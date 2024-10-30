import { IUser } from "@/lib/auth";
import Image from "next/image";

interface UserInfoProps {
  user?: IUser | null;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Image
        src={user?.profile_image || "/images/default-profile.jpg"}
        alt="Profile Image"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-col hidden lg:block">
        <h2 className="text-md font-bold lg:text-left">{user?.nickname}</h2>
        <p className="text-xs text-gray-400 lg:text-left">{user?.email}</p>
      </div>
    </div>
  );
}
