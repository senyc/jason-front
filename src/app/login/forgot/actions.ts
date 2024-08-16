'use server';

import { z } from 'zod';

export async function forgotPassword(
  prevState: { message: string; status: string },
  formData: FormData,
) {
  const schema = z.object({
    email: z.string(),
  });

  const parse = schema.safeParse({
    email: formData.get('email'),
  });

  if (!parse.success) {
    return {
      message: `Failed to reset password ${parse.error}`,
      status: 'failure',
    };
  }

  try {
    const req = await fetch(
      `http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/api/user/login/password/sendResetEmail`,
      {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parse.data),
      },
    );

    if (!req.ok) {
      return {
        message: `Failed to send reset password email ${req.statusText}`,
        status: 'failure',
      };
    }

    return {
      message: `You should have recieved an email to ${parse.data.email} if you have an account with us`,
      status: 'success',
    };
  } catch (e) {
    console.error(e);
    return {
      message: 'Failed to reset password, check your network and try again:',
      status: 'failure',
    };
  }
}
