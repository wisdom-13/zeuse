'use client';

import { ArrowRight } from 'lucide-react';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from './Logo';

export const Main = () => {
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();

  return (
    <div className='max-w-3xl space-y-4 mt-10'>
      <Logo size='lg' />
      <p>ZEUSE는 현재 <span className='font-bold'>BETA</span> 버전입니다.</p>

      <div className='bg-card text-card-foreground px-6 py-2'>
        <>
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
      <br />
      <Link href='/zeuse' className='flex items-center justify-center gap-x-2'>
        🏠 <span className='font-semibold'>모델 하우스</span>
      </Link>
    </div>
  )
}