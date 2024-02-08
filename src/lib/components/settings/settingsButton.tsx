import { Settings } from "react-feather";
import { useEffect, useState } from "react";

import SettingsContent from "./settingsContent";

interface SettingsButtonProps {
  profilePhotoSource: string;
  emailAddress?: string;
}

export default function SettingsButton({ profilePhotoSource, emailAddress }: SettingsButtonProps) {
  const [settingsDisplay, setSettingsDisplay] = useState("account");
  // for dumb typescript
  let myModal: HTMLDialogElement | null = null;
  useEffect(() => {
    myModal = document.getElementById('my_modal_2') as HTMLDialogElement;
  }, []);

  return (
    <>
      <li className={`h-full w-full transition duration-75 ease-in hover:bg-gray-200 mb-[2px]`}>
        <button
          className={`h-full w-full flex flex-row items-center justify-between px-4 py-1 text-sm`}
          onClick={() => myModal != null && myModal.showModal()}
        >{"Settings"}
          <Settings
            color="black"
            size={19}
          />
        </button>
      </li >
      <dialog id="my_modal_2" className="modal z-30 bg-[#0000] transition-none backdrop:opacity-50">
        <div className="modal-box h-[40%] max-w-6xl p-3 ">
          <div className="flex h-full flex-row">
            <ul className="flex w-3/12 flex-col border-r-[.5px] border-gray-200 pr-3">
              <li className="">
                <button
                  className="h-10 w-full"
                  onClick={() => setSettingsDisplay("account")}
                >
                  <p>
                    Account settings
                  </p>
                </button>
              </li>
              <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
              <li className="">
                <button
                  className="h-10 w-full"
                  onClick={() => setSettingsDisplay("developer")}
                >
                  <p>
                    Developer settings
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
      </dialog>
    </>
  );
}
