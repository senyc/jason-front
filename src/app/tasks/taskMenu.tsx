'use client';

import { TaskView } from "@/src/lib/annotations/taskView";
import ThemeSwitcher from "@/src/lib/components/header/profile/themeSwitcher";
import MenuLink from "@/src/lib/components/header/profile/menuLink";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { CheckCircle, ChevronsLeft, Clock, Home, Menu, Settings, Sidebar } from "react-feather";
import Dropdown from "@/src/lib/components/dropdown";

interface TaskMenuProps {
  AccountPhoto: React.ReactNode,
  AccountName: React.ReactNode,
  LogOut: React.ReactNode;
  taskView: TaskView;
}
export default function TaskMenu({ AccountName, AccountPhoto, LogOut, taskView }: TaskMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [makeSidebar, setMakeSidebar] = useState(false);
  const [showSideBarExitArrow, setSidebarshowSideBarExitArrow] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  return (
    <header className='flex h-12 w-full flex-row items-center gap-3'>
      <button className={`${makeSidebar && 'invisible'} p-3 z-30`}
        onMouseEnter={() => setShowMenu(true)}
        onClick={() => setMakeSidebar(prev => !prev)}
      > {showMenu ? (
        <Sidebar />
      ) : (
        <Menu />
      )
        }
      </button>
      <div
        className={`${makeSidebar && 'bg-light-header w-64'} absolute left-0 top-0 h-screen w-24`}
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >

        <div
          className={`${showMenu || makeSidebar || 'invisible -translate-x-full'} bg-light-header duration-300 absolute ${!makeSidebar ? '-left-0 top-12' : 'left-0 top-0'} transition-all delay-75 ease-in-out`}>

          <ul className={`w-64 flex flex-col ${makeSidebar || 'rounded-md shadow'} pb-1`} >
            <li>
              <div
                className="mx-4 flex w-64 flex-row items-center gap-2 pt-4"
                onMouseEnter={() => setSidebarshowSideBarExitArrow(true)}
                onMouseLeave={() => setSidebarshowSideBarExitArrow(false)}
              >
                {makeSidebar ? (
                  <Dropdown
                    id="user-info"
                    summary={<div className="flex h-full w-full flex-row items-center gap-1 "><div className="w-6">{AccountPhoto}</div>{AccountName} </div>}
                  >
                    <div className="dropdown-content bg-light-header absolute -left-2 mt-2 w-64 rounded-md shadow">
                      <div className="m-2 flex flex-row gap-1">
                        <div className="w-10 rounded-md">
                          {AccountPhoto}
                        </div>
                        <div className="flex h-full w-full flex-col">
                          {AccountName}
                          <div className="flex flex-row gap-1">
                            <p className="list-disc text-xs opacity-60">
                              {"Account age: 2 months"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
                      {LogOut}
                    </div>
                  </Dropdown>
                ) : <div className="flex flex-row items-center gap-1"><div className="w-6">{AccountPhoto}</div>{AccountName} </div>
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
            {makeSidebar && <div className="mx-2 my-1.5 border-b-[.5px] border-gray-200" />
            }
          </ul>
        </div>
      </div>
      <select
        defaultValue={taskView}
        className={`select ml-16 ${makeSidebar && 'translate-x-36' || 'translate-x-0'} transition delay-75 duration-300 ease-in-out bg-none text-center`}
        onChange={(e) => router.push(`/tasks/${e.target.value}`)}
      >
        <option hidden value={TaskView.NoOption}>Incomplete Tasks</option>
        <option value={TaskView.Incomplete}>Incomplete Task</option>
        <option value={TaskView.Completed}>Completed Task</option>
        <option value={TaskView.All}>All Tasks</option>
      </select>
      <div className="ml-auto mr-3 flex flex-row items-center gap-1">
        <Clock size={17} />
        <p>
          last synced: 2 hours
        </p>
      </div>
    </header >
  );
}
