'use server';

import { ACCESS_TOKEN_COOKIE_NAME } from "@/src/config/constants";
import NewTask from "@/src/lib/annotations/newTasks";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { z } from "zod";

export async function createNewTask(prevState: { message: string, status: string; }, formData: FormData) {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!jwt) {
    redirect('/login');
  }

  const schema = z.object({
    title: z.string().min(1),
    body: z.string().optional(),
    priority: z.string(),
    due: z.string().optional()
  });

  const parse = schema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
    priority: formData.get('priority'),
    due: formData.get('due'),
  });

  if (!parse.success) {
    return { message: `Failed to create task ${parse.error}`, status: "failure" };
  }

  const data: NewTask = {
    ...parse.data,
    priority: parseInt(parse.data.priority),
  };

  // Converting to datetime format
  if (data.due) {
    data.due = new Date(new Date(data.due).toLocaleString('en-US', { timeZone: 'UTC' })).toJSON();
  } else {
    data.due = undefined;
  }

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/new`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return { message: 'Failed to update users tasks', status: "failure" };
    }

    revalidatePath("/tasks");
    return { message: '', status: "success" };

  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return { message: "Failure adding new task", status: "failure" };
    }

    return { message: "unknown issue transmitting data", status: "failure" };
  }
}

export async function toggleTaskCompletion(currentlyCompleted: boolean, id: number) {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/${currentlyCompleted ? 'markIncomplete' : 'markComplete'}?id=${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      return { message: 'failure sending request' };
    }

    revalidatePath("/tasks");
  } catch (e) {
    console.log(e);
    let message = "unknown error";
    if (e instanceof Error) {
      message = e.message;
    }
    return { message: message };
  }
};

export async function deleteTask(id: number) {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }
  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/delete?id=${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      return { message: 'failure sending request' };
    }

    revalidatePath("/tasks");
  } catch (e) {
    console.log(e);
    let message = "unknown error";
    if (e instanceof Error) {
      message = e.message;
    }
    return { message: message };
  }
};


export async function editTask(prevState: { message: string, status: string; }, formData: FormData) {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }
  const schema = z.object({
    id: z.string(),
    title: z.string().min(1),
    body: z.string().optional(),
    priority: z.string().optional(),
    due: z.string().optional()
  });

  const parse = schema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    body: formData.get('body'),
    priority: formData.get('priority'),
    due: formData.get('due'),
  });

  if (!parse.success) {
    return { message: `Failed to edit task ${parse.error}`, status: "failure" };
  }

  const data = {
    body: parse.data.body,
    title: parse.data.title,
    id: parseInt(parse.data.id),
    due: parse.data.due,
    priority: parse.data.priority ? parseInt(parse.data.priority) : undefined
  };

  if (data.due) {
    data.due = new Date(new Date(data.due).toLocaleString('en-US', { timeZone: 'UTC' })).toJSON();
  } else {
    data.due = undefined;
  }

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/edit`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { message: 'Failed to edit user tasks', status: "failure" };
    }

    revalidatePath("/tasks");
    return { message: '', status: "success" };

  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return { message: "Failure adding new task", status: "failure" };
    }

    return { message: "unknown issue transmitting data", status: "failure" };
  }
}

export async function getCurrentEmailAddress() {
  const schema = z.object({
    email: z.string()
  });

  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/getEmail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
    });

    if (!res.ok) {
      return "failure sending";
    }

    const resData = await res.json();
    const parse = schema.safeParse(resData);
    if (!parse.success) {
      return "failure";
    }

    return parse.data.email;
  } catch {

  }
}
