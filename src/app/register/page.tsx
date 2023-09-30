"use client"
import Link from 'next/link';
import React from 'react';
import RegisterForm from '@/components/RegisterForm'; 

export default function Register() {
  return (
    <div className='flex flex-col h-screen sm:flex-row sm:justify-center sm:items-center'>
        <Link href={'..'} className='float top-5 left-5 fixed'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
        </Link>
        <div className='flex items-center justify-center p-4 bg-blue-500 sm:w-5/12 sm:h-4/6 sm:rounded-tl-xl sm:rounded-bl-xl'>
          <img src="/register.svg" alt="Register" />
        </div>
        <div className='flex flex-col px-4 pt-2 bg-slate-200 sm:w-4/12 sm:h-5/6 sm:rounded-lg'>
          <div className='flex justify-center'>
            <img className='rounded-full' src="/genie.jpg" alt="Logo" width={70} height={70} />
          </div>
          <div className='p-3 flex flex-col'>
            <p className='text-lg font-bold'>Create account <span className='text-md font-normal text-slate-600'>now </span></p>
            <p className='text-slate-600'>and get 3 free wishes</p>
          </div>
          <RegisterForm />
        </div>
    </div>
  )
}
