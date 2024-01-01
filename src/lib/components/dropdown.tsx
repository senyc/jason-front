import { Dispatch } from "react";

import OutsideClickHandler from 'react-outside-click-handler';

interface DropdownProps {
  options: Array<any>;
  setter: Dispatch<any>;
  text: string;
}

export default function Dropdown({ options, text, setter }: DropdownProps) {
  /**
  * This can only be solved via event handlers not a controlled component 
  * via: https://github.com/facebook/react/issues/15486 
  */
  const toggleOpen = () => {
    document.getElementById(text.trim())?.removeAttribute('open');
  };

  return (
    <OutsideClickHandler
      onOutsideClick={toggleOpen}
    >
      <details
        id={text.trim()}
        className="dropdown"
      >
        <summary
          role="button"
          className="list-none rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
        >
          {text}
        </summary>
        <ul className="menu dropdown-content bg-base-100">
          {options.map((val) => (
            <li
              key={`key-${val}`}
            >
              <button
                type="button"
                onClick={() => {
                  toggleOpen();
                  setter(val);
                }}
              >{val}</button>
            </li>)
          )}
        </ul>
      </details>
    </OutsideClickHandler>
  );

}
