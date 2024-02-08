import Dropdown from "@/src/lib/components/dropdown";
import AccountAge from "./accountAge";
import Image from "next/image";

interface UserAccountDropdownProps {
  Logout: React.ReactNode;
  profilePhotoSource: string;
  accountCreationDate: string;
  accountName?: string;
}
export default function UserAccountDropdown({ Logout, profilePhotoSource, accountCreationDate, accountName }: UserAccountDropdownProps) {
  return (<Dropdown
    id="user-info"
    summary={
      <div
        className="flex h-full w-full flex-row items-center gap-1"
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
      </div>}
  >
    <div
      className="dropdown-content bg-light-header absolute mt-2 w-[17rem] rounded-md shadow"
    >
      <div
        className="m-2 flex flex-row gap-1"
      >
        <Image
          quality={100}
          className="rounded-md"
          alt="user profile photo"
          src={profilePhotoSource}
          width={30}
          height={45}
        />
        <div
          className="flex h-full w-full flex-col"
        >
          <div className="bg-light-header max-w-48 select-none text-xs font-semibold">
            {accountName}
          </div>
          <div
            className="flex flex-row gap-1"
          >
            <p
              className="list-disc text-xs opacity-60"
            >
              <AccountAge
                accountAge={accountCreationDate}
              />
            </p>
          </div>
        </div>
      </div>
      <div
        className="mx-2 my-1.5 border-b-[.5px] border-gray-200"
      />
      {Logout}
    </div>
  </Dropdown>
  );

}
