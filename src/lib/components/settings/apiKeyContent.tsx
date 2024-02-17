import { useEffect, useState } from "react";
import { revokeAllApiKeys } from "./actions";
import ApiKeyDisplay from "./apiKeyDisplay";
import notifyFailure from "../../actions/notifyFailure";
import notifySuccess from "../../actions/notifySuccess";

interface ApiKeyContentProps {
  generateNewApiKey: () => void;
}

export default function ApiKeyContent({ generateNewApiKey }: ApiKeyContentProps) {
  const [apiKeyRevokeRequest, setApiKeyRevokeRequest] = useState({ message: "", state: "" });

  useEffect(() => {
    if (apiKeyRevokeRequest.state == "failure") {
      notifyFailure(apiKeyRevokeRequest.message);
    } else if (apiKeyRevokeRequest.state == "success") {
      notifySuccess(apiKeyRevokeRequest.message);
    }
  }, [apiKeyRevokeRequest]);

  return (
    <div className="flex flex-col pr-3">
      <h1 className="mb-4 mt-4 border-b-[.5px] border-gray-200 pb-2 text-xl font-bold">
        Developer Settings
      </h1>
      <div className="flex flex-row justify-between border-b-[.5px] border-gray-200 pb-2">
        <button
          onClick={generateNewApiKey}
          className="min-w-10 mb-[2px] rounded-lg border-[.5px] border-gray-200  p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700">
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
        <ApiKeyDisplay />
      </ul>
    </div>
  );
};
