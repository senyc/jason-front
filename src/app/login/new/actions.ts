'use server';
import { z } from 'zod';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/config/constants';

const jwtResponse = z.object({
  jwt: z.string(),
  message: z.string().optional()
});

export async function newUser(prevState: { message: string, status: string; }, formData: FormData) {
  const schema = z.object({
    email: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation")
  });

  if (!parse.success) {
    return { message: "Please try again", status: "failure" };
  }

  const data = parse.data;

  if (data.password != data.passwordConfirmation) {
    return { message: "Passwords do not match, please try again", status: "passwordConfirmationFailure" };
  }

  if (data.password.length <= 5) {
    return { message: "Please try a longer password", status: "passwordLengthError" };
  }
  try {
    const res = await fetch(`http://${process.env.JASON_SERVICE_SERVICE_HOST}/api/user/new`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status == 401) {
      return { message: "An account already exists with this username, please try another one or login", status: "accountExistsFailure" };
    } else if (!res.ok) {
      return { message: "Failure making an account, please try again", status: "failure" };
    }

    // Getting the token response
    const resToken = await res.json();
    const parseJwt = jwtResponse.safeParse(resToken);

    if (!parseJwt.success) {
      return { message: "Failure making an account, please try again", status: "failure" };
    }

    let monthFromNow = new Date();
    monthFromNow.setMonth(monthFromNow.getMonth() + 2);
    cookies().set(ACCESS_TOKEN_COOKIE_NAME, parseJwt.data.jwt, { secure: true, httpOnly: true, sameSite: "strict", expires: monthFromNow });

  } catch (e) {
    console.log(e)
    return { message: "Failure loggin in", status: "failure" };
  }
  redirect("/tasks");
}
