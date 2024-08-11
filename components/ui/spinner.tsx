import { Loader } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva(
  "text-muted-foreground animate-spin",
  {
    variants: {
      size: {
        default: 'h-4 w-4',
        sm: 'h-2 w-2',
        lg: 'h-6 w-6',
        icon: 'h-10 w-10',
      }
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants> { }

export const Spinner = ({
  size,
}: SpinnerProps) => {
  return (
    <Loader className={cn(spinnerVariants({ size }))} />
  )
}

export const FullScreenSpinner = () => {
  return (
    <div className='z-[99999] fixed inset-0 bg-white/60 m-auto'>
      <div className='top-[50%] left-[50%] z-[99999] fixed bg-background shadow-lg p-6 border rounded-lg translate-x-[-50%] translate-y-[-50%] duration-200'>
        <Spinner size='lg' />
      </div>
    </div>
  );
}