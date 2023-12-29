import { Dispatch } from "react";
import { z } from 'zod';
import UserAuthRequest from "@annotations/userAuthRequest";

const jwtResponse = z.object({
  jwt: z.string()
});

const onLogin = (email: string, password: string, setRequest: Dispatch<UserAuthRequest>) => {
  const makeRequest = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await fetch('http://localhost:8080/api/user/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      if (res.ok) {
        const resData = await res.json();
        const validData = jwtResponse.parse(resData);
        setRequest({
          pending: false,
          completed: true,
          jwt: validData.jwt
        });

      } else {
        setRequest({
          pending: false,
          completed: true,
          err: res.statusText
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
        err: message
      });
    }
  };
  setRequest({
    pending: true,
    completed: false,
  });
  makeRequest();

};

export default onLogin;
