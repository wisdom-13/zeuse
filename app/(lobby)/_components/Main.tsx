'use client';

import { ArrowRight } from 'lucide-react';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/ui/button';

export const Main = () => {
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-6xl font-bold'>
        <span className='underline'>ZEUSE</span>
      </h1>
      <div className='bg-card text-card-foreground px-6 py-2'>
        <>
          {!isLoading && !user && (
            <Button
              onClick={authModal.onOpen}
            >
              ZEUSE 시작하기
              <ArrowRight className='h-4 w-4 ml-2' />
            </Button>
            // <p>! 지금은 회원가입이 불가능합니다.</p>
          )}
        </>
      </div>
    </div>
  )
}