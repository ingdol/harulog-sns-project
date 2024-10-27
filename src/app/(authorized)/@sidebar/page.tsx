"use client";
import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  DocumentPlusIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import Logo from "@/components/Logo";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useEffect } from "react";

const menuItems = [
  {
    label: "Home",
    href: "/",
    icon: <HomeIcon className="w-7 h-7" />,
  },
  {
    label: "Messages",
    href: "/Messages",
    icon: <ChatBubbleLeftRightIcon className="w-7 h-7" />,
  },
  {
    label: "My Profile",
    href: "/profile",
    icon: <UserIcon className="w-7 h-7" />,
  },
];

export default function Sidebar() {
  const checkLoginStatus = useAuthStore((state) => state.checkLoginStatus);
  const { user } = useAuthStore();
  console.log("Sidebar user:", user);
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);
  return (
    <div className="flex flex-col justify-between items-center h-full lg:items-start">
      <div>
        <Link href="/" className="hidden items-center gap-1 lg:flex">
          <Logo />
        </Link>

        <div className="flex items-center gap-2 lg:mt-10 lg:items-start">
          <Image
            src="/images/default-profile.jpg"
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full mb-2"
          />
          <div className="flex-col hidden lg:block">
            <h2 className="text-md font-bold lg:text-left">{user?.nickname}</h2>
            <p className="text-xs text-gray-400 lg:text-left">{user?.email}</p>
          </div>
        </div>

        <div className="mt-10 lg:pl-2 flex flex-col gap-5 items-center lg:items-start">
          <Link
            href="/search"
            className="flex items-center justify-center lg:justify-start gap-4 bg-slate-100 w-9 h-9 rounded-md text-gray-400 lg:hidden"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-600" />
          </Link>
          {menuItems.map((menu) => (
            <Link
              key={menu.label}
              href={menu.href}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-400 py-2 hover:text-cyan-600 active:text-cyan-700 transition-colors"
            >
              {menu.icon}
              <span className="hidden lg:block">{menu.label}</span>
            </Link>
          ))}

          <button className="hidden lg:flex mt-4 items-center w-fit gap-4 text-white bg-cyan-600 lg:py-2 lg:px-4 rounded-md hover:bg-cyan-700 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>하루 기록</span>
          </button>

          <Link
            href="/"
            className="lg:hidden flex items-center justify-center lg:justify-start gap-4 text-gray-400 py-2 hover:text-cyan-600 active:text-cyan-700 transition-colors"
          >
            <DocumentPlusIcon className="w-7 h-7" />
          </Link>
        </div>
      </div>

      <form
        action="/auth/signout"
        method="post"
        className="flex items-center justify-center lg:justify-start gap-4 text-gray-400 py-2 hover:text-cyan-600 active:text-cyan-700 transition-colors"
      >
        <ArrowLeftStartOnRectangleIcon className="w-7 h-7" />
        <button className="hidden lg:block" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
