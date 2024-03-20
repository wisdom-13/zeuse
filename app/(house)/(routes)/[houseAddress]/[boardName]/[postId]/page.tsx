import moment from 'moment';
import getPostById from '@/action/getPostById';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BoardPageProps {
  params: {
    houseAddress: string,
    boardName: string,
    postId: string,
  }
}

const PostPage = async ({
  params: { postId }
}: BoardPageProps) => {
  const post = await getPostById(postId);

  if (!post) {
    return false;
  }

  return (
    <ScrollArea className='w-full h-full p-6'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex flex-wrap items-center justify-between gap-y-4 p-6 mt-4'>
          <div className='flex items-center gap-x-4'>
            <h1 className='text-3xl font-semibold'>
              {post.title}
            </h1>
          </div>
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-x-2'>
              <Avatar className='h-6 w-6'>
                <AvatarImage src={post.family.avatar_url} />
                <AvatarFallback className='text-xs'>{post.family.nick_name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className='font-semibold'>{post.family.nick_name}</span>
              <span className='text-muted-foreground '>
                {moment(post.created_at).format('YYYY.MM.DD hh:mm')}
              </span>
            </div>
            <div className='flex gap-x-3'>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-4 px-6'>
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
          {post.content}
        </div>
      </div>
    </ScrollArea>
  );
}

export default PostPage;