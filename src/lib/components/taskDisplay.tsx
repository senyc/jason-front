import completeTask from "../actions/completeTask";
import { Priority } from "../annotations/priority";

interface TaskDisplayProps {
  id: number,
  body?: string,
  title: string,
  priority?: Priority,
  due: string | null,
  isOverdue?: boolean;
  onClick?: () => void;
}

const priorityColorMatches = new Map<Priority, string>([
  [1, "red"],
  [2, "orange"],
  [3, "green"],
  [4, "blue"],
  [5, "sky"],
]);

export default function TaskDisplay({ title, body, priority = 3, id, onClick }: TaskDisplayProps) {
  const checkboxColor = priorityColorMatches.get(priority);
  // form-xxx allows for the default styles to be overridden
  return (
    <>
      <div
        className="mt-2"
      >
        <div className="flex flex-row place-items-center gap-2">
          <input
            type="checkbox"
            className={`rounded-full border-${checkboxColor}-400 p-2 bg--50 checked:text-${checkboxColor}-400 bg-${checkboxColor}-50 form-checkbox`}
            onClick={() => {
              onClick && onClick();
              completeTask(id);
            }
            }
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
