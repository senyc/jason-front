'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { FormEvent, useEffect, useRef, useState } from "react";

import FilterDropdown from "@components/filterDropdown";
import FilterSelection from "@components/filterSelection";
import NewTaskRequest from "@annotations/newTaskRequest";
import PriorityDropdown from "@components/priorityDropdown";
import Task from "@annotations/task";
import onNewTask from "@actions/newTask";
import { Filter } from "@annotations/filter";
import { inputSetter } from "@utils";
import TaskDisplay from '@components/taskDisplay';
import getTasks from '@actions/getTasks';
import { Priority } from '@annotations/priority';

const maxHeight = 4;

export default function Tasks() {
  const [filterOption, setFilterOption] = useState<Filter>(Filter.Daily);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);
  const [priorityOption, setPriorityOption] = useState<number | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string>("");
  const [tasks, setTasks] = useState<undefined | Array<Task>>(undefined);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [newTaskRequest, setNewTaskRequest] = useState<NewTaskRequest>({
    completed: false,
    pending: false,
    code: 200
  });

  useEffect(() => {
    (titleInputRef.current && showNewTaskInput) && titleInputRef.current.focus();
  }, [showNewTaskInput]);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskTitle.length <= 0) {
      return;
    }
    const newTask: Task = {
      title: taskTitle,
      priority: priorityOption,
      body: taskDescription
    };
    onNewTask(newTask, setNewTaskRequest);
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <main className="w-6/12 self-center">
      <div className='flex w-full flex-row justify-between'>
        <FilterSelection
          currFilter={filterOption}
          setFilterSelection={setFilterOption}
        />
        <FilterDropdown setFilterOption={setFilterOption} />
      </div>
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
      <div className="border-b-[.5px] border-gray-200 py-4" />
      <ul>
        {tasks != undefined && tasks.map((task) => (
          <li
            key={`key-task-${task.id}`}
          >
            <TaskDisplay
              title={task.title}
              priority={task.priority as Priority | undefined}
              body={task.body}
            />
          </li>
        ))}
      </ul>
    </main >
  );
}
