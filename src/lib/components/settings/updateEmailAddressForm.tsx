import { changeEmailAddress } from "./actions";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const initialState = {
  status: "",
  message: "",
};

interface UpdateEmailAddressProps {
  cancelAction: () => void;
}

export default function UpdateEmailAddress({ cancelAction }: UpdateEmailAddressProps) {
  const [newEmail, setNewEmail] = useState("");
  const [changeEmailState, formAction] = useFormState(changeEmailAddress, initialState);

  const notifyFailure = (message: string) => toast.error(message);
  const notifySuccess = (message: string) => toast.success(message);

  const router = useRouter();
  useEffect(() => {
    if (changeEmailState.status == "failure") {
      notifyFailure(changeEmailState.message);
    } else if (changeEmailState.status == "success") {
      notifySuccess("Successfully changed email address");
      cancelAction();
      router.refresh();
    }
  }, [changeEmailState]);

  return (
    <div>
      <h2 className="font-sembold border-b-[.5px] border-gray-200 text-xl">
        Update Email address
      </h2>
      <form
        action={formAction}
        className="flex flex-col"
      >
        <div className="mb-3 mt-3 flex flex-col">
          <label
            className="text-md mb-1 font-semibold"
            htmlFor="input-label"
          >
            New Email
          </label>
          <input
            className="input input-borderd max-w-72 text-md h-7 rounded-sm border-gray-200 focus:outline-none"
            required
            id="input-label"
            name="newEmail"
            autoFocus
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            type="email"
            placeholder="New Email"
          />
        </div>
        <div className="mt-5 flex flex-row items-center justify-between border-t-[.5px] border-gray-200 pt-2">
          <button
            className="min-w-36 rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 enabled:dark:hover:bg-gray-700"
            type="submit"
            disabled={newEmail.length == 0}
          >Change Email Address</button>
          <button
            className=" max-w-36 rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700"
            type="button"
            onClick={cancelAction}
          >Cancel</button>
        </div>
      </form>
    </div>
  );

}
