'use client';

import { Logo } from './Logo';


export const Navbar = () => {
  return (
    <div className='z-50 bg-background fixed top-0 flex items-center w-full p-6'>
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>

      </div>
    </div>
  )
}