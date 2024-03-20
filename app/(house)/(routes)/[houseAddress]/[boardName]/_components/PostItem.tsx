import { PostFamily } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';

import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { Badge } from '@/components/ui/badge';

register('ko', koLocale)

interface PostItemProps {
  post: PostFamily;
}

const PostItem = ({
  post
}: PostItemProps) => {
  // TODO: 덧글수

  return (
    <div className='flex flex-col gap-y-1 rounded-md border p-3 text-sm cursor-pointer'>
      <div className='flex items-center text-muted-foreground gap-x-2'>
        <Avatar className='h-6 w-6'>
          <AvatarImage src={post.family.avatar_url} />
          <AvatarFallback className='text-xs'>{post.family.nick_name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className='font-semibold'>{post.family.nick_name}</span>
        <span className='text-muted-foreground '>{format(post.created_at, 'ko')}</span>
      </div>
      <div className='flex flex-1 w-full flex-wrap'>
        <div className='flex-1 flex flex-col gap-y-2'>
          <h3 className='text-xl font-semibold text-primary'>{post.title}</h3>
          {/* <p className='h-10 line-clamp-2 text-muted-foreground'>{post.content}</p> */}
          <div className='h-6 mt-2'>
            {post.tag && (
              <Badge variant="outline">{post.tag}</Badge>
            )}
          </div>
        </div>
        {
          true && (
            <div className='w-52 bg-purple-50 rounded-md'>
              이미지
            </div>
          )
        }
      </div>
    </div>
  );
}

export default PostItem;