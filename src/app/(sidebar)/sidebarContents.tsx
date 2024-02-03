'use client';
import { CheckCircle, ChevronsLeft, Home, Menu, Settings, Sidebar } from "react-feather";
import { usePathname } from 'next/navigation';
import { useState } from "react";

import MenuLink from "@/src/lib/components/menuLink";
import ThemeSwitcher from "@/src/lib/components/themeSwitcher";
import UserAccountDropdown from "./userAccountDropdown";
import PopupHeader from "./popupHeader";
import SettingsButton from "./settingsButton";

interface TaskMenuProps {
  AccountPhoto: React.ReactNode,
  LogOut: React.ReactNode;
  accountCreationDate: string;
  accountName?: string,
}

export default function SidebarContents({ accountName, AccountPhoto, LogOut, accountCreationDate }: TaskMenuProps) {
  const [showSlideout, setShowSlideout] = useState(false);
  const [makeSidebar, setMakeSidebar] = useState(false);
  const [showSideBarExitArrow, setShowSidebarExitArrow] = useState(false);

  const pathName = usePathname();

  return (
    <section
      className={`${makeSidebar && 'bg-light-header min-w-64 translate-x-0' || "min-w-24"} h-full duration-300 transition-all delay-75 ease-in-out relative`}
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
        className={`bg-light-header duration-300 absolute min-w-64 transition-all delay-75 ease-in-out ${(showSlideout || makeSidebar) || 'invisible -translate-x-full'} ${!makeSidebar ? '-left-0 right-0 top-12' : 'top-0'}`}
      >
        <ul className={`flex flex-col pb-1 w-full ${makeSidebar || 'rounded-md shadow'}`} >
          <li>
            <div
              className="mx-4 flex flex-row items-center justify-between gap-2 pt-4"
              onMouseEnter={() => setShowSidebarExitArrow(true)}
              onMouseLeave={() => setShowSidebarExitArrow(false)}
            >
              {makeSidebar ? (
                <UserAccountDropdown
                  accountName={accountName}
                  AccountPhoto={AccountPhoto}
                  accountCreationDate={accountCreationDate}
                  Logout={LogOut}
                />
              ) : (
                <PopupHeader
                  accountName={accountName}
                  AccountPhoto={AccountPhoto}
                />
              )}
              {makeSidebar && (
                <button
                  className={`${!showSideBarExitArrow ? 'opacity-0' : ''}`}
                  onClick={() => setMakeSidebar(prev => !prev)} >
                  <ChevronsLeft
                    color="grey"
                  />
                </button>
              )}
            </div>
          </li>
          <div className="m-2 border-b-[.5px] border-gray-200" />
          <ThemeSwitcher />
          <SettingsButton
            profilePhoto={AccountPhoto}
            emailAddress={accountName}
          />
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
