'use server';
import LogoutButton from "@/src/lib/components/logoutButton";
import SidebarContents from "./sidebarContents";
import { getCurrentEmailAddress, getAccountAge } from "./actions";

export default async function Sidebar() {
  return (
    <SidebarContents
      accountCreationDate={await getAccountAge()}
      LogOut={<LogoutButton />}
      AccountPhoto={
        <img className="rounded-md" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      }
      accountName={await getCurrentEmailAddress()}
    />
  );
}
