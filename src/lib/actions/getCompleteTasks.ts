import Task from "@annotations/task";
import { z } from 'zod';
import { Priority } from "../annotations/priority";
import { cookies } from "next/headers";

const completedTasksResponse = z.array(z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().optional(),
  due: z.string().nullish(),
  priority: z.number(),
  completedDate: z.string().nullish()
}));

const getCompleteTasks = async (): Promise<Array<Task>> => {
  const newData: Array<Task> = [];
  try {
    const res = await fetch('http://localhost:8080/site/tasks/complete', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies().get('jwt')?.value}`,
      },
    });

    if (res.ok) {
      const resData = await res.json();
      const data = completedTasksResponse.parse(resData);
      data.forEach(item => {
        newData.push({
          id: item.id,
          title: item.title,
          priority: item.priority as Priority,
          body: item.body,
          due: item.due ? new Date(item.due).toJSON() : null
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

export default getCompleteTasks;
