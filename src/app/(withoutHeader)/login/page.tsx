'use client';

import Link from 'next/link';
import onLogin from "@actions/login";
import { inputSetter } from '@utils';

import { FormEvent, useEffect, useState } from 'react';
import UserAuthRequest from '@annotations/userAuthRequest';
import { addJwtToCookies, getJwtToken } from '@auth';
import { useRouter } from 'next/navigation';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAuthRequest, setUserAuthRequest] = useState<UserAuthRequest>({
    pending: false,
    completed: false,
    err: undefined,
    jwt: undefined,
    code: 200
  });

  useEffect(() => {
    // if (getJwtToken() != undefined) {
    //   router.replace('/tasks');
    // }

    if (userAuthRequest.completed && userAuthRequest.err == undefined) {
      addJwtToCookies(userAuthRequest.jwt as string);
      router.replace('/tasks');
    }
  }, [userAuthRequest]);


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassword("");
    setEmail("");
    onLogin(email, password, setUserAuthRequest);
  };

  const showPasswordFailure = userAuthRequest.completed && userAuthRequest.err != undefined && userAuthRequest.code == 401;
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className="min-w-96">
        <h1 className="mb-4 w-full border-b-[0.2px] pb-2 text-3xl font-bold">
          Login
        </h1>
        <form onSubmit={onSubmit}>
          <div className="label">
            <label
              className="label-text"
              htmlFor="email-input"
            >Email</label>
          </div>
          <input
            type="text"
            id="email-input"
            value={email}
            placeholder="Email..."
            className="input input-bordered w-full min-w-full"
            onChange={inputSetter(setEmail)}
          />
          <div className="label">
            <label
              className="label-text"
              htmlFor="password-input"
            >Password</label>
          </div>
          <input
            type="password"
            id="password-input"
            placeholder="password..."
            value={password}
            className={`${showPasswordFailure ? 'border-red-500' : ""} input input-bordered w-full min-w-full`}
            onChange={inputSetter(setPassword)}
          />
          {(showPasswordFailure) && (
            <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500"
            >{userAuthRequest.err}</span>
          )}
          <button
            type="submit"
            className="btn btn-s mb-8 mt-6"
          >Login</button>
        </form>
        <div className="flex min-w-full justify-center">
          <Link className="link " href='/login/new'>Sign up</Link>
        </div>
      </div>
    </div>
  );
};
