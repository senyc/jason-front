import HeaderLink from "./headerLink";
import Image from "next/image";
import Logo from "/public/jason.svg";
import ProfileDropdown from "./profile/profileDropdown";
export default function Header() {
  return (
    <nav className="mb-8 h-14 w-full flex-row items-center">
      <ul className="mx-auto flex h-full w-6/12 flex-row items-center justify-start gap-6">
        <li>
          <Image height="26" quality={100} src={Logo} alt="" />
        </li>
        <li>
        </li>
        <li className="ml-auto self-center">
          <ProfileDropdown />
        </li>
      </ul>
    </nav >

  );
}
