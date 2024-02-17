'use client';

import { Clock } from "react-feather";
import { useRouter } from "next/navigation";

import Dropdown from "@/src/lib/components/dropdown";
import TimeContents from "./timeContents";
import { TaskView } from "@/src/lib/annotations/taskView";
import notifySuccess from "@/src/lib/actions/notifySuccess";

interface TaskMenuProps {
  taskView: TaskView;
  sinceLastSync?: string;
}

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
    <header className="mx-auto flex h-12 w-full flex-row items-center gap-3">
      <Dropdown
        summaryClassNames={"min-w-32 ml-2 list-none rounded-lg border-[.5px] border-gray-200 p-2 text-center text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700 sm:ml-4 md:ml-8"}
        summary={contents[contents.findIndex((val) => val.value === taskView)].label}
        id={id}
      >
        <ul className="menu dropdown-content dark:bg-dark-header light:light:bg-light-header left-10 mt-2 rounded-md shadow">
          {contents.map(currentOption => {
            return (<li
              className={currentOption.hidden ? 'hidden' : ''}
              key={"formitemthing-" + currentOption.value}
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
      <button
        onClick={() => {
          router.refresh();
          router.refresh();
          notifySuccess("Synced!");

        }}
        className="ml-auto mr-3 flex flex-row items-center gap-1 ">
        <Clock
          className="text-gray-400"
          size={17}

        />
        <TimeContents
          startTime={sinceLastSync as string}
        />
      </button>
    </header>
  );
}
