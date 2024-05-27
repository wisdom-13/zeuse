import { Poppins } from 'next/font/google';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '400']
});

const logoVariants = cva(
  "font-semibold",
  {
    variants: {
      size: {
        sm: 'text-md',
        md: 'text-3xl',
        lg: 'text-6xl font-bold',
      }
    },
    defaultVariants: {
      size: 'sm',
    }
  }
);

const getImageSize = (size: string) => {
  switch (size) {
    case 'sm':
      return 20;
    case 'md':
      return 25;
    case 'lg':
      return 45;
    default:
      return 20;
  }
};

interface LogoProps extends VariantProps<typeof logoVariants> { }


export const Logo = ({ size }: LogoProps) => {
  const imageSize = getImageSize(size || 'sm');

  return (
    <div className='hidden md:flex items-center gap-x-2'>
      <Image
        src='/logo.svg'
        width={imageSize}
        height={imageSize}
        alt='logo'
        className='dark:hidden'
      />
      <Image
        src='/logo-dark.svg'
        width={imageSize}
        height={imageSize}
        alt='logo'
        className='hidden dark:block'
      />
      <p className={cn(logoVariants({ size }))} >
        ZEUSE
      </p>
    </div>
  )
}