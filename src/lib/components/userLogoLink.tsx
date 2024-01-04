import { ReactNode } from "react";

interface UserLogoLinkProps {
  label: string,
  href?: string,
  icon?: ReactNode;
}
export default function UserLogoLink({ label, href, icon }: UserLogoLinkProps) {
  return (
    <li className="flex h-full w-full flex-row items-center justify-between px-4 py-1 transition duration-75 ease-in hover:bg-gray-100 hover:text-gray-900">
      <a
        className="text-sm"
        href={href}
      >{label}
      </a>
      {icon}
    </li>
  );
}