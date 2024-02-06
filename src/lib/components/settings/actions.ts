'use server';

import { ACCESS_TOKEN_COOKIE_NAME } from "@/src/config/constants";
import apiKey from "@/src/lib/annotations/apiKey";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { z } from "zod";

export async function getAllApiKeys() {
  const schema = z.array(z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
    lastAccessed: z.string().nullish(),
    expiration: z.string(),
    creationDate: z.string()
  }));

  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/key/all`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });
    if (!res.ok) {
      return [];
    }
    const resData = await res.json();
    const data = schema.safeParse(resData);

    if (!data.success) {
      return [];
    }

    return data.data;

  } catch (e) {
    console.log(e);
    return;
  }
}

export async function generateNewApikey({
  label,
  description,
  expiration
}: {
  label: string;
  description?: string;
  expiration: string | null;
}) {
  const schema = z.object({
    id: z.string(),
    apikey: z.string()
  });

  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }
  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/key/new`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({ label: label, description: description, expiration: expiration })
    });

    if (!res.ok) {
      return "";
    }

    const resData = await res.json();
    const parse = schema.safeParse(resData);
    console.log(resData);
    if (!parse.success) {
      return "";
    }

    return parse.data;

  } catch (e) {
    console.log(e);
  }
}

export async function generateNewApiKeyFormAction(prevState: { res: any, message: string, status: string; }, formData: FormData) {
  const schema = z.object({
    label: z.string(),
    description: z.string().optional(),
    expiration: z.string().nullish(),
  });

  // To improve the look of the calendar thing lets look at some of the github styles and how they were able to adjust the look of it
  const parse = schema.safeParse({
    label: formData.get("label"),
    description: formData.get("description"),
    expiration: formData.get("expiration"),
  });

  if (!parse.success) {
    return { message: "Please enter all required fields", status: "failure" };
  }

  // Here we should check that the expiration data is logical e.g. not in the past
  // This value should be something like 30,60,90 days in the future, not just a date picker

  if (parse.data.expiration) {
    parse.data.expiration = new Date(new Date(parse.data.expiration).toLocaleString('en-US', { timeZone: 'UTC' })).toJSON();
  } else {
    parse.data.expiration = null;
  }
  console.log(parse.data.expiration);

  const res = await generateNewApikey({
    label: parse.data.label,
    description: parse.data.description,
    expiration: parse.data.expiration
  });

  if (res === "") {
    return { message: "Failure generating api key please try again", status: "failure" };
  }

  return { message: "Success generating new api key", status: "success", res: res };
}


export async function revokeApiKey(id: string) {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/key/revoke?id=${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    return { message: "failure revoking key, please try again", state: "failure" };
  }

  return { message: "Successfully revoked api key", state: "success" };
}

export async function revokeAllApiKeys() {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/key/revoke/all`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    return { message: "failure revoking all keys, please try again", state: "failure" };
  }

  return { message: "Successfully revoked api keys", state: "success" };
}


export async function changeEmailAddress(prevState: { message: string, status: string; }, formData: FormData) {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  const schema = z.object({
    newEmail: z.string(),
  });

  try {
    const parse = schema.safeParse({
      newEmail: formData.get("newEmail"),
    });

    if (!parse.success) {
      return { message: "Please enter all required fields", status: "failure" };
    }

    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/changeEmailAddress`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({ newEmail: parse.data.newEmail })
    });

    if (!res.ok) {
      return { message: "Failure changing email address, please try again", status: "failure" };
    }

    return { message: "Success changing email address", status: "success" };
  } catch {
    return { message: "Failure changing email address, please try again", status: "failure" };
  }
}

export async function deleteAccount(prevState: { message: string, status: string; }, formData: FormData) {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  const schema = z.object({
    confirmation: z.string(),
  });

  try {
    const parse = schema.safeParse({
      confirmation: formData.get("confirmation")
    });

    if (!parse.success) {
      return { message: "Please confirm your action", status: "failure" };
    }

    if (parse.data.confirmation != formData.get("currentEmail")) {
      return { message: "Confirmation did not match", status: "failure" };
    }

    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/deleteAccount`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      return { message: "Failure removing account, please try again", status: "failure" };
    }

    return { message: "Successfully removed account", status: "success" };
  } catch {
    return { message: "Failure removing account, please try again", status: "failure" };
  }
}
