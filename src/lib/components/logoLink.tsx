interface LogoLinkProps {
  label: string,
  href: string,
}
export default function LogoLink({ label, href }: LogoLinkProps) {
  return (
    <a
      className=""
      href={href}
    >{label}
    </a>

  );
}
