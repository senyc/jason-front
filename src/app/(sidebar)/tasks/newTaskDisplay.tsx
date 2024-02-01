'use client';

import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

import { createNewTask } from "./actions";
import FormDropdown from '@/src/lib/components/formDropdown';

const MaxHeight = 4;

const initialState = {
  status: "",
  message: ""
};

export default function NewTaskDisplay() {
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formDropdownItem, setFormDropdownItem] = useState<string>("");
  const [formTitle, setFormTitle] = useState("");

  //@ts-ignore
  const [state, formAction] = useFormState(createNewTask, initialState);

  // Resets form entries on successful submit
  useEffect(() => {
    if (formRef.current && state?.status === 'success') {
      formRef.current.reset();
      setFormDropdownItem("");
      setFormTitle("");
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
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
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

            <input
              defaultValue={"0"}
              name={"priority"}
              type="hidden"
              value={formDropdownItem}
            />
            <FormDropdown
              id="newTaskPriorityDropdown"
              selectedValue={formDropdownItem}
              setSelectedValue={setFormDropdownItem}
              defaultValue={"0"}
              options={[
                { label: "Priority", value: "0", hidden: true },
                { label: "P1", value: "1" },
                { label: "P2", value: "2" },
                { label: "P3", value: "3" },
                { label: "P4", value: "4" },
              ]}
            />
          </div>
          <div className="border-b-[.5px] border-gray-200" />
          <div className="flex w-full flex-row justify-between p-3">
            <button
              type="submit"
              disabled={formTitle.length <= 0}
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
