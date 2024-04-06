'use client';

import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

import useGetBoardByName from '@/hooks/useGetBoardByName';
import useHouseBuild from '@/hooks/useHouseBuild';

import PostList from './_components/PostList';
import MemoList from './_components/MemoList';


const BoardPage = () => {
  const param = useParams();
  const { houseId } = useHouseBuild();
  const { board, isLoading } = useGetBoardByName(houseId, param.boardName);

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

  if (board) {
    return (
      <>
        <div className='flex flex-col h-full gap-y-4 p-6'>
          {board.type == 'post' && <PostList board={board} />}
          {board.type == 'memo' && <MemoList board={board} />}
        </div>
      </>
    );
  }

}

export default BoardPage;