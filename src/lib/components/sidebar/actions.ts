'use server';

import { ACCESS_TOKEN_COOKIE_NAME } from "@/src/config/constants";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { z } from "zod";

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

export async function getAccountAge() {
  const schema = z.object({
    accountCreationDate: z.string()
  });

  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/getAccountCreationDate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
    });

    if (!res.ok) {
      return "-1";
    }

    const resData = await res.json();
    const parse = schema.safeParse(resData);
    if (!parse.success) {
      return "-1";
    }

    return parse.data.accountCreationDate;
  } catch {
    return "-1";
  }
}

/*
Gets the users profile photo selection, if failure just return the default photo
*/
export async function getProfilePhoto() {
  const jwt = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!jwt) {
    redirect('/login');
  }

  const schema = z.object({
    profilePhoto: z.string()
  });

  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/site/tasks/getProfilePhoto`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    });

    if (!res.ok) {
      return "0";
    }

    const resData = await res.json();
    const parse = schema.safeParse(resData);

    if (!parse.success) {
      return "0";
    }

    return parse.data.profilePhoto;
  } catch {
    return "0";
  }
}
