import Link from "next/link";

interface HeaderLinkProps {
  href: string;
  label: string;
  openInNewTab?: boolean;
  className?: string;
  underline?: boolean;
  onClick?: () => void;
}
export default function HeaderLink({ href, label, openInNewTab = false, className = '', underline = true, onClick}: HeaderLinkProps) {
  return (
    <>
      <Link
        className={`text-lg ${ underline && 'hover:underline'} ${className}`.replace('false','')}
        href={href}
        target={openInNewTab ? '_blank' : '_self'}
        onClick={onClick}
      >
        {label}
      </Link>
    </>
  );
}
