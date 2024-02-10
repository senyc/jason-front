'use client'

import { LogOut } from "react-feather";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { ACCESS_TOKEN_COOKIE_NAME } from "@/src/config/constants";

export default function LogoutButton() {
  const router = useRouter();
  const logout = () => {
    deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
    router.replace('/login');
  };
  return (
    <li className={`h-full w-full hover:bg-gray-100 dark:hover:bg-gray-500 justify-between px-4 py-1 transition duration-75 ease-in mb-[2px]`}>
      <button
        onClick={logout}
        className="flex h-full w-full flex-row items-center justify-between text-sm"
      >{"Log out"}
        <LogOut size={17} />
      </button>
    </li >
  );
}
