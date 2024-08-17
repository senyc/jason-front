'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function resetPassword(
  prevState: { message: string; status: string },
  formData: FormData,
) {
  const schema = z.object({
    token: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
  });

  const parse = schema.safeParse({
    token: formData.get('id'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  });

  if (!parse.success) {
    return {
      message: 'Please try ressetting your password again',
      status: 'failure',
    };
  }

  try {
    const req = await fetch(
      `http://${process.env.JASON_SERVICE_SERVICE_HOST}:${process.env.JASON_SERVICE_SERVICE_PORT}/api/user/login/password/reset`,
      {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: parse.data.token,
          password: parse.data.password,
        }),
      },
    );

    if (!req.ok) {
      return {
        message: `Failed to send reset password email ${req.statusText}`,
        status: 'failure',
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message:
        'failed to rest password, please check your network and try again',
      status: 'failure',
    };
  }
  redirect('/login/reset/success');
}
