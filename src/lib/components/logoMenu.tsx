'use client';

import OutsideClickHandler from "react-outside-click-handler";
import HeaderLink from "./headerLink";
import LogoLink from "./logoLink";

export default function LogoMenu() {

  const toggleOpen = () => {
    document.getElementById('profile-menu')?.removeAttribute('open');
  };

  return (
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
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </summary>
        <ul className="dropdown-content bg-base-100 -right-16 z-20 flex w-40 flex-col gap-2 rounded-none shadow" >
          <li className="hover:bg-base-100">
            <div className="flex flex-col">
              <h2 className="text-md font-bold ">
                Kyler Bomhof
              </h2>
              <p className="text-sm">
                account: standard
              </p>
            </div>
          </li>
          <div className="border-b-[.5px] border-gray-200" />
          <li className="h-full w-full transition duration-75 ease-in hover:bg-gray-100">
            <LogoLink
              href="profile"
              label="profile"
            />
          </li>
          <li className="h-full w-full transition duration-75 ease-in hover:bg-gray-100">
            <LogoLink
              href="account"
              label="account"
            />
          </li>
        </ul>
      </details>
    </OutsideClickHandler>
  );
}
