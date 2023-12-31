import { Dispatch } from "react";

interface PriorityDropdownProps {
  setNewPriority: Dispatch<number>;
}

const priorityOptions = [1, 2, 3, 4, 5];

interface PriorityButtonProps {
  option: number,
  setNewPriority: Dispatch<number>;
}

const PriorityButton = ({ option, setNewPriority }: PriorityButtonProps) => {
  return (
    <button onClick={() => setNewPriority(option)}>{option}</button>
  );
}

export default function PriorityDropdown({ setNewPriority }: PriorityDropdownProps) {
  return (
    <div className="dropdown my-auto">
      <div tabIndex={0} role="button" className="text-sm">Priority</div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {priorityOptions.map((val) => (
          <li key={val}>
            <PriorityButton option={val} setNewPriority={setNewPriority} />
          </li>
        ))}
      </ul>
    </div>
  );
}
