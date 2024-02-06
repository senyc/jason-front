interface SidebarPopupProps {
  AccountPhoto: React.ReactNode;
  accountName?: string;
}

export default function PopupHeader({ AccountPhoto, accountName }: SidebarPopupProps) {
  return (<div
    className="flex w-full flex-row items-center gap-1"
  >
    <div
      className="w-6"
    >
      {AccountPhoto}
    </div>
    <div className="bg-light-header max-w-48 select-none text-xs font-semibold">
      {accountName}
    </div>
  </div>
  );
}
