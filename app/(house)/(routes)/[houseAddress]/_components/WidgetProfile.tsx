'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useHouseBuild from '@/hooks/useHouseBuild';
import { cn } from '@/lib/utils';
import { Widget } from '@/types';

interface WidgetProfileProps {
  widget: Widget;
}
const WidgetProfile = ({
  widget
}: WidgetProfileProps) => {
  const { houseBuild } = useHouseBuild();
  const owner = houseBuild?.family.filter((item) => item.is_owner)[0];

  const horizontal = widget.grid.col > widget.grid.row;

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
        <AvatarImage src={owner?.avatar_url} />
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