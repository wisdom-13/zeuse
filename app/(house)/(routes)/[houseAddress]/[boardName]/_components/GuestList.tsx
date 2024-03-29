'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { BoardList, PostFamily } from '@/types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import SearchBar from './SearchBar';

interface GuestListProps {
  board: BoardList
}

const GuestList = ({
  board
}: GuestListProps) => {
  const data = board.posts;
  const [value, setValue] = useState('');

  const posts = data
    .filter((post: PostFamily) => {
      return post.title.toLowerCase().includes(value) || post.content.toLowerCase().includes(value);
    })
    .sort((a: PostFamily, b: PostFamily) => (
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ));

  return (
    <>
      <div className='flex flex-wrap items-center justify-between mt-8'>
        <h1 className='text-3xl font-semibold'>
          {board.title}
        </h1>
        <SearchBar value={value} handleChange={setValue} />
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
            <div>sdfsd</div>
          </>
        )}
      </ScrollArea>

    </>
  );
}

export default GuestList;