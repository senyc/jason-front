import HeaderLink from "@components/headerLink";
import Image from "next/image";
import Logo from "../../../public/jasonLogo.png";
import LogoMenu from "./logoMenu";
export default function Header() {
  return (
    <nav className="bg-base-200 mb-8 h-12 w-full flex-row items-center">
      <div className="mx-auto flex h-full w-6/12 flex-row items-center justify-start gap-10">
        <Image quality={100} width="35" src={Logo} alt="" />
        <div className="w-12" />
        <HeaderLink
          href="docs"
          label="Docs"
        />
        <HeaderLink
          href="blog"
          label="Blog"
        />
        <HeaderLink
          href="tasks"
          label="Tasks"
        />
        <div className="ml-auto">
          <LogoMenu />
        </div>
      </div>
    </nav >

  );
}
