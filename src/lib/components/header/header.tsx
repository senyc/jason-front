import HeaderLink from "./headerLink";
import Image from "next/image";
import Logo from "/public/jasonLogo.png";
import ProfileDropdown from "./profile/profileDropdown";
export default function Header() {
  return (
    <nav className="mb-8 h-14 w-full flex-row items-center border-b-[.1px] border-gray-200">
      <ul className="mx-auto flex h-full w-6/12 flex-row items-center justify-start gap-10">
        <li>
          <Image quality={100} width="35" src={Logo} alt="" />
        </li>
        <div className="w-12" />
        <li>
          <HeaderLink
            href="docs"
            label="Docs"
            size='sm'
          />
        </li>
        <li>
          <HeaderLink
            href="blog"
            label="Blog"
            size='sm'
          />
        </li>
        <li>
          <HeaderLink
            href="tasks"
            label="Tasks"
            size='sm'
          />
        </li>
        <li className="ml-auto self-center">
          <ProfileDropdown />
        </li>
      </ul>
    </nav >

  );
}
