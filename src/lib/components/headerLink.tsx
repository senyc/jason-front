import Link from "next/link";

interface HeaderLinkProps {
  size?: 'lg' | 'sm' | 'md' | 'xs' | 'xl'
  href: string;
  label: string;
  openInNewTab?: boolean;
  className?: string;
  onClick?: () => void;
}
export default function HeaderLink({ size = 'lg', href, label, openInNewTab = false, className = '',  onClick}: HeaderLinkProps) {
  return (
    <>
      <Link
        className={`text-${size} ${className} duration-150 ease-in transition hover:text-gray-900`}
        href={href}
        target={openInNewTab ? '_blank' : '_self'}
        onClick={onClick}
      >
        {label}
      </Link>
    </>
  );
}
