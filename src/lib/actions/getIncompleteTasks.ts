import Task from "@annotations/task";
import { getJwtToken } from "../auth";
import { z } from 'zod';

const incompleteTasksResponse = z.array(z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().optional(),
  due: z.string().nullish(),
  priority: z.number().optional()
}));

const getIncompleteTasks = async (): Promise<Array<Task>> => {
  const newData: Array<Task> = [];
  try {
    const res = await fetch('http://localhost:8080/site/tasks/incomplete', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJwtToken()}`,
      },
    });

    if (res.ok) {
      const resData = await res.json();
      const data = incompleteTasksResponse.parse(resData);
      data.forEach(item => {
        newData.push({
          id: item.id,
          title: item.title,
          priority: item.priority,
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

export default getIncompleteTasks;