import { Dispatch } from "react";
import { TaskView } from "@annotations/taskView";
import { filterOrder } from "@/src/config/filterOrder";
import Dropdown from "./dropdown";

interface FilterDropdownProps {
  setTaskView: Dispatch<TaskView>,
  taskViewOption: TaskView,
}

export default function FilterDropdown({ setTaskView: setFilterOption, taskViewOption: currentOption }: FilterDropdownProps) {
  return (
    <Dropdown
      text={currentOption}
      setter={setFilterOption}
      options={filterOrder}
    />
  );
}
