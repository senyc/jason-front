import { Dispatch, SetStateAction } from "react";
import ApiKeyContent from "./apiKeyContent";
import GenerateNewApiKey from "./generateNewApiKey";
import UpdateEmailAddress from "./updateEmailAddressForm";
import DeleteAccount from "./deleteAccount";
import AccountContent from "./accountContent";

interface SettingsContentProps {
  profilePhotoSource: string;
  settingsDisplay: string;
  emailAddress?: string;
  setSettingsDisplay: Dispatch<SetStateAction<string>>;
}


export default function SettingsContent({ setSettingsDisplay, settingsDisplay, emailAddress, profilePhotoSource }: SettingsContentProps) {
  return (
    <div className="w-full overflow-scroll">
      {settingsDisplay === "account" && (
        <AccountContent
          profilePhotoSource={profilePhotoSource}
          emailAddress={emailAddress as string}
          deleteAccount={() => setSettingsDisplay("deleteAccount")}
          changeEmailAddress={() => setSettingsDisplay("updateemail")}
        />
      )}
      {settingsDisplay === "developer" && (
        <ApiKeyContent
          generateNewApiKey={() => setSettingsDisplay("newapikey")}
        />
      )}
      {settingsDisplay === "display" && (
        <>
        </>
      )}
      {settingsDisplay === "newapikey" && (
        <GenerateNewApiKey
          cancelAction={() => setSettingsDisplay("developer")}
        />
      )}
      {settingsDisplay === "updateemail" && (
        <UpdateEmailAddress
          cancelAction={() => setSettingsDisplay("account")}
        />
      )}
      {settingsDisplay === "deleteAccount" && (
        <DeleteAccount
          emailAddress={emailAddress as string}
          cancelAction={() => setSettingsDisplay("account")}
        />
      )}
    </div>
  );
}
