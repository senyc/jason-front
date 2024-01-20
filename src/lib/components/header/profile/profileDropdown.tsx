'use client';

import OutsideClickHandler from "react-outside-click-handler";
import MenuLink from "./menuLink";
import { Code, Home, Settings } from "react-feather";
import ThemeSwitcher from "./themeSwitcher";
import LogoutButton from "./logoutButton";

export default function ProfileDropdown() {

  const toggleOpen = () => {
    document.getElementById('profile-menu')?.removeAttribute('open');
  };

  return (
    <div className="">
      <OutsideClickHandler
        onOutsideClick={toggleOpen}
      >
        <details
          id='profile-menu'
          className="dropdown"
        >
          <summary
            role="button"
            className="list-none"
          >
            <div className="avatar w-10">
              <div className=" rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </summary>
          <ul className="dropdown-content bg-base-100 z-50 flex w-48 flex-col rounded-md border-b-[.5px] border-gray-200 pb-1 shadow" >
            <li className="hover:bg-base-100">
              <div className="flex flex-col px-4 py-3.5">
                <h2 className="text-md font-bold ">
                  Kyler Bomhof
                </h2>
                <p className="text-sm">
                  Account: standard
                </p>
              </div>
            </li>
            <div className="m-2 border-b-[.5px] border-gray-200" />
            <MenuLink
              href="/user/settings"
              label="Settings"
              Icon={Settings}
            />
            <ThemeSwitcher />
            <div className=" m-2 border-b-[.5px] border-gray-200" />
            <MenuLink
              href="/user/developer"
              label="Developer"
              Icon={Code }
            />
            <MenuLink
              href="/"
              label="Home"
              Icon={Home}
            />
            <div className="m-2 border-b-[.5px] border-gray-200" />
            <LogoutButton />
          </ul>
        </details>
      </OutsideClickHandler>
    </div>
  );
}
