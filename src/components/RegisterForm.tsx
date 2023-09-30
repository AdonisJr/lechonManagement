"use client"
import React, { useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '@/store';
import { signIn } from 'next-auth/react';

interface User {
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  confirmPassword: String,
}

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useStore(state=> [state.isLoading, state.setLoading])

  const [validationError, setValidation] = useState<String>('')

  const [user, setUser] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const showToastMessage = (message: String) => {
    toast.success(message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000
    });
  };

  const firstNameChange = (e: any) =>{
    setUser({...user, first_name: e.target?.value})
  }
  const lastNameChange = (e: any) =>{
    setUser({...user, last_name: e.target?.value})
  }
  const emailChange = (e: any) =>{
    setUser({...user, email: e.target?.value})
  }

  const passwordChange = (e: any) =>{
    setUser({...user, password: e.target?.value})
  }
  const confirmPasswordChange = (e: any) =>{
    setUser({...user, confirmPassword: e.target?.value})
  }

  const handleValidation = (e: any) =>{
    setValidation('')

    if(!user.first_name || user.last_name.length === 0) 
      return setValidation('First Name is required')
    if(user.first_name.length < 2 || user.first_name.length >30) 
      return setValidation('First name should be between 2 and 30 characters long')
    if(!user.last_name || user.last_name.length === 0) 
      return setValidation('Last Name is required')
    if(user.last_name.length < 2 || user.last_name.length >30) 
      return setValidation('Last name should be between 2 and 30 characters long')
    
    if(!user.email || user.email.length === 0) 
      return setValidation('Email is required')

    if(!user.password || user.password.length === 0) 
      return setValidation('Password is required')

    if(user.password.length < 8) return setValidation('Password should be at least 8 characters long')
    
    if(user.password !== user.confirmPassword) return setValidation('Password does not match')

    setValidation('')

  }

  const handleRegistration = async(e: any) => {
    e.preventDefault();
    if(validationError) return
    setLoading(true)
    const data = await fetch('/api/user',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
    setLoading(false)
    console.log(data)

    showToastMessage('Registration successful! You can now log in.')
    setTimeout(() => {
      router.push('/')
    }, 2500);
  }

  return (
    <div>

    
    <form onSubmit={handleRegistration}
    className='flex flex-col gap-2 justify-center py-4 px-3 rounded-lg bg-white'>
        <ToastContainer />
        <div className='flex gap-1'>
          <input className={validationError.search('First') !== -1 ? 'p-1 w-6/12 sm:p-2 px-2 rounded-md border-2 border-red-500' : 'p-1 w-6/12 sm:p-2 px-2 rounded-md border-2 border-slate-400'}
            type="text" 
            placeholder='First Name'
            name='firstName'
            onChange={firstNameChange}
            onBlur={handleValidation}/>
          <input className={validationError.search('Last') !== -1 ? 'p-1 w-6/12 sm:p-2 px-2 rounded-md border-2 border-red-500' : 'p-1 w-6/12 sm:p-2 px-2 rounded-md border-2 border-slate-400'} 
            type="text" 
            placeholder='Last Name'
            name='lastName'
            onChange={lastNameChange}
            onBlur={handleValidation}/>
        </div>
        <input className={validationError.search('Email') !== -1 ? 'p-1 sm:p-2 px-2 rounded-md border-2 border-red-500' : 'p-1 sm:p-2 px-2 rounded-md border-2 border-slate-400' } 
          type="email" 
          placeholder='Email'
          name='email'
          onChange={emailChange}
          onBlur={handleValidation}/>
        <input className={validationError.search('Password') !== -1 ? 'p-1 sm:p-2 px-2 rounded-md border-2 border-red-500' : 'p-1 sm:p-2 px-2 rounded-md border-2 border-slate-400' } 
          type="password" 
          placeholder='Password'
          name='password'
          onChange={passwordChange}
          onKeyUp={handleValidation}/>
        <input className={validationError.search('does not match') !== -1 ? 'p-1 sm:p-2 px-2 rounded-md border-2 border-red-500' : 'p-1 sm:p-2 px-2 rounded-md border-2 border-slate-400' }
          type="password" 
          placeholder='Confirm Password'
          name='password'
          onChange={confirmPasswordChange}
          onKeyUp={handleValidation}/>
        <p className='text-sm text-red-500 font-semibold px-3'>{validationError}</p>
        <button type='submit'
          className='flex disabled items-center gap-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded justify-center'>
            {isLoading ? 'Please wait.' : 'Register'}</button>
          <a onClick={()=> signIn()} className='text-center hover:underline cursor-pointer'>Already have an account?</a>

      </form>
          
    </div>
  )
}
