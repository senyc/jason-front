'use client';

import { useFormState } from 'react-dom';
import { newUser } from './actions';
import PasswordInput from '../passwordInput';

const initialState = {
  status: '',
  message: '',
};

export default function New() {
  const [state, formAction] = useFormState(newUser, initialState);

  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <div className='min-w-96'>
        <h1 className='mb-4 w-full border-b-[0.2px] pb-2 text-3xl font-bold'>
          New Account
        </h1>
        <form action={formAction}>
          <div className='label'>
            <label className='label-text' htmlFor='email-input'>
              Email
            </label>
          </div>
          <input
            autoFocus
            required
            type='email'
            name='email'
            id='email-input'
            placeholder='Email...'
            className={`${state && state.status == 'accountExistsFailure' ? 'border-red-500' : ''} input input-bordered w-full min-w-full`}
          />
          {state && state.status == 'accountExistsFailure' && (
            <span className='ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500'>
              Account already exists with that email address
            </span>
          )}
          <div className='label'>
            <label className='label-text' htmlFor='password-input'>
              Password
            </label>
          </div>
          <PasswordInput
            required
            id='password-input'
            placeholder='Passsword...'
            name='password'
            className={`${(state && state.status == 'passwordConfirmationFailure') || state.status == 'passwordLengthError' ? 'border-red-500' : ''} input input-bordered w-full min-w-full`}
          />
          {((state && state.status == 'passwordConfirmationFailure') ||
            state.status == 'passwordLengthError') && (
            <span className='ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500'>
              {state.message}
            </span>
          )}
          <div className='label'>
            <label className='label-text' htmlFor='password-confirmation-input'>
              Confirm password
            </label>
          </div>
          <PasswordInput
            required
            id='password-confirmation-input'
            placeholder='Confirm password...'
            name='passwordConfirmation'
            className={`${state && state.status == 'passwordConfirmationFailure' ? 'border-red-500' : ''} input input-bordered w-full min-w-full`}
          />
          {state && state.status == 'passwordConfirmationFailure' && (
            <span className='ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500'>
              {state.message}
            </span>
          )}
          <button type='submit' className='btn-s btn mt-6'>
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
