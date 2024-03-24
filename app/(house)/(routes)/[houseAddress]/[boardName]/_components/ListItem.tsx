import { PostFamily } from '@/types';
import moment from 'moment';

interface ListItemProps {
  post: PostFamily;
}

const ListItem = ({
  post
}: ListItemProps) => {
  // TODO: 덧글수

  return (
    <div className='flex justify-between gap-y-1 rounded-md border p-3 text-sm cursor-pointer'>
      <h3 className='text-md font-semibold text-primary truncate'>{post.title}</h3>
      <div className='flex items-center text-muted-foreground gap-x-2'>
        <span className='font-semibold w-16 truncate'>{post.family.nick_name}</span>
        <span className='text-muted-foreground w-20'>{moment(post.created_at).format('YYYY.MM.DD')}</span>
      </div>
    </div>
  );
}

export default ListItem;