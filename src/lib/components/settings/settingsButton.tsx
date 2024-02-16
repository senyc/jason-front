import { useEffect, useRef } from "react";
import { Settings } from "react-feather";

export default function SettingsButton() {
  const myModalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    myModalRef.current = document.getElementById('my_modal_2') as HTMLDialogElement;
  }, []);

  return (
    <>
      <li className={`transition duration-75 ease-in hover:bg-gray-200 dark:hover:bg-gray-500 mb-[2px]`}>
        <button
          className={`w-full flex flex-row items-center justify-between px-4 py-1 text-sm`}
          onClick={() => myModalRef.current?.showModal()}
        >{"Settings"}
          <Settings
            size={19}
          />
        </button>
      </li >
    </>
  );
}
