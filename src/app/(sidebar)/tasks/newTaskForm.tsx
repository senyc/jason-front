import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import TextareaAutosize from "react-textarea-autosize";
import { toast } from 'react-toastify';

import { createNewTask } from "./actions";
import FormDropdown from '@/src/lib/components/formDropdown';

const initialState = {
  status: "",
  message: ""
};

interface NewTaskFormProps {
  shouldDisplay: boolean;
  closeAction: () => void;
}

export default function NewTaskForm({ shouldDisplay, closeAction }: NewTaskFormProps) {
  const [formDropdownItem, setFormDropdownItem] = useState("");
  const [formTitle, setFormTitle] = useState("");

  const notifySuccess = (message: string) => toast.success(message);
  const notifyFailure = (message: string) => toast.error(message);

  const [state, formAction] = useFormState(createNewTask, initialState);

  const clearInputs = () => {
    setFormDropdownItem("");
    setFormTitle("");
  };

  const onCancel = () => {
    clearInputs();
    closeAction();
  };

  // Resets form entries on successful submit
  useEffect(() => {
    if (state?.status === 'success') {
      clearInputs();
      notifySuccess(state.message);

    } else if (state?.status === 'failure') {
      notifyFailure(state.message);
    }
  }, [state]);

  return shouldDisplay && (
    <form
      action={formAction}
      className={`mb-6 rounded-lg border-[.5px] border-gray-300`}
    >
      <input
        autoFocus
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        name="title"
        type="text"
        placeholder="New title"
        className="input input-ghost h-10 w-full border-none font-bold focus:outline-none" />
      {/* make sure to change the scrollbar icon*/}
      <TextareaAutosize
        maxRows={4}
        name="body"
        placeholder="Description"
        className="input input-ghost h-10 w-full resize-none overflow-y-auto overflow-x-hidden border-none text-sm focus:outline-none"
      />
      <div className="m-3 flex h-12 flex-row place-items-center gap-4">
        <input
          className="rounded-lg border-[.5px] border-gray-200 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700"
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
          className="rounded-lg border-[.5px] border-gray-200 p-2 text-sm font-normal transition duration-75 ease-in enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 enabled:dark:hover:bg-gray-700"
        >Add task</button>
        <button
          onClick={onCancel}
          type="button"
          className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100 dark:hover:bg-gray-700"
        >Cancel</button>
      </div>
    </form>
  );
}
