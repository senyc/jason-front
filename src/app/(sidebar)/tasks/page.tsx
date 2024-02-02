import { TaskView } from "@/src/lib/annotations/taskView";
import NewTaskDisplay from "./newTaskDisplay";
import TaskDashboard from "./taskDashboard";
import TaskHeader from "./taskHeader";
import TimeSinceLastSync from "./timeSinceLastSync";

export default function Tasks({ params }: { params: { taskView: TaskView; }; }) {
  return (
    <>
      <TaskHeader
        taskView={params.taskView}
        sinceLastSync={<TimeSinceLastSync />}

      />
      <section className="mx-auto w-6/12">
        <NewTaskDisplay />
        <div className="pb-3" />
        <div className='my-3 flex w-full flex-row justify-end'>
        </div>
        <TaskDashboard />
      </section>
    </>
  );
}
