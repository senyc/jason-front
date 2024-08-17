'use client';

import { useFormState } from 'react-dom';

import { login } from './actions';
import Link from 'next/link';
import PasswordInput from './passwordInput';
import { useState } from 'react';

const initialState = {
  status: '',
  message: '',
};

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className='flex h-full flex-col items-center justify-center gap-3'>
      <section className='w-1/6 min-w-96'>
        <h1 className='mb-4 border-b-[0.2px] pb-2 text-3xl font-bold'>Login</h1>
        <form action={formAction}>
          <div className='label'>
            <label className='label-text' htmlFor='email-input'>
              Email
            </label>
          </div>
          <input
            autoFocus
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id='email-input'
            name='email'
            placeholder='Email...'
            className='input input-bordered w-full min-w-full'
          />
          <div className='label'>
            <label className='label-text' htmlFor='password-input'>
              Password
            </label>
          </div>
          <PasswordInput
            id='password-input'
            placeholder='Password...'
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${state && state.status != '' ? 'border-red-500' : ''} input input-bordered w-full min-w-full`}
          />
          <div className='mb-2 h-2 pt-2'>
            {state && state.status != 'success' && (
              <span className='flex items-center text-xs font-medium tracking-wide text-red-500'>
                {state && state.message}
              </span>
            )}
          </div>
          <div className='mt-3 flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <input type='checkbox' className='checkbox' />
              <p>Remember Me?</p>
            </div>
            <Link className='link' href='/login/forgot'>
              Forgot Password?
            </Link>
          </div>
          <button type='submit' className='btn-s btn my-6'>
            Login
          </button>
        </form>
        <div className='flex min-w-full justify-center'>
          <Link className='link' href='/login/new'>
            Sign up
          </Link>
        </div>
      </section>
    </main>
  );
}
