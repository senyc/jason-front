import Task from "@annotations/task";
import TaskDisplay from "./taskDisplay";
import { Priority } from "@annotations/priority";


type DatedTasks = Map<string, Task[]>;
const renderTasks = (datedTasks: DatedTasks) => {
  const elements = [];
  // Puts items without a due date last (instead of first)
  if (datedTasks.has("")) {
    const nullItems = datedTasks.get("") as Task[];
    datedTasks.delete("");
    datedTasks.set("", nullItems);
  }

  for (const [key, tasks] of datedTasks) {
    elements.push(
      <div
        key={`${key === "" ? 'key-no-due-date' : `key-${key}`}`}
      >
        <h2>
          {key === "" ? 'No due date' : key.toString()}
        </h2>
        <ul>
          {tasks.map(task => (
            <li key={`key-task-${task.id}`}>
              <TaskDisplay
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
interface TaskViewProps {
  tasks?: Task[];
}

export default function TaskView({ tasks }: TaskViewProps) {
  if (!tasks) {
    return <> </>;
  }

  let datedTasks: DatedTasks = new Map();

  tasks.forEach(task => {
    // Empty string as the key for empty due dates
    if (!task.due) {
      const newElement = datedTasks.get("") || [];
      newElement.push(task);
      datedTasks.set("", newElement);
    } else {
      const newElement = datedTasks.get(task.due) || [];
      newElement.push(task);
      datedTasks.set(task.due, newElement);
    }
  });
  return (
    <ul>
      {renderTasks(datedTasks)}
    </ul>
  );
};
