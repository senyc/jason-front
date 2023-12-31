'use client';

import FilterDropdown from "@/src/lib/components/filterDropdown";
import FilterSelection from "@/src/lib/components/filterSelection";
import { Filter } from "@annotations/filter";
import { FormEvent, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";
import PriorityDropdown from "@/src/lib/components/priorityDropdown";
import { inputSetter } from "@/src/lib/utils";
import NewTaskRequest from "@/src/lib/annotations/newTaskRequest";
import onNewTask from "@/src/lib/actions/newTask";
import Task from "@/src/lib/annotations/task";
const maxHeight = 4;
export default function Tasks() {
  const [filterOption, setFilterOption] = useState<Filter>(Filter.Daily);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);
  const [priorityOption, setPriorityOption] = useState<number>(2);
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null
  });

  const [newTaskRequest, setNewTaskRequest] = useState<NewTaskRequest>({
    completed: false,
    pending: false,
    code: 200
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskTitle.length <= 0) {
      return;
    }
    const newTask: Task = {
      title: taskTitle,
      priority: priorityOption
    };
    onNewTask(newTask, setNewTaskRequest);
    setTaskTitle("")
    setTaskDescription("")
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
        {!showNewTaskInput ? <button onClick={() => setShowNewTaskInput(true)}>+ Add task</button> : (
          <form onSubmit={onSubmit} className="rounded-lg border-[.5px] border-gray-400">
            <input
              type="text"
              value={taskTitle}
              onChange={inputSetter(setTaskTitle)}
              placeholder="New title"
              className="input input-ghost h-10 w-full border-none focus:outline-none" />
            {/* make sure to change the scrollbar icon*/}
            <TextareaAutosize
              value={taskDescription}
              onChange={inputSetter(setTaskDescription)}
              maxRows={maxHeight}
              placeholder="Description"
              className="input input-ghost h-10 w-full resize-none overflow-y-auto overflow-x-hidden border-none text-sm focus:outline-none" />
            <div className="border-b-[.5px] border-gray-200" />
            <div className="pj-3 flex h-12 flex-row gap-4 ">
              <Datepicker
                containerClassName={"relative w-36 border-none bg-transparent focus:outline-none"}
                asSingle
                inputClassName={"h-full w-full rounded-md bg-transparent bg-none px-3 text-sm focus:outline-none"}
                useRange={false}
                value={value}
                placeholder="new Date"
                displayFormat={"DD/MM/YYYY"}
                onChange={(newValue) => setValue(newValue)}
              />
              <PriorityDropdown setNewPriority={setPriorityOption} />
            </div>
            <div className="m-1 w-full pb-3">
              <button type="submit" className="btn btn-sm">Add task</button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
