import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { generateNewApiKeyFormAction, revokeAllApiKeys, revokeApiKey } from "./actions";
import TextareaAutosize from "react-textarea-autosize";
import FormDropdown from "@/src/lib/components/formDropdown";
import ApiKeyDisplay from "./apiKeyDisplay";
import { Check, Copy } from "react-feather";
import notifyFailure from "../../actions/notifyFailure";
import notifyInfo from "../../actions/notifyInfo";
import notifySuccess from "../../actions/notifySuccess";

const initialState = {
  status: "",
  message: "",
  res: undefined
};

interface GenerateNewApiKeyProps {
  cancelAction: () => void;
}

export default function GenerateNewApiKey({ cancelAction }: GenerateNewApiKeyProps) {
  //@ts-ignore
  const [newApiKeyState, formAction] = useFormState(generateNewApiKeyFormAction, initialState);
  const [showNewKeyPage, setShowNewKeyPage] = useState(false);

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [expiration, setExpiration] = useState("1");


  const [apiKeyRevokeRequest, setApiKeyRevokeRequest] = useState({ message: "", state: "" });

  const addMonthsToDate = (x: number) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + x);
    return currentDate;
  };

  const generateAnotherKey = () => {
    setLabel("");
    setDescription("");
    setExpiration("");
    setShowNewKeyPage(false);
  };

  useEffect(() => {
    if (apiKeyRevokeRequest.state == "failure") {
      notifyFailure(apiKeyRevokeRequest.message);
    } else if (apiKeyRevokeRequest.state == "success") {
      notifySuccess(apiKeyRevokeRequest.message);
      cancelAction();
    }
  }, [apiKeyRevokeRequest]);

  useEffect(() => {
    if (newApiKeyState.status == "failure") {
      notifyFailure(newApiKeyState.message);
    } else if (newApiKeyState.status == "success") {
      setShowNewKeyPage(true);

    }
  }, [newApiKeyState]);
  return !showNewKeyPage ? (
    <div>
      <h2 className="font-sembold border-b-[.5px] border-gray-200 text-xl">
        Generate New api key
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
            Token name
          </label>
          <input
            className="input input-borderd max-w-72 text-md h-7 rounded-sm border-gray-200 focus:outline-none"
            required
            id="input-label"
            name="label"
            autoFocus
            value={label}
            onChange={e => setLabel(e.target.value)}
            type="text"
            placeholder="New Label"
          />
          <p className="text-sm text-gray-600">
            A unique identifier for this token.
          </p>
        </div>
        <div className="mb-3 mt-1 flex flex-col">
          <label
            className="text-md mb-1 font-semibold"
            htmlFor="textarea-description"
          >
            Token Description
          </label>
          <TextareaAutosize
            id="textarea-description"
            name="description"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="input input-bordered max-w-96 text-md min-h-7 my-auto resize-none overflow-y-auto overflow-x-hidden rounded-sm border-gray-200 focus:outline-none"
          />
          <p className="text-sm text-gray-600">
            A brief description for what this token is going to be used for.
          </p>
        </div>
        <div
          className="mb-3 flex flex-col"
        >
          <label
            className="text-md mb-1 font-semibold"
            htmlFor="date-expiration"
          >
            Expiration Date
          </label>

          <input
            name="expiration"
            type="hidden"
            value={addMonthsToDate(Number(expiration)).toISOString().substring(0, 10)}
          />
          <FormDropdown
            id="newTaskPriorityDropdown"
            selectedValue={expiration}
            setSelectedValue={setExpiration}
            defaultValue={"1"}
            options={[
              { label: "30 days", value: "1" },
              { label: "60 days", value: "2" },
              { label: "90 days", value: "3" },
              { label: "120 days", value: "4" },
            ]}
          />
          {/*<input
            className="max-w-36 rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 focus:outline-none"
            id="date-expiration"
            value={expiration}
            onChange={e => setExpiration(e.target.value)}
            type="date"
            name="expiration"
          /> */}
          <p className="text-sm text-gray-600">
            The duration that this key will function in your application
          </p>
        </div>
        <div className="mt-5 flex flex-row items-center justify-between border-t-[.5px] border-gray-200 pt-2">
          <button
            className="max-w-26 rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700 enabled:dark:hover:bg-gray-700"
            type="submit"
            disabled={label.length == 0}
          >Generate new key</button>
          <button
            className=" max-w-36 rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700"
            type="button"
            onClick={cancelAction}
          >Cancel</button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex flex-col pr-3">
      <h1 className="mb-4 mt-4 w-full border-b-[.5px] border-gray-200 pb-2 text-xl font-bold">
        Developer Settings
      </h1>
      <div
        role="alert"
        className=" alert alert-info mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
          </path>
        </svg>
        <span>Make sure to copy your access token now, you won't be able to see it again.</span>
      </div>
      <div className="flex flex-row justify-between border-b-[.5px] border-gray-200 pb-2">
        <button
          onClick={generateAnotherKey}
          className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-gray-300  p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700">
          Generate new key
        </button>
        <button
          className="min-w-10 mb-[2px] h-10 rounded-lg border-[.5px] border-red-500 p-2 text-center text-sm font-semibold text-red-400 transition duration-75 ease-in hover:bg-red-400 hover:text-white"
          onClick={async () => setApiKeyRevokeRequest(await revokeAllApiKeys())}
        >
          Revoke all keys
        </button>
      </div>
      <ul>
        <li className="mt-3 ">
          <div className="flex flex-col rounded-lg border-[.5px] border-gray-200 bg-green-200 p-2">
            <div className="flex flex-row items-center justify-between">
              <div className=" flex flex-row items-center gap-1 ">
                <Check
                  color="green"
                  size={17}
                />
                <h3 className="text-gray-600">
                  {newApiKeyState.res?.apikey}
                </h3>
                <button
                  onClick={() => {
                    notifyInfo("copied to clipboard");
                    navigator.clipboard.writeText(newApiKeyState.res?.apikey as string);
                  }}
                  className="">
                  <Copy
                    size={15}
                    color="#338ba8"
                  />
                </button>
              </div>
              <button
                className="min-w-10 mb-[2px] h-10 rounded-lg border-[.5px] border-red-500 p-2 text-center text-sm font-semibold text-red-400 transition duration-75 ease-in hover:bg-red-400 hover:text-white"
                onClick={async () => setApiKeyRevokeRequest(await revokeApiKey(newApiKeyState.res?.id as any))}
              >
                Revoke
              </button>
            </div>
          </div>
        </li>
        <ApiKeyDisplay
          hideKeyId={newApiKeyState.res?.id}
        />
      </ul>
    </div>
  );
}
