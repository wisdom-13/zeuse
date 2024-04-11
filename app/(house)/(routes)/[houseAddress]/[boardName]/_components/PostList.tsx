'use client';

import { Board, PostFamily } from '@/types';

import { ScrollArea } from '@/components/ui/scroll-area';

import useGetPostListById from '@/hooks/useGetPostListById';
import Link from 'next/link';
import ListItem from './ListItem';
import { useParams } from 'next/navigation';
import CardItem from './CardItem';
import SearchBar from './SearchBar';
import { Button } from '@/components/ui/button';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import useHouseBuild from '@/hooks/useHouseBuild';

interface PostListProps {
  board: Board;
}

const PostList = ({
  board,
}: PostListProps) => {
  const { user } = useUser();
  const { houseBuild } = useHouseBuild();
  const { posts } = useGetPostListById(board.id);
  const param = useParams();
  const [value, setValue] = useState('');

  const family = houseBuild?.family.filter((item) => item.user_id == user?.id)?.[0];

  const Item = (board.view == 'list') ? ListItem : CardItem;

  if (!posts) {
    return
  }

  const filterPosts = posts
    .filter((post: PostFamily) => {
      return post.title.toLowerCase().includes(value) || post.content.toLowerCase().includes(value);
    });

  return (
    <>
      <div className='flex items-center justify-start gap-x-2 mt-8'>
        <h1 className='w-full text-4xl font-bold'>
          {board.title}
        </h1>
        <SearchBar className='w-96' value={value} handleChange={setValue} />
        {family && (
          <Link href={`/${param.houseAddress}/${param.boardName}/edit`}>
            <Button className='flex gap-x-2' size='sm'>
              새 글 작성
              <Pen size={16} />
            </Button>
          </Link>
        )}
      </div>
      {filterPosts && filterPosts.length === 0 ? (
        <div className='mt-4'>
          <p className='text-muted-foreground text-base'>작성된 포스트가 없습니다.</p>
        </div>
      ) : (
        <ScrollArea className='w-full h-full'>
          <div
            className={(board.view == 'list')
              ? 'flex flex-col gap-2'
              : 'grid grid-cols-3 gap-2'}
          >
            {filterPosts && filterPosts.map((item: PostFamily) => (
              <Link key={item.id} href={`/${param.houseAddress}/${param.boardName}/${item.id}`}>
                <Item post={item} />
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
}

export default PostList;