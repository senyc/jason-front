'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { FormEvent, useEffect, useRef, useState } from "react";

import FilterDropdown from "@components/filterDropdown";
import NewTaskRequest from "@annotations/newTaskRequest";
import PriorityDropdown from "@components/priorityDropdown";
import Task from "@annotations/task";
import onNewTask from "@actions/newTask";
import { TaskView } from "@annotations/taskView";
import { inputSetter } from "@utils";
import TaskDashboard from '@components/taskDashboard';
import getIncompleteTasks from '@actions/getIncompleteTasks';
import getCompleteTasks from '@actions/getCompleteTasks';
import getAllTasks from '@actions/getAllTasks';
import NewTask from '@/src/lib/annotations/newTasks';

const maxHeight = 4;
const defaultPriority = 3;

export default function Tasks() {
  const [taskViewOption, setTaskViewOption] = useState<TaskView>(TaskView.NoOption);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);
  const [priorityOption, setPriorityOption] = useState<number | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string>("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<undefined | Array<Task>>(undefined);

  const [newTaskRequest, setNewTaskRequest] = useState<NewTaskRequest>({
    completed: false,
    pending: false,
    code: 200
  });

  const getTasks = async () => {
    switch (taskViewOption) {
      case (TaskView.Completed):
        setTasks(await getCompleteTasks());
      break
      case (TaskView.Incomplete):
        setTasks(await getIncompleteTasks());
      break
      case (TaskView.All):
        setTasks(await getAllTasks());
        break
      default:
        setTasks(await getIncompleteTasks());
        break
    }
  };

  useEffect(() => {
    getTasks();
  }, [taskViewOption]);

  useEffect(() => {
    (titleInputRef.current && showNewTaskInput) && titleInputRef.current.focus();
  }, [showNewTaskInput]);


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskTitle.length <= 0) {
      return;
    }
    const newTask: NewTask = {
      title: taskTitle,
      priority: priorityOption || defaultPriority,
      body: taskDescription,
      due: !!dueDate ? dueDate : undefined
    };

    onNewTask(newTask, setNewTaskRequest);
    setTaskTitle("");
    setTaskDescription("");
    getTasks();
  };

  return (
    <main className="w-6/12 self-center">
      <div className="mt-11">
        {!showNewTaskInput ? (
          <button
            className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
            onClick={() => {
              setShowNewTaskInput(true);
            }}
          >+ Add task</button>
        ) : (
          <form onSubmit={onSubmit} className="rounded-lg border-[.5px] border-gray-400">
            <input
              ref={titleInputRef}
              type="text"
              value={taskTitle}
              onChange={inputSetter(setTaskTitle)}
              placeholder="New title"
              className="input input-ghost h-10 w-full border-none font-bold focus:outline-none" />
            {/* make sure to change the scrollbar icon*/}
            <TextareaAutosize
              value={taskDescription}
              onChange={inputSetter(setTaskDescription)}
              maxRows={maxHeight}
              placeholder="Description"
              className="input input-ghost h-10 w-full resize-none overflow-y-auto overflow-x-hidden border-none text-sm focus:outline-none" />
            <div className="m-3 flex h-12 flex-row place-items-center gap-4">
              <input
                className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
                type="date"
                value={dueDate}
                onChange={inputSetter(setDueDate)}
              />
              <PriorityDropdown
                setNewPriority={setPriorityOption}
                text={`${priorityOption == undefined ? 'Priority' : `${priorityOption}/5`}`}
              />
            </div>
            <div className="border-b-[.5px] border-gray-200" />
            <div className="flex w-full flex-row justify-between p-3">
              <button
                type="submit"
                className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
              >Add task</button>
              <button
                onClick={() => setShowNewTaskInput(() => false)}
                type="button"
                className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
              >Cancel</button>
            </div>
          </form>
        )}
      </div>
      <div className="pb-3" />
      <div className='my-3 flex w-full flex-row justify-between'>
        <FilterDropdown
          taskViewOption={taskViewOption}
          setTaskView={setTaskViewOption}
        />
      </div>
      <TaskDashboard
        taskView={taskViewOption}
        tasks={tasks}
        setTasks={setTasks}
      />
    </main >
  );
}
