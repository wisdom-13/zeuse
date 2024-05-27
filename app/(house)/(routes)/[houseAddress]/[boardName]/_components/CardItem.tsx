import { PostFamily } from '@/types';

import Image from 'next/image';

import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { getPublicUrl } from '@/util/getPublicUrl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

register('ko', koLocale)

interface CardItemProps {
  post: PostFamily;
}

const CardItem = ({
  post
}: CardItemProps) => {
  // TODO: 덧글수

  return (
    <div className='flex flex-col gap-y-1 rounded-md border text-sm cursor-pointer overflow-hidden'>
      <div className='flex flex-col w-full gap-y-2'>
        {
          post.thumbnail_path && (
            <div className='w-full h-44 relative'>
              <Image
                src={getPublicUrl(`post/${post.thumbnail_path}`)}
                alt='thumbnail'
                fill
                className='object-cover'
              />
            </div>
          )
        }
        <div className='p-3'>
          <h3 className='text-base font-semibold text-primary truncate mb-2'>{post.title}</h3>
          <div className='flex items-center text-muted-foreground gap-x-2 text-sm'>
            <Avatar className='h-6 w-6'>
              {
                post.family.avatar_path ? (
                  <AvatarImage asChild src={post.family.avatar_path ? getPublicUrl(`profile/${post.family.avatar_path}`) : post.family.avatar_url}>
                    <Image src={getPublicUrl(`profile/${post.family.avatar_path}`)} alt='avatar' fill />
                  </AvatarImage>
                ) : (
                  <AvatarImage src={post.family.avatar_url} />
                )
              }
              <AvatarFallback className='text-xs'>{post.family.nick_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className='font-semibold'>{post.family.nick_name}</span>
            <span className='text-muted-foreground'>{format(post.created_at, 'ko')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;