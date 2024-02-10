'use client';

import { PenTool, Trash } from "react-feather";
import { toast } from 'react-toastify';
import { useState } from "react";

import TaskDisplayForm from "./taskDisplayForm";
import { Priority } from "@annotations/priority";
import { deleteTask, toggleTaskCompletion } from "./actions";

interface TaskDisplayProps {
  body?: string,
  completed: boolean;
  due: string | null,
  id: number,
  isOverdue?: boolean,
  priority: Priority,
  title: string,
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
  const checkboxColor = priorityColorMatches.get(priority);

  const notifySuccess = (message: string) => toast.success(message);

  const closeAction = () => {
    setIsHovered(false);
    setIsEditing(false);
  };

  // form-xxx allows for the default styles to be overridden
  return (
    <>
      {isEditing || (
        <div
          className="mt-2 border-b-[.5px] border-b-gray-100 pb-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-row place-items-center justify-between pb-1">
            <div
              className="flex flex-row items-center gap-2"
            >
              <input
                type="checkbox"
                className={`checked:bg-none rounded-full dark:checked:text-${checkboxColor}-700 border-${checkboxColor}-400 p-2 checked:text-${checkboxColor}-400 dark:bg-${checkboxColor}-300 bg-${checkboxColor}-100 form-checkbox`}
                onClick={() => toggleTaskCompletion(completed, id)}
                defaultChecked={completed}
              />
              <h2 className="text-md font-bold">
                {title}
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
                onClick={() => {
                  // This just assumes that it works
                  notifySuccess("Succsfully deleted task");
                  deleteTask(id);
                }}
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
      )}
      <TaskDisplayForm
        id={id}
        title={title}
        body={body}
        due={due}
        priority={priority}
        shouldDisplay={isEditing}
        closeAction={closeAction}
      />
    </>
  );
}
