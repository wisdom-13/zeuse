'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import ThemeContent from './settingContent/ThemeContent';
import useGetHouseBuildByAddress from '@/hooks/useGetHouseBuildByAddress';
import HouseContent from './settingContent/HouseContent';
import WidgetContent from './settingContent/WidgetContent';

export const SettingModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const param = useParams();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useSettingModal();
  const [activeMenu, setActiveMenu] = useState('theme');

  const { house, updateHouse } = useGetHouseBuildByAddress(param.houseAddress);

  if (!house) {
    return false;
  }

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
              active={activeMenu === 'profile'}
              onClick={() => setActiveMenu('profile')}
            />
            <SettingItem
              icon={Users}
              label='패밀리'
              active={activeMenu === 'family'}
              onClick={() => setActiveMenu('family')}
            />
          </div>
          <div className='text-sm font-semibold text-muted-foreground p-2 cursor-default'>하우스</div>
          <div className='flex flex-col gap-y-2 mb-4'>
            <SettingItem
              icon={Home}
              label='하우스'
              active={activeMenu === 'house'}
              onClick={() => setActiveMenu('house')}
            />
            <SettingItem
              icon={Notebook}
              label='게시판'
              active={activeMenu === 'board'}
              onClick={() => setActiveMenu('board')}
            />
          </div>
          <div className='text-sm font-semibold text-muted-foreground p-2 cursor-default'>스타일</div>
          <div className='flex flex-col gap-y-2'>
            <SettingItem
              icon={PencilRuler}
              label='테마'
              active={activeMenu === 'theme'}
              onClick={() => setActiveMenu('theme')}
            />
            <SettingItem
              icon={Box}
              label='위젯'
              active={activeMenu === 'widget'}
              onClick={() => setActiveMenu('widget')}
            />
          </div>
        </div>

        {activeMenu == 'house' && <HouseContent house={house} updateHouse={updateHouse} />}
        {activeMenu == 'theme' && <ThemeContent house={house} updateHouse={updateHouse} />}
        {activeMenu == 'widget' && <WidgetContent house={house} updateHouse={updateHouse} />}

      </DialogContent>
    </Dialog>
  )
}