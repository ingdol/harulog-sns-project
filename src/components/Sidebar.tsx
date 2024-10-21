import {
  HomeRounded,
  ForumRounded,
  PersonRounded,
  Add,
  LogoutRounded,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
const menuItems = [
  {
    label: "Home",
    icon: <HomeRounded className="text-2xl mb-2" />,
  },
  {
    label: "Messages",
    icon: <ForumRounded className="text-2xl mb-2" />,
  },
  {
    label: "My Profile",
    icon: <PersonRounded className="text-2xl mb-2" />,
  },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <span className="hidden lg:block font-bold">Harulog</span>
        </Link>
        <div className="flex items-center gap-2 mt-8 lg:items-start">
          <Image
            src="/defaultProfile.jpg"
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full mb-2"
          />
          <div className="flex-col hidden lg:block">
            <h2 className="text-md font-bold lg:text-left">Duck UI</h2>
            <p className="text-xs text-gray-500 lg:text-left">
              Duckui@demo.com
            </p>
          </div>
        </div>

        <div className="mt-8">
          {menuItems.map((menu) => (
            <Link
              key={menu.label}
              href="/"
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 px-4 rounded-md hover:bg-lamaSkyLight"
            >
              {menu.icon}
              <span className="hidden lg:block">{menu.label}</span>
            </Link>
          ))}

          <button className="mt-4 flex items-center justify-center lg:justify-start gap-4 text-white bg-purple-500 py-2 px-4 rounded-md hover:bg-purple-700">
            <Add className="text-2xl" />
            <span className="hidden lg:block">New Post</span>
          </button>
        </div>
      </div>
      <Link
        href="/"
        className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 px-4 rounded-md hover:bg-lamaSkyLight"
      >
        <LogoutRounded className="text-2xl" />
        <span className="hidden lg:block">Logout</span>
      </Link>
    </div>
  );
}
