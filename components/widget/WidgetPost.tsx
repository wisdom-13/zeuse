'use client';
import { Widget, WidgetTmp } from '@/types';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { List, StickyNote } from 'lucide-react';

import useGetPostById from '@/hooks/useGetPostById';
import Editor from '@/app/(house)/(routes)/[houseAddress]/_components/Editor';
import { ScrollArea } from '../ui/scroll-area';

register('ko', koLocale)

interface WidgetPostProps {
  widget: Widget | WidgetTmp;
}

const WidgetPost = ({
  widget
}: WidgetPostProps) => {
  console.log(widget.option_id)
  const { post } = useGetPostById(widget.option_id);
  const param = useParams();

  if (!post) {
    return (
      <div className='w-full h-full flex items-center justify-center rounded-md'>
        <StickyNote className='text-gray-500' />
      </div>
    );
  }

  return (
    <div className='w-full h-full'>
      <ScrollArea className='w-full h-full'>
        <h3 className='text-3xl font-semibold mb-4 p-6 pb-0'>{post.title}</h3>
        <Editor
          editable={false}
          initialContent={post.content}
        />
      </ScrollArea>
    </div>
  );
}

export default WidgetPost;