import { Dispatch } from "react";
import NewTaskRequest from "@annotations/newTaskRequest";
import { getJwtToken } from "../auth";
import NewTask from "../annotations/newTasks";

const onNewTask = (task: NewTask, setRequest: Dispatch<NewTaskRequest>) => {
  const makeRequest = async () => {
    const dueDate = task.due && new Date(task.due);
    const data: NewTask = {
      title: task.title,
      body: task.body,
      priority: task.priority,
      due: dueDate ? dueDate.toJSON() : undefined
    };

    try {
      const res = await fetch('http://localhost:8080/site/tasks/new', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getJwtToken()}`,
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      if (res.ok) {
        setRequest({
          pending: false,
          completed: true,
          code: res.status
        });

      } else {
        setRequest({
          pending: false,
          completed: true,
          code: res.status
        });
      }
    } catch (e) {
      console.log(e);
      let message = "unknown error";
      if (e instanceof Error) {
        message = e.message;
      }
      setRequest({
        pending: false,
        completed: true,
        err: message,
        code: 500
      });
    }
  };
  setRequest({
    pending: true,
    completed: false,
    code: 200
  });
  makeRequest();

};

export default onNewTask;
