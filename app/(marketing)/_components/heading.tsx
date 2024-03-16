'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const Heading = () => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user, userDetails } = useUser();

  console.log(userDetails)

  const headleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    // if (error) {
    //   toast.error(error.message);
    // } else {
    //   toast.success('Logged out!');
    // }
  }

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-6xl font-bold'>
        <span className='underline'>ZEUSE</span>
      </h1>
      <h3 className='text-2xl font-medium'>
        온라인 내 집 마련
      </h3>
      {user ? (
        <>
          <Button
            onClick={authModal.onOpen}
          >
            회원
            <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
          <Button
            onClick={headleLogout}
            className='bg-white px-6 py-2'
          >
            Logout
          </Button>
        </>

      ) : (
        <>
          <Button
            onClick={authModal.onOpen}
          >
            ZEUSE 시작하기
            <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </>
      )}

    </div>
  )
}