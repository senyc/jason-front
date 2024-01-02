import Link from "next/link";

interface HeaderLinkProps {
  size?: 'lg' | 'sm' | 'md' | 'xs' | 'xl'
  href: string;
  label: string;
  openInNewTab?: boolean;
  className?: string;
  underline?: boolean;
  onClick?: () => void;
}
export default function HeaderLink({ size = 'lg', href, label, openInNewTab = false, className = '', underline = true, onClick}: HeaderLinkProps) {
  return (
    <>
      <Link
        className={`text-${size} ${ underline && 'hover:underline'} ${className}`.replace('false','')}
        href={href}
        target={openInNewTab ? '_blank' : '_self'}
        onClick={onClick}
      >
        {label}
      </Link>
    </>
  );
}
