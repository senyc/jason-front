import Task from "@annotations/task";
import TaskDisplay from "./taskDisplay";
import { Priority } from "@annotations/priority";
import { Dispatch, SetStateAction, } from "react";
import { TaskView } from "../annotations/taskView";

type DatedTasks = Map<string, Task[]>;
const renderTasks = (
  datedTasks: DatedTasks,
  setTasks: Dispatch<SetStateAction<Task[] | undefined>>,
  taskView: TaskView,
) => {
  const elements = [];
  // Puts items without a due date last (instead of first)
  if (datedTasks.has("")) {
    const nullItems = datedTasks.get("") as Task[];
    datedTasks.delete("");
    datedTasks.set("", nullItems);
  }
  let onClick: (taskId: number) => void;
  let isCompleted: boolean;

  const removeFromTaskDisplay = (taskId: number) => {
    setTasks(prev => {
      if (prev === undefined) {
        return [];
      }
      const indexToRemove = prev.findIndex((val) => val.id === taskId);
      if (indexToRemove !== -1) {
        // Use slice to create a new array excluding the item to remove
        return [
          ...prev.slice(0, indexToRemove),
          ...prev.slice(indexToRemove + 1) // Start from indexToRemove + 1 to exclude the item
        ];
      }
      return prev; // Return the original array if the task is not found
    });
  };
  switch (taskView) {
    case (TaskView.Completed):
      isCompleted = true;
      onClick = removeFromTaskDisplay;
      break;
    case (TaskView.Incomplete):
      isCompleted = false;
      onClick = removeFromTaskDisplay;
      break;
    case (TaskView.All):
      isCompleted = false;
      onClick = (val) => null;
      break;
  }

  for (const [key, tasks] of datedTasks) {
    let header: string;
    if (key == "") {
      header = "No due date";
    } else if (key != "Overdue") {
      const headerDate = new Date(key);

      header = `${headerDate.toLocaleString('default', { month: 'long' })} ${headerDate.getDate()}`;
    } else {
      header = "Overdue";
    }
    elements.push(
      <div
        className="mb-6"
        key={`${key === "" ? 'key-no-due-date' : `key-${key}`}`}
      >
        <h2
          className="border-b-[.5px] border-b-gray-100 p-1.5"
        >
          {header}
        </h2>
        <ul>
          {tasks.map(task => (
            <li key={`key-task-${task.id}`}>
              <TaskDisplay
                completed={task.completed || isCompleted}
                onClick={() => onClick(task.id)}
                id={task.id as number}
                title={task.title}
                priority={task.priority as Priority | undefined}
                body={task.body}
                due={task.due}

              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return elements;
};

interface TaskDashboardProps {
  tasks: Array<Task> | undefined;
  setTasks: Dispatch<SetStateAction<Array<Task> | undefined>>;
  taskView: TaskView;
}
export default function TaskDashboard({ tasks, setTasks, taskView }: TaskDashboardProps) {
  let datedTasks: DatedTasks = new Map();

  if (!tasks) {
    return <> </>;
  }

  tasks.forEach(task => {
    // Empty string as the key for empty due dates
    if (!task.due) {
      const newElement = datedTasks.get("") || [];
      newElement.push(task);
      datedTasks.set("", newElement);
    } else {
      if (new Date(task.due) < new Date()) {
        const newElement = datedTasks.get("Overdue") || [];
        newElement.push(task);
        datedTasks.set("Overdue", newElement);
      } else {
        const newElement = datedTasks.get(task.due) || [];
        newElement.push(task);
        datedTasks.set(task.due, newElement);
      }
    }
  });
  return (
    <ul>
      {tasks && renderTasks(datedTasks, setTasks, taskView)}
    </ul>
  );
};
