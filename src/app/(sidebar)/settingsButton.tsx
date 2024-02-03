import { Settings } from "react-feather";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import SettingsContent from "./settingsContent";


interface SettingsButtonProps {
  profilePhoto: React.ReactNode;
  emailAddress?: string;
}

export default function SettingsButton({ profilePhoto, emailAddress }: SettingsButtonProps) {
  const [showSettingsFloat, setShowSettingsFloat] = useState(false);
  const pathName = usePathname();

  return (
    <>
      <li className={`h-full w-full transition duration-75 ease-in hover:bg-gray-200 mb-[2px]`}>
        <button
          className={`h-full w-full flex flex-row items-center justify-between px-4 py-1 text-sm`}
          onClick={() => document.getElementById('my_modal_2').showModal()}
        >{"Settings"}
          <Settings
            color={"black"}
            size={19}
          />
        </button>
      </li >
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box min-h-96 max-w-6xl ">
          <div className="flex h-full flex-row">
            <ul className="flex h-full w-3/12 flex-col border-r-[.5px] border-gray-200 pr-3">
              <li className="">
                <button className="h-10 w-full">
                  <p>
                    Account settings
                  </p>
                </button>
              </li>
              <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
              <li className="">
                <button className="h-10 w-full">
                  <p>
                    Developer settings
                  </p>
                </button>
              </li>

              <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
              <li className="">
                <button className="h-10 w-full">
                  <p>
                    Display settings
                  </p>
                </button>
              </li>
              <li className="h-48">
              </li>
            </ul>
            <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
            <SettingsContent
              emailAddress={emailAddress}
              profilePhoto={profilePhoto}
              settingsDisplay="account"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
