'use client';
import { TaskView } from "@/src/lib/annotations/taskView";

interface TaskMenuProps {
  taskView: TaskView;
}

import { useRouter } from "next/navigation";
import { Clock } from "react-feather";

export default function TaskHeader({ taskView }: TaskMenuProps) {
  const router = useRouter();
  return (
    <header className="flex h-12 w-full flex-row items-center gap-3">
      <select
        defaultValue={taskView}
        className={`select bg-none text-center`}
        onChange={(e) => router.push(`/tasks/${e.target.value}`)}
      >
        <option hidden value={TaskView.NoOption}>Incomplete Tasks</option>
        <option value={TaskView.Incomplete}>Incomplete Task</option>
        <option value={TaskView.Completed}>Completed Task</option>
        <option value={TaskView.All}>All Tasks</option>
      </select>
      <div className="ml-auto mr-3 flex flex-row items-center gap-1">
        <Clock size={17} />
        <p>
          last synced: 2 hours
        </p>
      </div>
    </header>
  );
}
