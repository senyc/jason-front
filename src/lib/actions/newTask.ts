import { getCookie } from "cookies-next";
import NewTask from "../annotations/newTasks";

const postNewTask = async (task: NewTask) => {
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
        'Authorization': `Bearer ${getCookie('jwt')}`,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    if (!res.ok) {
      console.log(res.status);
    }
  } catch (e) {
    console.log(e);
    let message = "unknown error";
    if (e instanceof Error) {
      message = e.message;
    }
  }
};

export default postNewTask;
