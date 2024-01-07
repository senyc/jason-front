import { Dispatch } from "react";
import Dropdown from "./dropdown";

const priorityOptions = [1, 2, 3, 4, 5];

interface PriorityDropdownProps {
  setNewPriority: (num:number) => void;
  text: string
}

export default function PriorityDropdown({ setNewPriority, text }: PriorityDropdownProps) {
  return (
    <Dropdown
      text={text}
      setter={setNewPriority}
      options={priorityOptions}
    />
  );
}
