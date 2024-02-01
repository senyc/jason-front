import Sidebar from "./sidebar";
import { TaskView } from "@/src/lib/annotations/taskView";

export default async function TaskLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { taskView: TaskView; };
}) {
  return (
    <body className="flex h-full w-full flex-row">
      <Sidebar />
      {children}
    </body>
  );
}
