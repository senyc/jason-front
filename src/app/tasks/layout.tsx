import TaskPageHeader from "./taskPageHeader";
import { TaskView } from "@/src/lib/annotations/taskView";

export default async function TaskLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { taskView: TaskView; };
}) {
  return (
    <>
      <TaskPageHeader
        taskView={params.taskView}
      />
      <main className="w-6/12 self-center">
        {children}
      </main >
    </>
  );
}
