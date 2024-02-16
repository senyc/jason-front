'use client';
import { CheckCircle, ChevronsLeft, Home, Menu, Sidebar } from "react-feather";
import { usePathname } from 'next/navigation';
import { useState } from "react";

import MenuLink from "@/src/lib/components/menuLink";
import ThemeSwitcher from "@/src/lib/components/themeSwitcher";
import UserAccountDropdown from "./userAccountDropdown";
import PopupHeader from "./popupHeader";
import SettingsButton from "../settings/settingsButton";

interface TaskMenuProps {
  profilePhotoSource: string,
  LogOut: React.ReactNode;
  accountCreationDate: string;
  accountName?: string,
}

export default function SidebarContents({ accountName, profilePhotoSource, LogOut, accountCreationDate }: TaskMenuProps) {
  const [showSlideout, setShowSlideout] = useState(false);
  const [makeSidebar, setMakeSidebar] = useState(false);

  const pathName = usePathname();

  return (
    <section
      className={`${makeSidebar ? 'dark:bg-dark-header bg-light-header xs:min-w-64 min-h-full min-w-full translate-x-0 ' : 'lg:min-w-24 '} h-fit xs:h-full duration-300 transition-all delay-75 ease-in-out relative`}
      onMouseEnter={() => setShowSlideout(true)}
      onMouseLeave={() => setShowSlideout(false)}
    >
      <button className={`${makeSidebar && 'invisible z-30'} p-3`}
        onMouseEnter={() => setShowSlideout(true)}
        onClick={() => setMakeSidebar(prev => !prev)}
      > {showSlideout ? (
        <Sidebar />
      ) : (
        <Menu />
      )
        }
      </button>

      <nav
        className={`dark:bg-dark-header bg-light-header xs:duration-300 absolute xs:transition-all xs:delay-75 xs:ease-in-out ${showSlideout && !makeSidebar ? 'invisible sm:visible' : ''} ${(showSlideout || makeSidebar) || 'invisible -translate-x-full'} ${!makeSidebar ? 'min-w-64 -left-0 right-0 top-12' : 'xs:min-w-64 top-0 min-w-full '}`}
      >
        <ul className={`flex flex-col pb-1 w-full ${makeSidebar || 'rounded-md shadow'}`} >
          <li>
            <div
              className="mx-4 flex flex-row items-center justify-between gap-2 pt-4"
            >
              {makeSidebar ? (
                <UserAccountDropdown
                  accountName={accountName}
                  profilePhotoSource={profilePhotoSource}
                  accountCreationDate={accountCreationDate}
                  Logout={LogOut}
                />
              ) : (
                <PopupHeader
                  accountName={accountName}
                  profilePhotoSource={profilePhotoSource}
                />
              )}
              {(makeSidebar && (<button
                onClick={() => setMakeSidebar(prev => !prev)} >
                <ChevronsLeft
                  color="grey"
                />
              </button>
              ))}
            </div>
          </li>
          <div className="m-2 border-b-[.5px] border-gray-200" />
          <ThemeSwitcher />
          <SettingsButton />
          {makeSidebar && (
            <>
              <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
              <MenuLink
                href="/"
                label="Home"
                Icon={Home}
                onPage={pathName.includes("home")}
              />
              <MenuLink
                href="/tasks"
                label="Tasks"
                Icon={CheckCircle}
                onPage={pathName.includes("tasks")}
              />
            </>)
          }
          {makeSidebar && <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />}
        </ul>
      </nav>
    </section>
  );
}
