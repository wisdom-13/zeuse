import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '400']
});

export const Logo = () => {
  return (
    <div className='hidden md:flex items-center gap-x-2'>
      <Image
        src='/logo.svg'
        width='20'
        height='20'
        alt='logo'
        className='dark:hidden'
      />
      <Image
        src='/logo-dark.svg'
        width='20'
        height='20'
        alt='logo'
        className='hidden dark:block'
      />
      <p className={cn('font-semibold', font.className)}>
        ZEUSE
      </p>
    </div>
  )
}