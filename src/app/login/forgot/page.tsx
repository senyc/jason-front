'use client';

import { useFormState } from 'react-dom';
import { forgotPassword } from './actions';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { FormEvent, useEffect, useState } from 'react';
import notifySuccess from '@/src/lib/actions/notifySuccess';
import { ToastContainer } from 'react-toastify';

const initialState = {
  status: '',
  message: '',
};

const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
export default function Reset() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  function onSubmit(e: FormEvent) {
    if (!validateEmail(email)) {
      e.preventDefault();
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  }
  //@ts-ignore
  const [state, formAction] = useFormState(forgotPassword, initialState);

  useEffect(() => {
    if (state?.status === 'success') {
      setEmailError('');
      setEmail('');
      notifySuccess(state.message);
    }
  }, [state]);

  return (
    <main className='flex h-full flex-col items-center justify-center gap-3'>
      <section className='w-1/6'>
        <h1 className='mb-4 w-full border-b-[0.2px] pb-2 text-3xl font-bold'>
          Reset Password
        </h1>
        <form onSubmit={onSubmit} action={formAction}>
          <div className='label'>
            <label className='label-text' htmlFor='email-input'>
              Email
            </label>
          </div>
          <input
            autoFocus
            type='email'
            id='email-input'
            name='email'
            value={email}
            placeholder='Email...'
            onChange={(e) => setEmail(e.target.value)}
            className={`${state?.status === 'failure' || emailError ? 'border-red-500' : ''} input input-bordered w-full min-w-full`}
          />
          <div className='mb-2 h-4 pt-2'>
            {emailError && (
              <span className='flex items-center text-xs font-medium tracking-wide text-red-500'>
                {emailError}
              </span>
            )}
            {state?.status == 'failure' && (
              <span className='flex items-center text-xs font-medium tracking-wide text-red-500'>
                {state?.message}
              </span>
            )}
          </div>
          <button type='submit' className='btn btn-md my-6'>
            Reset password
          </button>
        </form>
        <div className='flex min-w-full justify-center'>
          <Link className='link' href='/login'>
            Back to login
          </Link>
        </div>
      </section>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        limit={3}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        closeButton={false}
      />
    </main>
  );
}
