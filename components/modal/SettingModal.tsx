'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose
} from '@/components/ui/dialog';
import useSettingModal from '@/hooks/useSettingModal';
import { Box, Home, Notebook, PencilRuler, User, Users } from 'lucide-react';
import SettingItem from '../SettingItem';

export const SettingModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useSettingModal();


  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className='flex w-[calc(100%-15rem)] max-w-[1200px] h-[calc(100%-10rem)]'>

        <div className='w-60 h-full rounded-md bg-primary/5 py-4 px-2'>
          <div className='text-sm font-semibold text-muted-foreground p-2 cursor-default'>계정</div>
          <div className='flex flex-col gap-y-2 mb-4'>
            <SettingItem
              icon={User}
              label='프로필'
              active
            />
            <SettingItem
              icon={Users}
              label='패밀리'
            />
          </div>
          <div className='text-sm font-semibold text-muted-foreground p-2 cursor-default'>하우스</div>
          <div className='flex flex-col gap-y-2 mb-4'>
            <SettingItem
              icon={Home}
              label='하우스'
            />
            <SettingItem
              icon={Notebook}
              label='게시판'
            />
          </div>
          <div className='text-sm font-semibold text-muted-foreground p-2 cursor-default'>스타일</div>
          <div className='flex flex-col gap-y-2'>
            <SettingItem
              icon={PencilRuler}
              label='테마'
            />
            <SettingItem
              icon={Box}
              label='위젯'
            />
          </div>
        </div>

        <div className=' w-[800px] rounded-md'>
          흠냐 메뉴... 왤케 드리니..
        </div>

        {/* <DialogHeader className='pb-2'>
          <h2 className='text-lg font-medium text-center'>
            Setting
          </h2>
          <p className='text-sm text-center'>
            Login to your accout
          </p>
        </DialogHeader> */}
      </DialogContent>
    </Dialog>
  )
}