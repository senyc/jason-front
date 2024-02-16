'use client';
import { useState } from "react";
import SettingsContent from "@components/settings/settingsContent";
import { X } from "react-feather";

interface SettingsDialogProps {
  profilePhotoSource: string;
  emailAddress?: string;
}
export default function SettingsDialog({ profilePhotoSource, emailAddress }: SettingsDialogProps) {
  const [settingsDisplay, setSettingsDisplay] = useState("account");

  return (
    <dialog id="my_modal_2" className="modal z-30 h-full w-full bg-[#0000] transition-none backdrop:opacity-50">
      <div className="modal-box relative h-full max-h-full w-full max-w-full p-3 md:h-5/6 md:w-5/6 lg:h-4/6 lg:w-4/6 xl:h-[40%] xl:max-w-6xl ">
        <form method="dialog">
          <button
            className="absolute right-5 top-5"
          >
            <X
              size={17}
            />
          </button>
        </form>
        <div className="flex h-full flex-col lg:flex-row">
          <ul className="flex flex-row border-gray-200 pr-3 lg:flex-col lg:border-r-[.5px]">
            <li className="">
              <button
                className="mx-2 my-1.5 h-10 w-full "
                onClick={() => setSettingsDisplay("account")}
              >
                <p className="">
                  User Settings
                </p>
              </button>
            </li>
            <div className="border-r-[.5px] border-gray-200 px-2 py-1.5 lg:border-b-[.5px] lg:border-r-[0px]" />
            <li className="">
              <button
                className="mx-2 my-1.5 h-10 w-full"
                onClick={() => setSettingsDisplay("developer")}
              >
                <p className="hidden lg:block">
                  Developer Settings
                </p>
                <p className="block lg:hidden">
                  Dev Settings
                </p>
              </button>
            </li>

            {/*              <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
              <li className="">
                <button
                  className="h-10 w-full"
                  onClick={() => setSettingsDisplay("display")}
                >
                  <p>
                    Display settings
                  </p>
                </button>
              </li>
              <li className="h-48">
              </li> */}
          </ul>
          <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
          <SettingsContent
            emailAddress={emailAddress}
            profilePhotoSource={profilePhotoSource}
            settingsDisplay={settingsDisplay}
            setSettingsDisplay={setSettingsDisplay}
          />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          className="cursor-default"
        >close</button>
      </form>
    </dialog >
  );
}
