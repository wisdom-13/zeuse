import { PostFamily } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { getPublicUrl } from '@/util/getPublicUrl';

register('ko', koLocale)

interface CardItemProps {
  post: PostFamily;
}

const CardItem = ({
  post
}: CardItemProps) => {
  // TODO: 덧글수

  return (
    <div className='flex flex-col gap-y-1 rounded-md border p-3 text-sm cursor-pointer'>

      <div className='flex flex-col w-full gap-y-2'>
        {
          post.thumbnail_path && (
            <div className='w-full h-44 relative'>
              <Image
                src={getPublicUrl(`thumbnail/${post.thumbnail_path}`)}
                alt='thumbnail'
                fill
                className='object-cover'
              />
            </div>
          )
        }
        <h3 className='text-lg font-semibold text-primary truncate'>{post.title}</h3>
        <div className='flex items-center text-muted-foreground gap-x-2'>
          <Avatar className='h-6 w-6'>
            <AvatarImage src={post.family.avatar_url} />
            <AvatarFallback className='text-xs'>{post.family.nick_name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className='font-semibold'>{post.family.nick_name}</span>
          <span className='text-muted-foreground '>{format(post.created_at, 'ko')}</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem;