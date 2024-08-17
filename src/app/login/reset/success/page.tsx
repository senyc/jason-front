'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ResetSuccess() {

  useEffect(() => {
    setTimeout(function () {
      window.location.href = '/login';
    }, 4000);
  },[]);

  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <div className='min-w-96'>
        <h2 className='mb-4 w-full border-b-[0.2px] pb-2 text-xl font-bold'>
          Password successfully reset, you should be redirected to the login
          page soon, otherwise click this{' '}
          <Link className='underline' href='/login'>
            Link
          </Link>
        </h2>
      </div>
    </main>
  );
}
