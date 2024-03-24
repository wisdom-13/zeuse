'use client';

import { ElementRef, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronsLeft, Heart, LogIn, LogOut, MenuIcon, Settings } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { House, HouseBuild } from '@/types';

import { HouseList } from '@/components/HouseList';
import useAuthModal from '@/hooks/useAuthModal';
import MenuItem from './MenuItem';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useSettingModal from '@/hooks/useSettingModal';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

interface HouseMenuProps {
  house: HouseBuild;
  houses?: House[];
}

const Navigation = ({
  house,
  houses
}: HouseMenuProps) => {
  const param = useParams();
  const { user, isLoading } = useUser();
  const authModal = useAuthModal();
  const settingModal = useSettingModal();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsRestting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const owner = house.family.find((item) => item.is_owner);

  useEffect(() => {
    if (house.style.mode == 'dark') {
      document.body.classList.add('dark');
    }
    document.body.classList.add(`color-${house.style.color}`);
    document.body.classList.add(`radius-${house.style.radius}`);
  }, []);


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
        className={cn('group/sidebar h-screen bg-card text-card-foreground border-y border-r border-black overflow-y-auto overflow-x-hidden relative w-60 flex flex-col rounded-r-md z-[9999]',
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

          <div className='flex flex-col justify-center gap-y-2 p-8 min-h-44 mt-6'>
            <Link href={`/${house.address}`}>
              {true ? (
                <Image
                  src={house.style.logo_image}
                  alt='logo'
                  // fill
                  width={240}
                  height={240}
                  className='object-cover relative'
                />
              ) : (
                <h1 className='text-3xl text-center font-bold'>
                  {house.title}
                </h1>
              )}
            </Link>
          </div>

          <div className='flex flex-col gap-y-2 py-2 px-8'>
            {house.board && house.board.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
              <MenuItem
                key={item.id}
                label={item.title}
                type={item.type}
                icon={Heart}
                href={(item.type == 'link' ? item.link : `/${param.houseAddress}/${item.name}`)}
              />
            ))}
          </div>

          <div className='flex flex-col gap-y-2 p-2 mt-auto'>
            {!isLoading && owner?.user_id === user?.id && (
              <MenuItem
                label='설정'
                icon={Settings}
                isButton={true}
                onClick={settingModal.onOpen}
              />
            )}
            {!isLoading && user && (
              <MenuItem
                label='로그아웃'
                icon={LogOut}
                isButton={true}
                onClick={headleLogout}
              />
            )}

            {!isLoading && user && houses && (
              <HouseList position='start' houses={houses} />
            )}
          </div>

        </div>
      </aside >
      <div
        ref={navbarRef}
        className={cn('absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full')}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && <MenuIcon onClick={resetWidth} role='button' className='h-6 w-6' />}
        </nav>
      </div>
    </>
  );
}

export default Navigation;