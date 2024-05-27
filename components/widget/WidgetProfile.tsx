'use client';

import { Widget, WidgetTmp } from '@/types';

import useHouseBuild from '@/hooks/useHouseBuild';
import { cn } from '@/lib/utils';
import { getPublicUrl } from '@/util/getPublicUrl';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

interface WidgetProfileProps {
  widget: Widget | WidgetTmp;
}
const WidgetProfile = ({
  widget
}: WidgetProfileProps) => {
  const { houseBuild } = useHouseBuild();
  const owner = houseBuild?.family.filter((item) => item.is_owner)[0];

  const horizontal = widget.grid && widget.grid.col > widget.grid.row;

  return (
    <div className={cn(
      'flex items-center justify-center gap-4 h-full p-4 ',
      !horizontal && 'flex-col text-center'
    )}>
      <Avatar
        className={cn(
          'w-24 h-24 border border-black',
          horizontal ? 'w-20 h-20' : 'w-24 h-24'
        )}
      >
        <AvatarImage src={owner?.avatar_path ? getPublicUrl(`profile/${owner.avatar_path}`) : owner?.avatar_url} />
        {
          owner?.avatar_path ? (
            <AvatarImage asChild src={owner.avatar_path ? getPublicUrl(`profile/${owner.avatar_path}`) : owner.avatar_url}>
              <Image src={getPublicUrl(`profile/${owner.avatar_path}`)} alt='avatar' fill />
            </AvatarImage>
          ) : (
            <AvatarImage src={owner?.avatar_url} />
          )
        }
        <AvatarFallback className='text-xs'>{owner?.nick_name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <h2 className='text-xl font-semibold mb-1'>{owner?.nick_name}</h2>
        <p className={cn(
          'text-sm text-left whitespace-pre-line',
          horizontal ? 'line-clamp-2' : 'line-clamp-4'
        )}>{owner?.description}</p>
      </div>
    </div>
  );
}

export default WidgetProfile;