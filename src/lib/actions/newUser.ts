import { Dispatch } from "react";
import { z } from 'zod';
import UserAuthRequest from "@annotations/userAuthRequest";

const jwtResponse = z.object({
  jwt: z.string().optional(),
  message: z.string().optional()
});

const onNewUser = (email: string, password: string, setRequest: Dispatch<UserAuthRequest>) => {
  const makeRequest = async () => {
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
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      const parsedData = jwtResponse.parse(resData);
      if (res.ok) {
        setRequest({
          pending: false,
          completed: true,
          jwt: parsedData.jwt,
          code: res.status
        });

      } else {
        setRequest({
          pending: false,
          completed: true,
          err: parsedData.message,
          code: res.status
        });
      }
    } catch (e) {
      console.log(e);
      let message = "unknown error";
      if (e instanceof Error) {
        message = e.message;
      }
      setRequest({
        pending: false,
        completed: true,
        err: message,
        code: 500
      });
    }
  };
  setRequest({
    pending: true,
    completed: false,
    code: 200
  });
  makeRequest();

};

export default onNewUser;
