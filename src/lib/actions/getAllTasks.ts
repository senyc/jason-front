import Task from "@annotations/task";
import { z } from 'zod';
import { getCookie } from "cookies-next";
import { Priority } from "../annotations/priority";

const allTasksResponse = z.array(z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().optional(),
  due: z.string().nullish(),
  priority: z.number().optional(),
  completed: z.boolean(),
  completedDate: z.string().optional(),
}));

const getAllTasks = async (): Promise<Array<Task>> => {
  const newData: Array<Task> = [];
  try {
    const res = await fetch('http://localhost:8080/site/tasks/all', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('jwt')}`,
      },
    });

    if (res.ok) {
      const resData = await res.json();
      const data = allTasksResponse.parse(resData);
      data.forEach(item => {
        newData.push({
          id: item.id,
          title: item.title,
          priority: item.priority as Priority,
          body: item.body,
          due: item.due ? new Date(item.due).toJSON() : null,
          completed: item.completed,
          completedDate: item.completedDate ? new Date(item.completedDate).toJSON() : undefined,
        });
      });
      return newData;
    }
  } catch (e) {
    console.log(e);
    let message = "unknown error";
    if (e instanceof Error) {
      message = e.message;
    }
  }
  return newData;
};

export default getAllTasks;
