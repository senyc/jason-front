import Task from "@annotations/task";
import TaskDisplay from "./taskDisplay";
import getAllTasks from "@actions/getAllTasks";
import getCompleteTasks from "@actions/getCompleteTasks";
import getIncompleteTasks from "@actions/getIncompleteTasks";

import { TaskView } from "@annotations/taskView";

type DatedTasks = Map<string, Task[]>;

/*
  asCompleted: allows for tasks returned from the completed endpoint to be shown that way as completed not returned in that packet
*/
const renderTasks = (
  asCompleted: boolean,
  datedTasks: DatedTasks,
) => {
  const elements = [];
  // Puts items without a due date last (instead of first)
  if (datedTasks.has("")) {
    const nullItems = datedTasks.get("") as Task[];
    datedTasks.delete("");
    datedTasks.set("", nullItems);
  }
  for (const [key, tasks] of datedTasks) {
    let header: string;
    if (key == "") {
      header = "No due date";
    } else if (key != "Overdue") {
      const headerDate = new Date(key);

      header = headerDate.toLocaleString('default', {
        day: "numeric",
        month: 'long',
        timeZone: "UTC"
      });
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
                completed={asCompleted || task.completed != undefined && task.completed}
                id={task.id as number}
                title={task.title}
                priority={task.priority}
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

const getTasks = async (taskViewOption: TaskView) => {
  switch (taskViewOption) {
    case (TaskView.Completed):
      return getCompleteTasks();
    case (TaskView.Incomplete):
      return getIncompleteTasks();
    case (TaskView.All):
      return getAllTasks();
    default:
      return getIncompleteTasks();
  }
};

export default async function TaskDashboard({ taskView = TaskView.NoOption }: { taskView?: TaskView; }) {
  let datedTasks: DatedTasks = new Map();

  const tasks = await getTasks(taskView);
  if (tasks != null) {
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
  }
  return (
    <ul>
      {tasks && renderTasks(taskView === TaskView.Completed, datedTasks)}
    </ul>
  );
};
