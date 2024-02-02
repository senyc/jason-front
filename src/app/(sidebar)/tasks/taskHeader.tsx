'use client';
import { TaskView } from "@/src/lib/annotations/taskView";
import Dropdown from "@/src/lib/components/dropdown";

interface TaskMenuProps {
  taskView: TaskView;
  sinceLastSync: React.ReactNode
}

import { useRouter } from "next/navigation";
import { Clock } from "react-feather";
import TimeSinceLastSync from "./timeSinceLastSync";

export default function TaskHeader({ sinceLastSync, taskView = TaskView.Incomplete }: TaskMenuProps) {
  const router = useRouter();
  const id = "taskModeView";
  const toggleOpen = () => {
    document.getElementById(id)?.removeAttribute('open');
  };

  const contents = [
    { label: "Incomplete Tasks", value: TaskView.NoOption, hidden: true },
    { label: "Incomplete Tasks", value: TaskView.Incomplete },
    { label: "Completed Tasks", value: TaskView.Completed },
    { label: "All Tasks", value: TaskView.All },
  ];
  return (
    <header className="flex h-12 w-full flex-row items-center gap-3">
      <Dropdown
        summaryClassNames={"min-w-24 ml-8 list-none rounded-lg border-[.5px] border-gray-300 p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"}
        summary={contents[contents.findIndex((val) => val.value === taskView)].label}
        id={id}
      >

        <ul className="menu dropdown-content bg-light-header left-10 mt-2 rounded-md shadow">
          {contents.map(currentOption => {
            return (<li
              className={currentOption.hidden ? 'hidden' : ''}
              key={"formitem" + "-" + currentOption.label}
              onClick={() => {
                toggleOpen();
                router.push(`/tasks/${currentOption.value}`);
              }}
            >
              <a>
                {currentOption.label}
              </a>
            </li>
            );
          })}
        </ul>
      </Dropdown>
      {sinceLastSync}
    </header>
  );
}