import Sidebar from "@/src/lib/components/sidebar/sidebar";
import { TaskView } from "@/src/lib/annotations/taskView";

export default async function TaskLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { taskView: TaskView; };
}) {
  return (
    <body className="xs:flex-row flex h-full w-full flex-col">
      <Sidebar />
      {children}
    </body>
  );
}
