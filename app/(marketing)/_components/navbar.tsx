'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import { cn } from '@/lib/utils'

import { Logo } from './logo';

export const Navbar = () => {
  return (
    <div className='z-50 bg-background fixed top-0 flex items-center w-full p-6'>
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        {/* {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button variant='ghost' size='sm'>
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='sm'>
                Get Zite free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/document'>
                Enter Zite
              </Link>
            </Button>
            <UserButton afterSignOutUrl='/' />
          </>
        )} */}
      </div>
    </div>
  )
}