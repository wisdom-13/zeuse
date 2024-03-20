'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui/dialog';
import useAuthModal from '@/hooks/useAuthModal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader className='pb-2'>
          <h2 className='text-lg font-medium text-center'>
            Welcom ZEUSE
          </h2>
          <p className='text-sm text-center'>
            Login to your accout
          </p>
        </DialogHeader>
        <Auth
          theme='light'
          providers={['github']}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#facc15',
                  brandAccent: '#ECB930',
                }
              }
            },
          }}
        />
      </DialogContent>
    </Dialog>
  )
}