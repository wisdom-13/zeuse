'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SettingItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SettingItem = ({
  icon: Icon,
  label,
  active,
  onClick
}: SettingItemProps) => {

  return (
    <>
      <button
        className={cn(
          `flex items-center gap-x-2 w-full text-base hover:bg-primary/10 p-2 rounded-md`,
          active && 'bg-primary/10'
        )}
        onClick={onClick}
      >
        <Icon className='h-4 w-4 shrink-0' />
        <p className='truncate w-full text-left'>{label}</p>
      </button>
    </>
  );
}

export default SettingItem;