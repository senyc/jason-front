'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { PenTool, Trash } from "react-feather";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

import { Priority } from "@annotations/priority";
import { editTask } from "./actions";
import { deleteTask, toggleTaskCompletion } from "@/src/app/(withHeader)/tasks/actions";
import OutsideClickHandler from 'react-outside-click-handler';

const initialState = {
  status: "",
  message: ""
};

interface TaskDisplayProps {
  id: number,
  body?: string,
  title: string,
  priority: Priority,
  due: string | null,
  isOverdue?: boolean,
  completed: boolean;
}

const priorityColorMatches = new Map<Priority, string>([
  [1, "red"],
  [2, "orange"],
  [3, "green"],
  [4, "blue"],
  [5, "sky"],
  [0, "gray"]
]);

export default function TaskDisplay({ title, body, priority, id, completed, due }: TaskDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const checkboxColor = priorityColorMatches.get(priority);

  //@ts-ignore
  const [state, formAction] = useFormState(editTask, initialState);

  // Resets form entries on successful submit
  useEffect(() => {
    if (formRef.current && state?.status === 'success') {
      formRef.current.reset();
      console.log(state.message)
      setIsEditing(false);
    }
  }, [state]);

  useEffect(() => {
    (titleInputRef.current && isEditing) && titleInputRef.current.focus();
  }, [isEditing]);

  // form-xxx allows for the default styles to be overridden
  return !isEditing ? (
    <div
      className="mt-2 border-b-[.5px] border-b-gray-100 pb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row place-items-center justify-between pb-1">
        <div
          className="flex flex-row gap-2"
        >
          <input
            type="checkbox"
            className={`checked:bg-none rounded-full border-${checkboxColor}-400 p-2 checked:text-${checkboxColor}-400 bg-${checkboxColor}-100 form-checkbox`}
            onClick={() => toggleTaskCompletion(completed, id)}
            defaultChecked={completed}
          />
          <h2 className="text-md font-bold">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h2>
        </div>
        <div className={`${!isHovered && 'hidden'} flex flex-row gap-1.5`}>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <PenTool
              color="gray"
              size={18}
            />
          </button>
          <button
            type="button"
            onClick={() => deleteTask(id)}
          >
            <Trash
              color="gray"
              size={18}
            />
          </button>
        </div>
      </div>
      <p
        className="pl-6"
      >
        {body}
      </p>
    </div>
  ) : (
    <OutsideClickHandler
      onOutsideClick={() => setIsEditing(false)}
    >
      <div
        className="mb-6 mt-2 rounded-lg border-[.5px] border-gray-300"
      >
        <form
          className="w-full"
          action={formAction}
          ref={formRef}
        >
          <input
            className="hidden"
            type="text"
            defaultValue={id}
            name="id"
          />
          <input
            className="input input-ghost h-10 w-full border-none font-bold focus:outline-none"
            name="title"
            type="text"
            placeholder="New title"
            defaultValue={title.charAt(0).toUpperCase() + title.slice(1)}
            ref={titleInputRef}
          />
          <TextareaAutosize
            maxRows={4}
            name="body"
            placeholder="Description"
            defaultValue={body}
            className="input input-ghost h-10 w-full resize-none overflow-y-auto overflow-x-hidden border-none text-sm focus:outline-none"
          />
          <div className="m-3 flex h-12 flex-row place-items-center gap-4">
            <input
              className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
              type="date"
              name="due"
              defaultValue={due ? new Date(due).toLocaleDateString('en-CA') : ""}
            />
            <select
              name="priority"
              className="select-ghost select min-h-10 select-bordered h-10 w-16 bg-none pl-2 pr-0"
              defaultValue={priority}
            >
              <option value={0}>Priority</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="flex flex-row justify-between p-3">
            <button
              className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
              type="submit"
            >Submit</button>
            <button
              className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
              type="button"
              onClick={() => setIsEditing(false)}
            >Cancel</button>
          </div>
        </form>

      </div>
    </OutsideClickHandler>
  );
}
