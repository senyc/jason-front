'use client';

import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus } from "react-feather";

import NewTaskForm from "./newTaskForm";

export default function NewTaskDisplay() {
  const [showNewTaskInput, setShowNewTaskInput] = useState(false);

  return (
    <section className="mt-11">
      {showNewTaskInput || (
        <div className="border-b-[.5px] border-b-gray-100 pb-5">
          <button
            className="rounded-lg border-[.5px] border-gray-300 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100"
            onClick={() => setShowNewTaskInput(true)}
          >{<div className="flex flex-row items-center gap-0.5">
            <Plus size={15} />
            <p>Add Task</p>
          </div>
            }</button>
        </div>
      )}
      <NewTaskForm
        shouldDisplay={showNewTaskInput}
        closeAction={() => setShowNewTaskInput(false)}
      />
      <div className="mb-7 border-b-[.5px] border-gray-200" />
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        limit={3}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        closeButton={false}
      />
    </section>
  );
}
