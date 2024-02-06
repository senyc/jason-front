interface AccountContentProps {
  profilePhoto: React.ReactNode;
  emailAddress: string;
  changeEmailAddress: () => void;
  deleteAccount: () => void;
}

export default function AccountContent({ profilePhoto, emailAddress, changeEmailAddress, deleteAccount }: AccountContentProps) {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 mt-4 w-full border-b-[.5px] border-gray-200 text-xl font-bold">
        Account Settings
      </h1>
      <ul>
        <li className="flex flex-col pb-4">
          <h2 className="mb-2 mt-3 border-b-[.5px] border-gray-200 pb-1 text-lg font-semibold">
            Photo
          </h2>
          <div className="flex flex-row gap-4">
            <div className="w-10 rounded-full">
              {profilePhoto}
            </div>
            <div className="flex flex-row gap-5">
              <button className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-gray-300  p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-200">
                Change Profile Photo
              </button>
              <button className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-red-300 p-2 text-center text-sm font-normal text-red-400 transition duration-75 ease-in hover:bg-red-100">
                Delete Profile Photo
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
                className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-gray-300  p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-200">
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
              <p className="font-md italic text-red-500">
                This action is immediate and not recoverable
              </p>
            </div>
            <div>
              <button
                className="min-w-10 rounded-sm border-[.5px] border-red-500 p-2 text-center text-sm font-normal text-red-500 transition duration-75 ease-in hover:bg-red-200"
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </li>
      </ul>
    </ div>
  );
}
