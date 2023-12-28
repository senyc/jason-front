import { FormEvent } from "react";
import { z } from 'zod';

const jwtResponse = z.object({
  jwt: z.string()
});

const onNewUser = (email: string, password: string ) => {
  return async (e: FormEvent<HTMLFormElement>) => {
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await fetch('http://localhost:8080/api/user/new', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      if (res.ok) {
        const resData = await res.json();
        const validData = jwtResponse.parse(resData);
        console.log(validData.jwt);
      }
    } catch (e) {
      console.log(e);
    }
  };

};

export default onNewUser;
