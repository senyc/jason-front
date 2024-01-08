import markTaskComplete from "../actions/markTaskComplete";
import markTaskIncomplete from "../actions/markTaskIncomplete";
import { Priority } from "../annotations/priority";

interface TaskDisplayProps {
  id: number,
  body?: string,
  title: string,
  priority: Priority,
  due: string | null,
  isOverdue?: boolean,
  onClick: () => void,
  completed: boolean;
}

const priorityColorMatches = new Map<Priority, string>([
  [1, "red"],
  [2, "orange"],
  [3, "green"],
  [4, "blue"],
  [5, "sky"],
  [0, "gray"]
]);

export default function TaskDisplay({ title, body, priority, id, onClick, completed }: TaskDisplayProps) {
  const checkboxColor = priorityColorMatches.get(priority);
  // form-xxx allows for the default styles to be overridden
  const onCheck = () => {
    onClick();
    if (completed) {
      markTaskIncomplete(id);
    } else {
      markTaskComplete(id);
    }
  };
  return (
    <>
      <div
        className="mt-2"
      >
        <div className="flex flex-row place-items-center gap-2">
          <input
            type="checkbox"
            className={`checked:bg-none rounded-full border-${checkboxColor}-400 p-2 checked:text-${checkboxColor}-400 bg-${checkboxColor}-100 form-checkbox`}
            onClick={onCheck}
            defaultChecked={completed}
          />
          <h2 className="text-md font-bold">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h2>
        </div>
        <p
          className="pl-6"
        >
          {body}
        </p>
      </div>
      <div className="border-b-[.5px] border-b-gray-100 pb-5" />
    </>
  );
}
