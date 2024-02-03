interface SettingsContentProps {
  profilePhoto: React.ReactNode;
  settingsDisplay: string;
  emailAddress?: string;
}

export default function SettingsContent({ settingsDisplay, emailAddress, profilePhoto }: SettingsContentProps) {
  return (
    <div className="h-full w-full">
      {settingsDisplay === "account" && (
        <div className="flex flex-col">
          <h1 className="mb-4 mt-4 w-full border-b-[.5px] border-gray-200 text-xl font-bold">
            Account Settings
          </h1>
          <ul>
            <li className="flex flex-col">
              <h2 className="mb-2">
                Photo
              </h2>
              <div className="flex flex-row gap-4">
                <div className="w-10 rounded-full">
                  {profilePhoto}
                </div>
                <div className="flex flex-row gap-5">
                  <button className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-gray-300  p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-200">
                    Delete Profile Photo
                  </button>
                  <button className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-gray-300  p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-200">
                    Change Profile Photo
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </ div>

      )}
      {settingsDisplay === "developer" && (
        <>
        </>
      )}
      {settingsDisplay === "display" && (
        <>
        </>
      )}
    </div>
  );
}
