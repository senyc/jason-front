import Dropdown from "@/src/lib/components/dropdown";
import AccountAge from "./accountAge";

interface UserAccountDropdownProps {
  Logout: React.ReactNode;
  AccountPhoto: React.ReactNode;
  accountCreationDate: string;
  accountName?: string;
}
export default function UserAccountDropdown({ Logout, AccountPhoto, accountCreationDate, accountName }: UserAccountDropdownProps) {
  return (<Dropdown
    id="user-info"
    summary={
      <div
        className="flex h-full w-full flex-row items-center gap-1"
      >
        <div
          className="w-6"
        >
          {AccountPhoto}
        </div>
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
        <div
          className="w-10 rounded-md"
        >
          {AccountPhoto}
        </div>
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
