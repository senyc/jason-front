import Image from "next/image";
import ChangePhoto from './changePhoto';
import { setNewProfilePhoto } from "./actions";
import { useRouter } from "next/navigation";

interface AccountContentProps {
  profilePhotoSource: string;
  emailAddress: string;
  changeEmailAddress: () => void;
  deleteAccount: () => void;
}

export default function AccountContent({ profilePhotoSource, emailAddress, changeEmailAddress, deleteAccount }: AccountContentProps) {
  const router = useRouter();

  const action = setNewProfilePhoto.bind(null, 0);
  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-4 mt-4 w-full border-b-[.5px] border-gray-200 pb-2 text-xl font-bold">
        Account Settings
      </h1>
      <ul>
        <li className="flex flex-col pb-4">
          <h2 className="mb-2 mt-3 border-b-[.5px] border-gray-200 pb-1 text-lg font-semibold">
            Profile Photo
          </h2>
          <div className="flex flex-row gap-4">
            <Image
              quality={100}
              className="rounded-full"
              width={66}
              height={100}
              src={profilePhotoSource}
              alt="profile photo"
            />
            <div
              className="flex flex-row items-center gap-5">
              <ChangePhoto />
              <button
                className="min-w-10 mb-[2px] h-10 rounded-lg border-[.5px] border-red-500 p-2 text-center text-sm font-semibold text-red-400 transition duration-75 ease-in hover:bg-red-400 hover:text-white"
                type="button"
                onClick={async () => {
                  await action();
                  router.refresh();
                }}
              >
                Reset Photo
              </button>
            </div>
          </div>
        </li>
        <li className="flex flex-col">
          <h2 className="mb-1 mt-3 border-b-[.5px] border-gray-200 pb-1 text-lg font-semibold">
            Email Address
          </h2>
          <div className="flex flex-col gap-4">
            <div className="rounded-full">
              {emailAddress}
            </div>
            <div className="flex flex-row gap-5">
              <button
                onClick={changeEmailAddress}
                className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-gray-300  p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700">
                Change Email Address
              </button>
            </div>
          </div>
        </li>
        <li className="flex flex-col">
          <h2 className="mb-1 mt-3 border-b-[.5px] border-gray-200 pb-1 text-lg font-semibold">
            Delete Account
          </h2>
          <div className="flex flex-col gap-2">
            <div className="rounded-full">
            </div>
            <div>
              <button
                className="min-w-10 mb-[2px] h-10 rounded-lg border-[.5px] border-red-500 p-2 text-center text-sm font-semibold text-red-400 transition duration-75 ease-in hover:bg-red-400 hover:text-white"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
              <p className="font-md italic text-red-400">
                This action is immediate and not recoverable
              </p>
            </div>
          </div>
        </li>
      </ul>
    </ div>
  );
}
