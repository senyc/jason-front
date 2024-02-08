import Image from "next/image";

interface SidebarPopupProps {
  profilePhotoSource: string;
  accountName?: string;
}

export default function PopupHeader({ profilePhotoSource, accountName }: SidebarPopupProps) {
  return (<div
    className="flex w-full flex-row items-center gap-1"
  >
    <Image
      quality={100}
      className="rounded-md"
      alt="user profile photo"
      src={profilePhotoSource}
      width={25}
      height={35}
    />
    <div className="bg-light-header max-w-48 select-none text-xs font-semibold">
      {accountName}
    </div>
  </div >
  );
}
