import HeaderLink from "@components/headerLink";
export default function Header() {
  return (
    <nav className=' flex w-full flex-row items-center justify-start gap-48'>
      <HeaderLink
        href="docs"
        label="api"
      />
      <HeaderLink
        href="blog"
        label="blog"
      />
      <HeaderLink
        href="tasks"
        label="tasks"
      />
    </nav>

  );
}
