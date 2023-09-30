import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { useStore } from '@/store';

export default function Header() {
  const [ showSettings, setSettings ] = useState(true);
  const [user] = useStore(state => [state.user]) 

  const handleSettings = () =>{
    setSettings(!showSettings)
  }

  return (
    <div className='flex relative flex-row shadow-lg justify-between items-center font-sans px-5 py-5 bg-red-500 text-white
                    sm:justify-between sm:flex-row'>
        <div>
            <p className=''>Balad-on Lechon Services</p>
        </div>
        <div className='flex justify-center items-center cursor-pointer rounded-full hover:bg-slate-600 p-2 duration-200 sm:hidden'
              onClick={handleSettings}>
          <FaBars />
        </div>
        <div className={`flex flex-col text-lg absolute bg-white shadow-lg text-black top-14 right-2 w-40 p-5 gap-5
                        sm:items-center sm:text-white sm:relative sm:flex-row sm:gap-2 sm:top-auto sm:right:auto sm:w-auto sm:bg-transparent sm:shadow-none sm:bg-none 
                        ${showSettings ? '' : 'hidden' }`}>
            <p className='sm:text-slate-300 font-semibold font-mono px-1'>
              {user.name}
            </p>
            <button className='text-sm w-full text-start px-1 py-2'
            onClick={() => signOut()}>LOGOUT</button>
        </div>
        
        
    </div>
  )
}
