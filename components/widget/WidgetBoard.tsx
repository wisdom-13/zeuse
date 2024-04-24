'use client';

import { PostFamily, Widget, WidgetTmp } from '@/types';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { List } from 'lucide-react';

import useGetBoardById from '@/hooks/useGetBoardById';
import useWidgetEdit from '@/hooks/useWidgetEdit';

register('ko', koLocale)

interface WidgetBoardProps {
  widget: Widget | WidgetTmp;
}

const WidgetBoard = ({
  widget
}: WidgetBoardProps) => {
  const { board } = useGetBoardById(widget.option_id);
  const widgetEdit = useWidgetEdit();
  const param = useParams();

  if (!board) {
    return (
      <div className='w-full h-full flex items-center justify-center rounded-md'>
        <List className='text-gray-500' />
      </div>
    );
  }

  return (
    <div className='p-6'>
      {
        widget.option_bool && (
          <h3 className='text-3xl font-semibold mb-4'>{board?.title}</h3>
        )
      }
      <ul>
        {board.posts.sort((a: PostFamily, b: PostFamily) => +new Date(b.created_at) - +new Date(a.created_at)).map((item) => (
          <li key={item.id} className='h-10'>
            {widgetEdit.isEditing ? (
              <div className='flex justify-between items-center'>
                <span className='w-2/3 truncate'>{item.title}</span>
                <span className='text-sm text-muted-foreground'>{format(item.created_at, 'ko')}</span>
              </div>
            ) : (
              <Link
                href={`/${param.houseAddress}/${board.name}/${item.id}`}
                className='flex justify-between items-center'
              >
                <span className='w-2/3 truncate'>{item.title}</span>
                <span className='text-sm text-muted-foreground'>{format(item.created_at, 'ko')}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div >
  );
}

export default WidgetBoard;