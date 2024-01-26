import Task from "@annotations/task";
import { z } from 'zod';
import { Priority } from "../annotations/priority";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/src/config/constants";

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
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!jwt) {
    redirect('/login');
  }

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/complete`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
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
