import { Priority } from "../annotations/priority";

interface TaskDisplayProps {
  title: string;
  body?: string;
  priority?: Priority;
}

const priorityColorMatches = new Map<Priority, string>([
  [1, "red-400"],
  [2, "orange-300"],
  [3, "green-400"],
  [4, "blue-300"],
  [5, "sky-300"],
]);

export default function TaskDisplay({ title, body, priority = 3 }: TaskDisplayProps) {
  const borderColorStyle = `border-${priorityColorMatches.get(priority)}`;
  // form-xxx allows for the default styles to be overridden
  return (
    <>
      <div
        className="mt-3"
      >
        <div className="flex flex-row place-items-center gap-2">
          <input
            type="checkbox"
            className={`rounded-full ${borderColorStyle} p-2 checked:bg-none checked:${borderColorStyle.replace("border", "text")} form-checkbox`}
          />
          <h2 className="text-md font-bold">
            {title}
          </h2>
        </div>
        <p
          className="pl-6"
        >
          {body}
        </p>
      </div>
      <div className="border-b-[.5px] border-gray-200 py-2.5" />
    </>
  );

}
