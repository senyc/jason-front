import Image from "next/image";
import OutsideClickHandler from "react-outside-click-handler";
import { setNewProfilePhoto } from "./actions";
import { useRouter } from "next/navigation";


export default function ChangePhoto() {
  const router = useRouter()
  const toggleOpen = () => {
    document.getElementById("profile-photo-picker")?.removeAttribute("open");
  };


  return (
    <OutsideClickHandler
      onOutsideClick={toggleOpen}
    >
      <details
        id="profile-photo-picker"
        className="dropdown dropdown-down"
      >
        <summary
          role="button"
          className="min-w-10 mb-[2px] h-10 list-none rounded-lg border-[.5px] border-gray-300 p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-200"
        >
          <p className="select-none">
            Change Photo
          </p>
        </summary>
        <div
          className="bg-base-100 dropdown-content absolute grid h-72 w-72 grid-cols-3 gap-2 border-black pl-2 shadow"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8,9].map(imageNum => {
            const action = setNewProfilePhoto.bind(null, imageNum);
            return (
              <button
                key={`profile-photo-picker-${imageNum}`}
                type="button"
                className="transition duration-75 ease-in hover:scale-105"
                onClick={async () => {
                  await action();
                  router.refresh()
                }}
              >
                <Image
                  quality={100}
                  className="rounded-full"
                  width={80}
                  height={80}
                  src={`/profile_photo_${imageNum}.jpg`}
                  alt="profile photo"
                />
              </button>
            );
          })}
        </div>
      </details>
    </OutsideClickHandler >
  );
}
