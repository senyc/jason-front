import { deleteAccount } from './actions';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/config/constants';
import notifyFailure from '../../actions/notifyFailure';
import notifySuccess from '../../actions/notifySuccess';
import { ToastContainer } from 'react-toastify';

interface DeleteAccountProps {
  cancelAction: () => void;
  emailAddress: string;
}

const initialState = {
  status: '',
  message: '',
};

export default function DeleteAccount({
  cancelAction,
  emailAddress,
}: DeleteAccountProps) {
  const [deletionConfirmation, setDeletionConfirmation] = useState('');
  const [deleteAccountState, formAction] = useFormState(
    deleteAccount,
    initialState,
  );
  const router = useRouter();

  useEffect(() => {
    if (deleteAccountState.status == 'failure') {
      notifyFailure(deleteAccountState.message);
    } else if (deleteAccountState.status == 'success') {
      notifySuccess(deleteAccountState.message);
      cancelAction();
      deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
      router.replace('/login');
    }
  }, [deleteAccountState]);

  return (
    <div>
      <h2 className='font-sembold border-b-[.5px] border-gray-200 text-xl'>
        Delete Account
      </h2>
      <form action={formAction} className='flex flex-col'>
        <div className='mb-3 mt-3 flex flex-col'>
          <input type='hidden' value={emailAddress} name='currentEmail' />
          <label
            className='text-md mb-1 font-semibold'
            htmlFor='input-confirmation'
          >
            Please confirm this action by typing the email associated with this
            account
          </label>
          <input
            className='input-borderd text-md input h-7 max-w-72 rounded-sm border-gray-200 focus:outline-none'
            required
            id='input-confirmation'
            name='confirmation'
            autoFocus
            value={deletionConfirmation}
            onChange={(e) => setDeletionConfirmation(e.target.value)}
            type='text'
            placeholder='Confirmation'
          />
        </div>
        <div className='mt-5 flex flex-row items-center justify-between border-t-[.5px] border-gray-200 pt-2'>
          <button
            className='disabled: mb-[2px] h-10 min-w-10 rounded-lg border-[.5px] border-red-500 p-2 text-center text-sm font-semibold text-red-400 transition duration-75 ease-in enabled:hover:bg-red-400 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
            type='submit'
            disabled={deletionConfirmation.length == 0}
          >
            Delete Account
          </button>
          <button
            className='dark:hover-bg-gray-700 max-w-36 rounded-lg border-[.5px] border-gray-200 p-2 text-sm font-normal transition duration-75 ease-in hover:bg-gray-100'
            type='button'
            onClick={cancelAction}
          >
            Cancel
          </button>
        </div>
      </form>
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
    </div>
  );
}
