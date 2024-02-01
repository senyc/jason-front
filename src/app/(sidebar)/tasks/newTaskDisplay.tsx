'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';

import { TaskView } from "@annotations/taskView";
import { createNewTask } from "./actions";

const MaxHeight = 4;

const initialState = {
  status: "",
  message: ""
};

export default function NewTaskDisplay({ taskView = TaskView.NoOption }: { taskView?: TaskView; }) {
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  //@ts-ignore
  const [state, formAction] = useFormState(createNewTask, initialState);

  // Resets form entries on successful submit
  useEffect(() => {
    if (formRef.current && state?.status === 'success') {
      formRef.current.reset();
    }
  }, [state]);

  useEffect(() => {
    (titleInputRef.current && showNewTaskInput) && titleInputRef.current.focus();
  }, [showNewTaskInput]);

  return (
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
        <form
          action={formAction}
          className="mb-6 rounded-lg border-[.5px] border-gray-300"
          ref={formRef}
        >
          <input
            ref={titleInputRef}
            name="title"
            type="text"
            placeholder="New title"
            className="input input-ghost h-10 w-full border-none font-bold focus:outline-none" />
          {/* make sure to change the scrollbar icon*/}
          <TextareaAutosize
            maxRows={MaxHeight}
            name="body"
            placeholder="Description"
            className="input input-ghost h-10 w-full resize-none overflow-y-auto overflow-x-hidden border-none text-sm focus:outline-none"
          />
          <div className="m-3 flex h-12 flex-row place-items-center gap-4">
            <input
              className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
              type="date"
              name="due"
            />
            <select
              name="priority"
              className="select-ghost select min-h-10 select-bordered h-10 w-16 bg-none pl-2 pr-0"
              defaultValue={0}
            >
              <option value={0}>Priority</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="border-b-[.5px] border-gray-200" />
          <div className="flex w-full flex-row justify-between p-3">
            <button
              type="submit"
              className=" rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >Add task</button>
            <button
              onClick={() => setShowNewTaskInput(false)}
              type="button"
              className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
            >Cancel</button>
            {state?.message}
          </div>
        </form>
      )}

      <div className="mb-7 border-b-[.5px] border-gray-200" />
      <div className="flex w-full flex-row justify-end">
      </div>
    </div>
  );
}
