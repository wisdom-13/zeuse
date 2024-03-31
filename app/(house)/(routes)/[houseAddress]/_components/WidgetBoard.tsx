import useGetBoardById from '@/hooks/useGetBoardById';
import useHouseBuild from '@/hooks/useHouseBuild';
import { PostFamily, Widget } from '@/types';
import { ArrowRight, List, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale)

interface WidgetBoardProps {
  widget: Widget;
}

const WidgetBoard = ({
  widget
}: WidgetBoardProps) => {
  const { board } = useGetBoardById(widget.board_id);
  const param = useParams();


  if (!board) {
    return (
      <div className='w-full h-full flex flex items-center justify-center bg-gray-100'>
        <List className='text-gray-500' />
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h3 className='text-3xl font-semibold mb-5'>{board?.title}</h3>
      <ul>
        {board.posts.sort((a: PostFamily, b: PostFamily) => +new Date(b.created_at) - +new Date(a.created_at)).map((item) => (
          <li key={item.id} className='h-10'>
            <Link
              href={`/${param.houseAddress}/${board.name}/${item.id}`}
              className='flex justify-between items-center'
            >
              <span className='w-2/3 truncate'>{item.title}</span>
              <span className='text-sm text-muted-foreground'>{format(item.created_at, 'ko')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WidgetBoard;