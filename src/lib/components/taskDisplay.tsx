import completeTask from "../actions/completeTask";
import { Priority } from "../annotations/priority";

interface TaskDisplayProps {
  id: number,
  body?: string,
  title: string,
  priority?: Priority,
  due: string | null,
  isOverdue?: boolean;
}

const priorityColorMatches = new Map<Priority, string>([
  [1, "red-400"],
  [2, "orange-300"],
  [3, "green-400"],
  [4, "blue-300"],
  [5, "sky-300"],
]);

export default function TaskDisplay({ title, body, priority = 3, id }: TaskDisplayProps) {
  const borderColorStyle = `border-${priorityColorMatches.get(priority)}`;
  // form-xxx allows for the default styles to be overridden
  return (
    <>
      <div
        className="mt-2"
      >
        <div className="flex flex-row place-items-center gap-2">
          <input
            type="checkbox"
            className={`rounded-full ${borderColorStyle} p-2 checked:bg-none checked:${borderColorStyle.replace("border", "text")} form-checkbox`}
            onClick={() => completeTask(id)}
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
