import NewTaskDisplay from "./newTaskDisplay";
import TaskDashboard from "./taskDashboard";

export default function Tasks() {
  return (
    <main className="w-6/12 self-center">
      <NewTaskDisplay />
      <div className="pb-3" />
      <div className='my-3 flex w-full flex-row justify-end'>
      </div>
      <TaskDashboard />
    </main >
  );
}
