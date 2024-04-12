'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import useHouseBuild from '@/hooks/useHouseBuild';
import { getPublicUrl } from '@/util/getPublicUrl';

import {
  Dialog,
  DialogContent
} from '@/components/ui/dialog';
import useSettingModal from '@/hooks/useSettingModal';
import { Box, Home, Notebook, PencilRuler, User, Users } from 'lucide-react';

import SettingItem from '../SettingItem';
import ProfileContent from './settingContent/ProfileContent';
import FamilyContent from './settingContent/FamilyContent';
import HouseContent from './settingContent/HouseContent';
import BoardContent from './settingContent/BoardContent';
import ThemeContent from './settingContent/ThemeContent';
import WidgetContent from './settingContent/WidgetContent';

export const SettingModal = () => {
  const { houseBuild: house, setHouseBuild } = useHouseBuild();
  const { onClose, isOpen } = useSettingModal();
  const [activeMenu, setActiveMenu] = useState('house');

  const themeWrap = document.getElementById('theme-wrap');

  useEffect(() => {
    if (!house) return;

    const style = `
      background: ${house?.style.bg_image ? `url(${getPublicUrl(`style/${house.style.bg_image}`)})` : `${house?.style.bg_color}`};
      --radius:${house?.style.box_style.radius}rem;
      --boxOpacity: ${house?.style.box_style.opacity};
    `;

    const className = cn(
      house?.style.mode == 'dark' && 'dark',
      house?.style.color && `color-${house?.style.color}`,
      house?.style.box_style.border !== 'none' && `border-${house?.style.box_style.border}`
    )

    document.body.className = className
    document.body.style.cssText = style;

    if (themeWrap) {
      themeWrap.className = `h-screen flex ${className}`;
      themeWrap.style.cssText = style;
    }
  }, [house, themeWrap]);



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
              label='외관'
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

        <div className='flex flex-col justify-between w-full pt-4 px-2'>
          {activeMenu == 'profile' && <ProfileContent house={house} setHouseBuild={setHouseBuild} />}
          {activeMenu == 'family' && <FamilyContent house={house} setHouseBuild={setHouseBuild} />}

          {activeMenu == 'house' && <HouseContent house={house} setHouseBuild={setHouseBuild} />}
          {activeMenu == 'board' && <BoardContent house={house} setHouseBuild={setHouseBuild} />}

          {activeMenu == 'theme' && <ThemeContent house={house} setHouseBuild={setHouseBuild} />}
          {activeMenu == 'widget' && <WidgetContent house={house} setHouseBuild={setHouseBuild} />}
        </div>

      </DialogContent>
    </Dialog>
  )
}