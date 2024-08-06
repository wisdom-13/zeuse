'use client';

import { Board, Memo } from '@/types';

import { useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import useGetMemoListById from '@/hooks/useGetMemoListById';

import MemoItem from './MemoItem';
import SearchBar from './SearchBar';
import MemoAdd from './MemoAdd';
import { useUser } from '@/hooks/useUser';
import useHouseBuild from '@/hooks/useHouseBuild';
import { useParams } from 'next/navigation';
import { useUserHouseRole } from '@/hooks/useUserHouseRole';

interface MemoListProps {
  board: Board;
}

const MemoList = ({
  board,
}: MemoListProps) => {
  const { houseAddress } = useParams<{ houseAddress: string }>();
  const { isOwner, profiles } = useUserHouseRole(houseAddress);

  const { memos, setMemos } = useGetMemoListById(board.id);
  const [value, setValue] = useState('');

  if (!memos) {
    return false;
  }

  let filterMemos = memos
    .filter((memo: Memo) => {
      return memo.title?.toLowerCase().includes(value) || memo.content.toLowerCase().includes(value);
    });

  return (
    <>
      <div className='flex justify-start items-center gap-x-2 mt-8'>
        <h1 className='w-full font-semibold text-3xl'>
          {board.title}
        </h1>
        <SearchBar className='w-96' value={value} handleChange={setValue} />
      </div>
      <MemoAdd boardId={board.id} family={profiles?.family} setMemos={setMemos} />
      {filterMemos && filterMemos.length === 0 ? (
        <div className='mt-4'>
          <p className='text-base text-muted-foreground'>작성된 메모가 없습니다.</p>
        </div>
      ) : (
        <ScrollArea className='w-full h-full'>
          <div className='flex flex-col gap-y-4'>
            {filterMemos && filterMemos.map((item) => (
              <MemoItem key={item.id} memo={item} isOwner={isOwner} familyId={profiles?.family.id} setMemos={setMemos} />
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
}

export default MemoList;