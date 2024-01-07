'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { FormEvent, useEffect, useRef, useState } from "react";

import FilterDropdown from "@components/filterDropdown";
import NewTask from '@annotations/newTasks';
import PriorityDropdown from "@components/priorityDropdown";
import Task from "@annotations/task";
import TaskDashboard from '@components/taskDashboard';
import getAllTasks from '@actions/getAllTasks';
import getCompleteTasks from '@actions/getCompleteTasks';
import getIncompleteTasks from '@actions/getIncompleteTasks';
import postNewTask from "@actions/newTask";
import { TaskView } from "@annotations/taskView";
import { newTaskSetter } from "@utils";

const MaxHeight = 4;

export default function Tasks() {
  const [newTask, setNewTask] = useState<NewTask>({
    due: "",
    title: "",
    body: "",
    priority: undefined
  });
  const [taskViewOption, setTaskViewOption] = useState<TaskView>(TaskView.NoOption);
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);
  const [tasks, setTasks] = useState<undefined | Array<Task>>(undefined);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const getTasks = async () => {
    switch (taskViewOption) {
      case (TaskView.Completed):
        setTasks(await getCompleteTasks());
        break;
      case (TaskView.Incomplete):
        setTasks(await getIncompleteTasks());
        break;
      case (TaskView.All):
        setTasks(await getAllTasks());
        break;
      default:
        setTasks(await getIncompleteTasks());
        break;
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
    if (newTask.title.length <= 0) {
      return;
    }
    postNewTask(newTask);

    // Resets task input
    setNewTask({
      due: "",
      title: "",
      body: "",
      priority: undefined,
    });
    getTasks();
  };

  return (
    <main className="w-6/12 self-center">
      <div className="mt-11">
        {!showNewTaskInput ? (
          <div className="border-b-[.5px] border-b-gray-100 pb-5">
            <button
              className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
              onClick={() => {
                setShowNewTaskInput(true);
              }}
            >+ Add task</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-lg border-[.5px] border-gray-300">
            <input
              ref={titleInputRef}
              name="title"
              type="text"
              value={newTask.title}
              onChange={newTaskSetter(setNewTask)}
              placeholder="New title"
              className="input input-ghost h-10 w-full border-none font-bold focus:outline-none" />
            {/* make sure to change the scrollbar icon*/}
            <TextareaAutosize
              value={newTask.body}
              onChange={newTaskSetter(setNewTask)}
              maxRows={MaxHeight}
              name="body"
              placeholder="Description"
              className="input input-ghost h-10 w-full resize-none overflow-y-auto overflow-x-hidden border-none text-sm focus:outline-none" />
            <div className="m-3 flex h-12 flex-row place-items-center gap-4">
              <input
                className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
                type="date"
                name="due"
                value={newTask.due}
                onChange={newTaskSetter(setNewTask)}
              />
              <PriorityDropdown
                setNewPriority={newPriority => setNewTask(prev => ({
                  ...prev,
                  priority: newPriority
                }))}
                text={`${newTask.priority == undefined ? 'Priority' : `${newTask.priority}/5`}`}
              />
            </div>
            <div className="border-b-[.5px] border-gray-200" />
            <div className="flex w-full flex-row justify-between p-3">
              <button
                type="submit"
                className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={newTask.title.length <= 0}
              >Add task</button>
              <button
                onClick={() => setShowNewTaskInput(false)}
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
