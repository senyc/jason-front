import { Dispatch } from "react";
import { Filter } from "@annotations/filter";
import { filterOrder } from "@/src/config/filterOrder";

interface FilterDropdownProps {
  setFilterOption: Dispatch<Filter>;
}

interface SelectionButtonProps {
  option: Filter,
  setFilterOption: Dispatch<Filter>;
}

const SelectionButton = ({ option, setFilterOption }: SelectionButtonProps) => {
  return (
    <button onClick={() => setFilterOption(option)}>{option}</button>
  );

};
export default function FilterDropdown({ setFilterOption }: FilterDropdownProps) {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">Filter</div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {filterOrder.map((val) => (
          <li key={val}>
            <SelectionButton option={val} setFilterOption={setFilterOption} />
          </li>
        ))}
      </ul>
    </div>
  );

}
