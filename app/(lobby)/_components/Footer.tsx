'use client';

import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';

export const Footer = () => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const headleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      toast.error(error?.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <div className='flex items-center w-full p-6 bg-background z-50'>
      <Logo />
      <div className='md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground'>
        {user ? (
          <>
            <Button
              onClick={headleLogout}
              variant='ghost'
              className='bg-card text-card-foreground px-6 py-2'
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={authModal.onOpen}
              variant='ghost'
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
