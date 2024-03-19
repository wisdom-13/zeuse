'use client';

import { ElementRef, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { Board } from '@/types';

import { HouseList } from '@/components/HouseList';

interface HouseMenuProps {
  menus?: Board[];
}

const Navigation = ({
  menus
}: HouseMenuProps) => {
  const param = useParams();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsRestting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

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

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn('group/sidebar h-full bg-white overflow-y-auto relative flex w-60 flex-col z-[9999]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div className='w-60'>
          <div
            onClick={collapse}
            role='button'
            className='h-6 w-6 text-muted-foreground rounded-sm
          hover:bg-neutral-100 absolute
          top-2 right-3 opacity-0 group-hover/sidebar:opacity-100'
          >
            <ChevronsLeft className='h-6 w-6' />
          </div>

          <div className='flex flex-col mt-4'>
            {menus && menus.map((item) => (
              <Link key={item.id} href={`/${param.houseAddress}/${item.name}`}>
                {item.title}
              </Link>
            ))}
          </div>
          {/* <HouseList /> */}
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