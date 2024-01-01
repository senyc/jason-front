import { Dispatch } from "react";
import { Filter } from "@annotations/filter";
import { filterOrder } from "@/src/config/filterOrder";
import Dropdown from "./dropdown";

interface FilterDropdownProps {
  setFilterOption: Dispatch<Filter>;
}

export default function FilterDropdown({ setFilterOption }: FilterDropdownProps) {
  return (
    <Dropdown
      text="Filter"
      setter={setFilterOption}
      options={filterOrder}
    />
  );

}
