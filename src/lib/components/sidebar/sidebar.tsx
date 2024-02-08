'use server';
import LogoutButton from "@components/logoutButton";
import SidebarContents from "./sidebarContents";
import { getCurrentEmailAddress, getAccountAge, getProfilePhoto } from "./actions";

export default async function Sidebar() {
  return (
    <SidebarContents
      accountCreationDate={await getAccountAge()}
      LogOut={<LogoutButton />}
      profilePhotoSource={`/profile_photo_${await getProfilePhoto()}.jpg`}

      accountName={await getCurrentEmailAddress()}
    />
  );
}
