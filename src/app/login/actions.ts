'use server';

import { z } from 'zod';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/config/constants';

const jwtResponse = z.object({
  jwt: z.string(),
  message: z.string().optional()
});

export async function login(prevState: { message: string, status: string; }, formData: FormData) {
  const schema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parse.success) {
    return { message: `Failed to login ${parse.error}`, status: "failure" };
  }

  const data = parse.data;

  try {
    const res = await fetch(`${process.env.BACKEND_DOMAIN}/api/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status == 401) {
      return { message: "Incorrect password, please try again", status: "failure" };
    } else if (!res.ok) {
      return { message: "Problem logging in, please try again", status: "failure" };
    }

    // Getting the token response
    const resToken = await res.json();
    const parseJwt = jwtResponse.safeParse(resToken);

    if (!parseJwt.success) {
      return { message: "Failure loggin in", status: "failure" };
    }
    let monthFromNow = new Date();
    monthFromNow.setMonth(monthFromNow.getMonth() + 2);
    cookies().set(ACCESS_TOKEN_COOKIE_NAME, parseJwt.data.jwt, { sameSite: "strict", secure: true, httpOnly: true, expires: monthFromNow });

  } catch (e) {
    console.log(e);
    return { message: "Failure loggin in", status: "failure" };
  }

  // Keep this out of the try catch block (it throws an error itself)
  redirect('/tasks');
}
