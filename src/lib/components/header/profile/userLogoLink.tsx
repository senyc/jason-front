import { ReactNode } from "react";

interface UserLogoLinkProps {
  label: string,
  href?: string,
  icon?: ReactNode,
  highlight?: boolean,
}
export default function UserLogoLink({ label, href, icon, highlight = true }: UserLogoLinkProps) {
  return (
    <li className={`h-full w-full transition duration-75 ease-in ${!!highlight && "hover:bg-gray-100"} hover:text-gray-900`}>
      <a
        className="flex flex-row items-center justify-between px-4 py-1 text-sm"
        href={href}
      >{label}
        {icon}
      </a>
    </li >
  );
}
