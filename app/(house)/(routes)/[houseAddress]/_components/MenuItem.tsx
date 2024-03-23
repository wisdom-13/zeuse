'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  type?: string;
  isButton?: boolean;
  href?: string;
  onClick?: () => void;
}

const MenuItem = ({
  icon: Icon,
  label,
  active,
  type,
  isButton = false,
  href,
  onClick
}: MenuItemProps) => {

  const iconFill = (type !== 'link') && { 'fill': 'text-card-foreground' };

  return (
    <>
      {!isButton && href && (
        <Link
          href={href}
          target={type == 'link' ? '_blank' : '_self'}
          className={cn(
            `flex flex-row h-auto items-center w-full gap-x-4 p-3 text-lg font-medium cursor-pointer text-card-foreground transition hover:bg-primary/5 rounded-md`,
            active && 'text-primary'
          )}
        >
          <Icon {...iconFill} />
          <p className='truncate w-full text-left'>{label}</p>
        </Link>
      )}
      {isButton && (
        <button
          className={cn(
            `flex flex-row h-auto items-center w-full gap-x-4 p-3 text-base font-medium cursor-pointer text-card-foreground transition hover:bg-primary/5 rounded-md`,
            active && 'text-primary'
          )}
          onClick={onClick}
        >
          <Icon size={20} />
          <p className='truncate w-full text-left'>{label}</p>
        </button>
      )}
    </>
  );
}

export default MenuItem;