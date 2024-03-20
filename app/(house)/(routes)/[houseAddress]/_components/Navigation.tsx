'use client';

import { ElementRef, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronsLeft, Heart, LogIn, LogOut, MenuIcon, Settings } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { House, HouseBuild } from '@/types';

import { HouseList } from '@/components/HouseList';
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import MenuItem from './MenuItem';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useSettingModal from '@/hooks/useSettingModal';

interface HouseMenuProps {
  house: HouseBuild;
  houses?: House[];
}

const Navigation = ({
  house,
  houses
}: HouseMenuProps) => {
  const param = useParams();
  const { user } = useUser();
  const authModal = useAuthModal();
  const settingModal = useSettingModal();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsRestting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const owner = house.family.find((item) => item.is_owner)

  console.log(settingModal)

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsRestting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)'
      );
      navbarRef.current.style.setProperty(
        'left',
        isMobile ? '100%' : '240px'
      );

      setTimeout(() => setIsRestting(false), 300);
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsRestting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsRestting(false), 300);
    }
  }

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
    <>
      <aside
        ref={sidebarRef}
        className={cn('group/sidebar h-screen bg-white border-y border-r border-black overflow-y-auto overflow-x-hidden relative w-60 flex flex-col rounded-r-md z-[9999]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div className='w-60 h-full flex flex-col justify-start'>
          <div
            onClick={collapse}
            role='button'
            className='h-6 w-6 text-block rounded-sm hover:bg-primary/5 absolute top-2 right-3 opacity-0 group-hover/sidebar:opacity-100'
          >
            <ChevronsLeft className='h-6 w-6' />
          </div>

          <div className='flex flex-col justify-center gap-y-2 p-2 h-24 mt-4'>
            <h1 className='text-3xl text-center font-bold'>
              {house.title}
            </h1>
          </div>

          <div className='flex flex-col gap-y-2 p-2'>
            {house.board && house.board.map((item) => (
              <MenuItem
                key={item.id}
                label={item.title}
                icon={Heart}
                href={`/${param.houseAddress}/${item.name}`}
              />
            ))}
          </div>

          <div className='flex flex-col gap-y-2 p-2 mt-auto'>
            {owner?.user_id === user?.id && (
              <MenuItem
                label='설정'
                icon={Settings}
                isLink={false}
                onClick={settingModal.onOpen}
              />
            )}

            {!user ? (
              <MenuItem
                label='로그인'
                icon={LogIn}
                isLink={false}
                onClick={authModal.onOpen}
              />
            ) : (
              <MenuItem
                label='로그아웃'
                icon={LogOut}
                isLink={false}
                onClick={headleLogout}
              />
            )}

            {user && houses && (
              <HouseList position='start' houses={houses} />
            )}
          </div>

        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn('absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full')}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && <MenuIcon onClick={resetWidth} role='button' className='h-6 w-6 text-white' />}
        </nav>
      </div>
    </>
  );
}

export default Navigation;