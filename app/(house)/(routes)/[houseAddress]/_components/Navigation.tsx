'use client';

import { House, HouseBuild } from '@/types';
import { ElementRef, useRef, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { ChevronLeft, ChevronRight, Heart, LogIn, LogOut, Minus, Settings } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { getPublicUrl } from '@/util/getPublicUrl';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useAuthModal from '@/hooks/useAuthModal';
import useSettingModal from '@/hooks/useSettingModal';
import { useUser } from '@/hooks/useUser';

import { HouseList } from '@/components/HouseList';
import MenuItem from './MenuItem';
import useHouseBuild from '@/hooks/useHouseBuild';

interface HouseMenuProps {
  houses?: House[];
}

const Navigation = ({
  houses
}: HouseMenuProps) => {
  const { houseBuild } = useHouseBuild();
  const { user, isLoading } = useUser();
  const param = useParams();
  const authModal = useAuthModal();
  const settingModal = useSettingModal();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const supabaseClient = useSupabaseClient();


  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsRestting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMouseNavOver, setIsMouseNavOver] = useState(false);

  const owner = houseBuild?.family.find((item) => item.is_owner);
  const NavIcon = isMouseNavOver ? ChevronLeft : Minus;

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsRestting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
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
        className={cn(
          'custom-card group/sidebar h-screen bg-card text-card-foreground !border-l-0 overflow-y-auto overflow-x-hidden relative w-60 flex flex-col rounded-r-md z-[9999]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div className='w-60 h-full flex flex-col justify-start'>
          <div className='flex flex-col justify-center gap-y-2 p-8 min-h-44 mt-6'>
            <Link href={`/${houseBuild?.address}`} className='relative w-full min-h-20'>
              {houseBuild?.style.logo_image ? (
                <Image
                  src={getPublicUrl(`style/${houseBuild?.style.logo_image}`)}
                  alt='logo'
                  fill
                  onLoad={() => setImageLoaded(true)}
                  className={cn(
                    imageLoaded ? 'opacity-100' : 'opacity-0',
                    'pointer-events-none',
                    'object-contain'
                  )}
                />
              ) : (
                <h1 className='text-3xl text-center font-bold'>
                  {houseBuild?.title}
                </h1>
              )}
            </Link>
          </div>

          <div className='flex flex-col gap-y-2 py-2 px-8'>
            {houseBuild?.board && houseBuild?.board.sort((a, b) => a.order - b.order).map((item) => (
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
            {!isLoading && user && owner?.user_id === user?.id && (
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
            {!isLoading && !user && (
              <MenuItem
                label='로그인'
                icon={LogIn}
                isButton={true}
                onClick={authModal.onOpen}
              />
            )}
          </div>

        </div>
      </aside>
      <div
        ref={navbarRef}
        onMouseOver={() => setIsMouseNavOver(true)}
        onMouseLeave={() => setIsMouseNavOver(false)}
        className={cn('absolute top-1/2 duration-300 left-60 -translate-y-1/2 flex items-center',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full')}
      >
        <nav className='bg-transparent px-1 py-2 w-full'>
          {isCollapsed
            ? <ChevronRight strokeWidth={2.5} onClick={resetWidth} role='button' className='h-6 w-6 text-muted-foreground' />
            : <NavIcon
              strokeWidth={isMouseNavOver ? 2.5 : 3}
              onClick={collapse}
              role='button'
              className={cn(
                'h-6 w-6 text-muted-foreground transition-all',
                !isMouseNavOver && 'rotate-90'
              )}
            />
          }
        </nav>
      </div>
    </>
  );
}

export default Navigation;