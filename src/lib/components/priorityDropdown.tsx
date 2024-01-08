import { Priority } from "../annotations/priority";
import Dropdown from "./dropdown";

const priorityOptions = [1, 2, 3, 4, 5];

interface PriorityDropdownProps {
  setNewPriority: (priority: Priority) => void;
  text: string;
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
