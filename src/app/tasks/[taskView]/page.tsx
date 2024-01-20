import { TaskView } from "@/src/lib/annotations/taskView";
import NewTaskDisplay from "../newTaskDisplay";
import TaskDashboard from "../taskDashboard";

export default function Tasks({ params }: { params: { taskView: TaskView; }; }) {
  return (
    <>
      <NewTaskDisplay
        taskView={params.taskView}
      />
      <div className="pb-3" />
      <div className='my-3 flex w-full flex-row justify-end'>
      </div>
      <TaskDashboard
        taskView={params.taskView}
      />
    </>
  );
}
