'use server';
import LogoutButton from "@/src/lib/components/header/profile/logoutButton";
import SidebarContents from "./sidebarContents";
import { getCurrentEmailAddress } from "./actions";

export default async function Sidebar() {
  return (
    <SidebarContents
      LogOut={<LogoutButton />}
      AccountPhoto={
        <img className="rounded-md" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      }
      AccountName={<div className="bg-light-header max-w-48 select-none text-xs font-semibold"> {await getCurrentEmailAddress()} </div>
      }
    />
  );
}
