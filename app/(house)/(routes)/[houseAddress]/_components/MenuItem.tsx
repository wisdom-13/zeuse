'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  isLink?: boolean;
  href?: string;
  onClick?: () => void;
}

const MenuItem = ({
  icon: Icon,
  label,
  active,
  isLink = true,
  href,
  onClick
}: MenuItemProps) => {

  return (
    <>
      {isLink && href && (
        <Link
          href={href}
          className={cn(
            `flex flex-row h-auto items-center w-full gap-x-4 p-3 text-lg font-medium cursor-pointer text-black transition hover:bg-primary/5 rounded-md`,
            active && 'text-primary'
          )}
        >
          <Icon />
          <p className='truncate w-full text-left'>{label}</p>
        </Link>
      )}
      {!isLink && (
        <button
          className={cn(
            `flex flex-row h-auto items-center w-full gap-x-4 p-3 text-lg font-medium cursor-pointer text-black transition hover:bg-primary/5 rounded-md`,
            active && 'text-primary'
          )}
          onClick={onClick}
        >
          <Icon />
          <p className='truncate w-full text-left'>{label}</p>
        </button>
      )}
    </>
  );
}

export default MenuItem;