import { Icon } from "react-feather";

interface UserLogoLinkProps {
  label: string,
  href?: string,
  Icon: Icon,
  highlight?: boolean,
  onPage?: boolean,
}
export default function MenuLink({ label, href, Icon, highlight = true, onPage = false }: UserLogoLinkProps) {
  const highlightColor = highlight && onPage ? 'bg-gray-300' : 'bg-gray-200'
  const darkHighlightColor = highlight && onPage ? 'bg-gray-500' : 'bg-gray-500'
  return (
    <li className={`h-full w-full transition duration-75 ease-in ${!!onPage && 'bg-gray-200 dark:bg-gray-500' } ${!!highlight && `dark:hover:${darkHighlightColor} hover:${highlightColor}`} mb-[2px]`}>
      <a
        className={`${onPage && 'font-bold'} flex flex-row items-center justify-between px-4 py-1 text-sm`}
        href={href}
      >{label}
        <Icon
          size={19}
        />
      </a>
    </li >
  );
}
