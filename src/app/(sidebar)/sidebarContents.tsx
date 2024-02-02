'use client';

import { useState } from "react";
import { usePathname } from 'next/navigation';
import { CheckCircle, ChevronsLeft, Home, Menu, Settings, Sidebar } from "react-feather";

import Dropdown from "@/src/lib/components/dropdown";
import MenuLink from "@/src/lib/components/header/profile/menuLink";
import ThemeSwitcher from "@/src/lib/components/header/profile/themeSwitcher";
import AccountAge from "./accountAge";

interface TaskMenuProps {
  AccountName: React.ReactNode,
  AccountPhoto: React.ReactNode,
  accountCreationDate: string;
  LogOut: React.ReactNode;
}

export default function SidebarContents({ AccountName, AccountPhoto, LogOut, accountCreationDate }: TaskMenuProps) {
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
        className={`${showSlideout || makeSidebar || 'invisible -translate-x-full'} bg-light-header duration-300 absolute ${!makeSidebar ? '-left-0 right-0 top-12 ' : 'top-0 '} min-w-64 transition-all delay-75 ease-in-out`}
      >
        <ul className={`flex flex-col ${makeSidebar || 'rounded-md shadow'} pb-1 w-full`} >
          <li>
            <div
              className="mx-4 flex flex-row items-center justify-between gap-2 pt-4"
              onMouseEnter={() => setShowSidebarExitArrow(true)}
              onMouseLeave={() => setShowSidebarExitArrow(false)}
            >
              {makeSidebar ? (
                <Dropdown
                  id="user-info"
                  summary={
                    <div
                      className="flex h-full w-full flex-row items-center gap-1"
                    >
                      <div
                        className="w-6"
                      >
                        {AccountPhoto}
                      </div>
                      {AccountName}
                    </div>}
                >
                  <div
                    className="dropdown-content bg-light-header absolute mt-2 w-[17rem] rounded-md shadow"
                  >
                    <div
                      className="m-2 flex flex-row gap-1"
                    >
                      <div
                        className="w-10 rounded-md"
                      >
                        {AccountPhoto}
                      </div>
                      <div
                        className="flex h-full w-full flex-col"
                      >
                        {AccountName}
                        <div
                          className="flex flex-row gap-1"
                        >
                          <p
                            className="list-disc text-xs opacity-60"
                          >
                            <AccountAge
                              accountAge={accountCreationDate}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mx-2 my-1.5 border-b-[.5px] border-gray-200"
                    />
                    {LogOut}
                  </div>
                </Dropdown>
              ) : (
                <div
                  className="flex w-full flex-row items-center gap-1"
                >
                  <div
                    className="w-6"
                  >
                    {AccountPhoto}
                  </div>
                  {AccountName}
                </div>
              )
              }
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
          <MenuLink
            href="/user/settings"
            label="Settings"
            Icon={Settings}
            onPage={pathName.includes("settings")}
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
