'use client';

import { BoardList as BoardListType, PostFamily } from '@/types';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import CardView from './CardView';
import ListView from './ListView';

interface BoardListProps {
  board: BoardListType
}

const BoardList = ({
  board
}: BoardListProps) => {
  const param = useParams();
  const data = board.posts;

  const [value, setValue] = useState('');

  const filteredData = data.slice().filter((post: PostFamily) => {
    return post.title.includes(value) || post.content.includes(value);
  });
  const posts = filteredData.sort((a: PostFamily, b: PostFamily) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <>
      <div className='flex flex-wrap items-center justify-between mt-8'>
        <h1 className='text-3xl font-semibold'>
          {board.title}
        </h1>
        <Button>새 글 작성</Button>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full mt-4' placeholder='제목 또는 내용으로 검색' />
      </div>
      <ScrollArea className='w-full h-full flex flex-col gap-y-4'>
        {posts.length === 0 ? (
          <div className='flex flex-col gap-y-4'>
            {posts.length === 0 && (
              <div className='mt-4 text-muted-foreground'>
                작성된 포스트가 없습니다.
              </div>
            )}
          </div>
        ) : (
          <>
            {board.type == 'card' && <CardView board={board} />}
            {board.type == 'list' && <ListView board={board} />}
          </>
        )}
      </ScrollArea>

    </>
  );
}

export default BoardList;