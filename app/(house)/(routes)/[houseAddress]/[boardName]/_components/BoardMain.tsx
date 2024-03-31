'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import useGetBoardByName from '@/hooks/useGetBoardByName';
import useHouseBuild from '@/hooks/useHouseBuild';
import { Skeleton } from '@/components/ui/skeleton';

import SearchBar from './SearchBar';
import PostList from './PostList';
import MemoList from './MemoList';

const BoardList = () => {
  const { houseId } = useHouseBuild();
  const param = useParams();

  const { board, isLoading } = useGetBoardByName(houseId, param.boardName);
  const [value, setValue] = useState('');

  if (!board || isLoading) {
    return (
      <div>
        <Skeleton className='w-10' />
      </div>
    )
  }
  return (
    <>
      <div className='flex flex-wrap items-center justify-between mt-8'>
        <h1 className='text-3xl font-semibold'>
          {board.title}
        </h1>
        {/* <Button>새 글 작성</Button> */}
        <SearchBar value={value} handleChange={setValue} />
      </div>
      {board.type == 'post' && <PostList id={board.id} view={board.view} searchKeyword={value} />}
      {board.type == 'memo' && <MemoList id={board.id} searchKeyword={value} />}
    </>
  );
}

export default BoardList;