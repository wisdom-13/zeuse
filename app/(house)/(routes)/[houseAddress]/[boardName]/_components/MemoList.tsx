'use client';

import { Board, Memo } from '@/types';


import { ScrollArea } from '@/components/ui/scroll-area';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import useGetMemoListById from '@/hooks/useGetMemoListById';
import MemoItem from './MemoItem';
import { useState } from 'react';
import SearchBar from './SearchBar';

interface MemoListProps {
  board: Board;
}

const MemoList = ({
  board,
}: MemoListProps) => {
  const { memos } = useGetMemoListById(board.id);
  const [value, setValue] = useState('');

  if (!memos) {
    return false;
  }

  const filterMemos = memos
    .filter((memo: Memo) => {
      return memo.title?.toLowerCase().includes(value) || memo.content.toLowerCase().includes(value);
    });

  return (
    <>
      <div className='flex items-center justify-start gap-x-2 mt-8'>
        <h1 className='text-3xl font-semibold w-full'>
          {board.title}
        </h1>
        <SearchBar className='w-96' value={value} handleChange={setValue} />
      </div>
      <div>
        <Textarea placeholder='내용을 입력하세요.' />
        <div className='flex items-center justify-end gap-x-2 mt-2'>
          <div className='flex items-center space-x-2 mr-3'>
            <Checkbox id='is_secret' className='text-muted-foreground' />
            <label
              htmlFor='is_secret'
              className='text-sm font-medium leading-none text-muted-foreground'
            >
              비밀글
            </label>
          </div>
          <Input
            placeholder='닉네임'
            className='w-36'
          />
          <Input
            placeholder='비밀번호'
            className='w-36'
          />
          <Button
            className='w-16'
          >
            등록
          </Button>
        </div>
      </div>
      {filterMemos && filterMemos.length === 0 ? (
        <div className='mt-4'>
          <p className='text-muted-foreground text-base'>작성된 메모가 없습니다.</p>
        </div>
      ) : (
        <ScrollArea className='w-full h-full'>
          <div className='flex flex-col gap-y-4'>
            {filterMemos && filterMemos.map((item) => (
              <MemoItem key={item.id} memo={item} />
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
}

export default MemoList;