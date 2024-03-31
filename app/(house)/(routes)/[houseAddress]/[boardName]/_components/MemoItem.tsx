import { Memo } from '@/types';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale)

interface MemoItemProps {
  memo: Memo;
}

const MemoItem = ({
  memo
}: MemoItemProps) => {
  return (
    <div className='flex flex-col gap-y-2 border rounded-md p-3 text-base'>
      <div className='flex gap-x-2 text-sm'>
        <span className='font-semibold'>{memo.name}</span>
        <span className='text-muted-foreground'>{format(memo.created_at, 'ko')}</span>
      </div>
      <div className='whitespace-pre-line'>{memo.content}</div>
    </div>
  );
}

export default MemoItem;