import OutsideClickHandler from "react-outside-click-handler";
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import FormDropdown from '@/src/lib/components/formDropdown';
import { Priority } from "@/src/lib/annotations/priority";
import { editTask } from "./actions";

const initialState = {
  status: "",
  message: ""
};

interface taskDisplayForm {
  body?: string,
  closeAction: () => void;
  due: string | null,
  id: number,
  priority: Priority,
  shouldDisplay: boolean;
  title: string,
}

export default function TaskDisplayForm({ shouldDisplay, closeAction, id, body, title, priority, due }: taskDisplayForm) {
  const [formTitle, setFormTitle] = useState(title);
  const [editTaskState, formAction] = useFormState(editTask, initialState);
  const [formDropdownItem, setFormDropdownItem] = useState(priority);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyFailure = (message: string) => toast.error(message);

  const clearInputs = () => {
    setFormDropdownItem(priority);
    setFormTitle(title);
  };

  const onCancel = () => {
    clearInputs();
    closeAction();
  };

  useEffect(() => {
    if (editTaskState?.status === 'success') {
      onCancel();
      notifySuccess(editTaskState.message);

    } else if (editTaskState?.status === 'failure') {
      notifyFailure(editTaskState.message);
    }
  }, [editTaskState]);

  return shouldDisplay && (
    <OutsideClickHandler
      onOutsideClick={onCancel}
    >
      <form
        className="mb-6 mt-2 w-full rounded-lg border-[.5px] border-gray-300"
        action={formAction}
      >
        <input
          className="hidden"
          type="text"
          value={id}
          name="id"
        />
        <input
          className="input input-ghost h-10 w-full border-none font-bold focus:outline-none"
          name="title"
          type="text"
          placeholder="New title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          autoFocus
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
          <input
            defaultValue={"0"}
            name={"priority"}
            type="hidden"
            value={formDropdownItem}
          />
          <FormDropdown
            selectedValue={formDropdownItem}
            setSelectedValue={setFormDropdownItem}
            defaultValue={"0"}
            id={`${id}-ExistingTaskPriorityDropdown`}
            options={[
              { label: "Priority", value: "0", hidden: true },
              { label: "P1", value: "1" },
              { label: "P2", value: "2" },
              { label: "P3", value: "3" },
              { label: "P4", value: "4" },
            ]}
          />
        </div>
        <div className="flex flex-row justify-between p-3">
          <button
            className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={formTitle.length <= 0}
            type="submit"
          >Submit</button>
          <button
            className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
            type="button"
            onClick={onCancel}
          >Cancel</button>
        </div>
      </form>
    </OutsideClickHandler>
  );
}
