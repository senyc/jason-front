import { Dispatch, SetStateAction } from "react";
import FormDropdownOption from "../annotations/formDropdownOption";
import OutsideClickHandler from "react-outside-click-handler";

interface FormDropdownProps {
  defaultValue?: string;
  options: FormDropdownOption[];
  selectedValue: any;
  setSelectedValue: Dispatch<SetStateAction<any>>;
  id: string;
}

export default function FormDropdown({ id, defaultValue = "", options, selectedValue, setSelectedValue }: FormDropdownProps) {
  const toggleOpen = () => {
    document.getElementById(id)?.removeAttribute('open');
  };

  return (
    <>
      <OutsideClickHandler onOutsideClick={toggleOpen} > <details id={id} className="dropdown dropdown-bottom" >
        <summary
          role="button"
          className=" min-w-10 list-none rounded-lg border-[.5px] border-gray-200 p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {selectedValue == "" ? options[options.findIndex((val) => val.value == defaultValue)].label : options[options.findIndex((val) => val.value == selectedValue)].label}
        </summary>
        <ul className="menu dropdown-content dark:bg-dark-header bg-light-header mt-2 rounded-md shadow">
          {options.map(currentOption => {
            return (<li
              className={currentOption.hidden ? 'text-gray-400' : ''}
              key={"formitemdropdown-" + currentOption.label}
              onClick={() => {
                toggleOpen();
                setSelectedValue(currentOption.value);
              }}
            >
              <a>
                {currentOption.label}
              </a>
            </li>
            );
          })}
        </ul>
      </details>
      </OutsideClickHandler >
    </>
  );
}
