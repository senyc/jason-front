'use client';

import { useFormState } from "react-dom";

import { login } from './actions';
import Link from 'next/link';
import { useEffect, useRef } from "react";

const initialState = {
  status: "",
  message: ""
};

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <div className="min-w-96">
        <h1 className="mb-4 w-full border-b-[0.2px] pb-2 text-3xl font-bold">
          Login
        </h1>
        <form action={formAction}>
          <div className="label">
            <label
              className="label-text"
              htmlFor="email-input"
            >Email</label>
          </div>
          <input
            ref={inputRef}
            type="text"
            id="email-input"
            name="email"
            placeholder="Email..."
            className="input input-bordered w-full min-w-full"
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
            name="password"
            className={`${state && state.status != "" ? 'border-red-500' : ""} input input-bordered w-full min-w-full`}
          />
          {(state && state.status != "success") && (
            <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500"
            >{state && state.message}</span>
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
    </main>
  );
};
