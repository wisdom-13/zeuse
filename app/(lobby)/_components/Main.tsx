'use client';

import { ArrowRight } from 'lucide-react';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/Spinner';

export const Main = () => {
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-6xl font-bold'>
        <span className='underline'>ZEUSE</span>
      </h1>
      <div className='bg-white px-6 py-2'>
        <>
          {isLoading &&
            <div className='w-fit m-auto'>
              <Spinner size='lg' />
            </div>
          }
          {!isLoading && !user && (
            <Button
              onClick={authModal.onOpen}
            >
              ZEUSE 시작하기
              <ArrowRight className='h-4 w-4 ml-2' />
            </Button>
          )}
        </>
      </div>
    </div>
  )
}