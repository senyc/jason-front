'use client';

import Link from 'next/link';
import onLogin from "@actions/login";
import { inputSetter } from '@utils';

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPassword("");
    setEmail("");
    onLogin(email, password)(e);
  };

  return (
    <div className='flex h-full flex-col items-center justify-center gap-16'>
      <form onSubmit={onSubmit}>
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input type="text" value={email} placeholder="What is your email address..." className="input input-bordered min-w-80 w-full" onChange={inputSetter(setEmail)} />
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input type="text" placeholder="What is your password..." value={password} className="input input-bordered min-w-80 w-full" onChange={inputSetter(setPassword)} />
        <button type="submit" className="btn btn-s mt-9">Login</button>
      </form>

      <Link className="link" href='/login/new'>Sign up</Link>
    </div>
  );
};
