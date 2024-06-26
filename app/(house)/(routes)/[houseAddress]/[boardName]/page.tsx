'use client';

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

import useGetBoardByName from '@/hooks/useGetBoardByName';

import PostList from './_components/PostList';
import MemoList from './_components/MemoList';

const BoardPage = () => {
  const param = useParams();
  const { board, isLoading } = useGetBoardByName(param.houseAddress, param.boardName);

  if (isLoading) {
    return (
      <div className='flex flex-col h-full gap-y-4 p-6 mt-10'>
        <Skeleton className='w-44 h-10' />
        <Skeleton className='w-full h-10' />
        <Skeleton className='w-full h-10' />
        <Skeleton className='w-full h-10' />
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col h-full gap-y-4 p-6'>
        {board?.type == 'post' && <PostList board={board} />}
        {board?.type == 'trpg' && <PostList board={board} />}
        {board?.type == 'memo' && <MemoList board={board} />}
      </div>
    </>
  );
}

export default BoardPage;