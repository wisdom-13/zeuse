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

const localization = {
  variables: {
    sign_in: {
      email_label: '이메일',
      password_label: '비밀번호',
      button_label: '로그인',
      loading_button_label: '로그인 중...',
      social_provider_text: '{{provider}}로 로그인',
      email_input_placeholder: '이메일을 입력하세요',
      password_input_placeholder: '비밀번호를 입력하세요',
      link_text: '이미 계정이 있으신가요?'
    },
    sign_up: {
      email_label: '이메일',
      password_label: '비밀번호',
      button_label: '회원가입',
      loading_button_label: '회원가입 중...',
      social_provider_text: '{{provider}}로 회원가입',
      email_input_placeholder: '이메일을 입력하세요',
      password_input_placeholder: '비밀번호를 입력하세요',
      link_text: '계정이 없으신가요?'
    },
    forgotten_password: {
      email_label: '이메일',
      password_label: '비밀번호',
      email_input_placeholder: '이메일을 입력하세요',
      button_label: '비밀번호 재설정 메일 발송',
      loading_button_label: '비밀번호 재설정 메일 발송 중...',
      link_text: '비밀번호를 잊어 버렸나요?',
      confirmation_text: '이메일에서 비밀번호 재설정 링크를 확인하세요.',
    }
  }
  // 필요한 다른 텍스트들...
};

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
          <h2 className='text-4xl font-bold text-center'>
            ⚡️ ZEUSE
          </h2>
        </DialogHeader>
        <Auth
          theme='light'
          providers={['github']}
          supabaseClient={supabaseClient}
          localization={localization}

          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#171719',
                  brandAccent: '#171719f0',
                }
              }
            },
          }}
        />
      </DialogContent>
    </Dialog>
  )
}