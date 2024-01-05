import { Dispatch } from "react";
import Task from "@annotations/task";
import { getJwtToken } from "../auth";
import { z } from 'zod';

const taskResponse = z.array(z.object({
  id: z.number(),
  title: z.string(),
  body: z.string().optional(),
  due: z.string().nullish(),
  priority: z.number().optional()
}));

const getTasks = (setTasks: Dispatch<Array<Task> | undefined>) => {
  let newData: Array<Task> = [];
  const makeRequest = async () => {
    try {
      const res = await fetch('http://localhost:8080/site/tasks/all', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getJwtToken()}`,
        },
      });

      if (res.ok) {
        const resData = await res.json();
        const data = taskResponse.parse(resData);

        data.forEach(item => {
          newData.push({
            id: item.id,
            title: item.title,
            priority: item.priority,
            body: item.body,
            ...(item.due ? { due: new Date(item.due).toJSON() } : { due: null })
          });
        });
        setTasks(newData);
      }
    } catch (e) {
      console.log(e);
      let message = "unknown error";
      if (e instanceof Error) {
        message = e.message;
      }
      return;
    }
  };
  makeRequest();
  return;

};

export default getTasks;
