'use client';

import { House } from '@/types';
import { ElementRef, useRef } from 'react';
import { ChevronLeft, ChevronRight, Minus } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

import { useSidebarState } from '@/hooks/useSidebarState';
import { useHouseBuildByAddress } from '@/api/useHouseBuilder';

import Logo from './Logo';
import Menu from './Menu';

interface HouseMenuProps {
  houses?: House[];
}

const Navigation = ({
  houses
}: HouseMenuProps) => {
  const { houseAddress } = useParams<{ houseAddress: string }>();
  const { data: houseBuild, isLoading, isError } = useHouseBuildByAddress(houseAddress);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { isResetting, isCollapsed, isMouseNavOver, setIsMouseNavOver, resetWidth, collapse } = useSidebarState(isMobile);
  const NavIcon = isMouseNavOver ? ChevronLeft : Minus;

  if (isLoading || !houseBuild) {
    return 'loading'
  }

  if (isError) {
    return 'error'
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
        <div className='flex flex-col justify-start w-60 h-full'>
          <Logo houseBuild={houseBuild} />
          <Menu houseBuild={houseBuild} houses={houses} />
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
            ? <ChevronRight strokeWidth={2.5} onClick={() => resetWidth(sidebarRef, navbarRef)} role='button' className='w-6 h-6 text-muted-foreground' />
            : <NavIcon
              strokeWidth={isMouseNavOver ? 2.5 : 3}
              onClick={(I) => collapse(sidebarRef, navbarRef)}
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