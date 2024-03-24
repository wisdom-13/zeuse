'use client';

import { BoardList as BoardListType, PostFamily } from '@/types';

import Link from 'next/link';
import { useState } from 'react';

import { useParams } from 'next/navigation';
import CardItem from './CardItem';

interface CardViewProps {
  board: BoardListType
}

const CardView = ({
  board
}: CardViewProps) => {
  const param = useParams();
  const data = board.posts;

  const [value, setValue] = useState('');

  const filteredData = data.slice().filter((post: PostFamily) => {
    return post.title.includes(value) || post.content.includes(value);
  });
  const posts = filteredData.sort((a: PostFamily, b: PostFamily) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <>
      <div className='grid grid-cols-3 gap-2'>
        {posts && posts.map((item) => (
          <Link key={item.id} href={`/${param.houseAddress}/${board.name}/${item.id}`}>
            <CardItem post={item} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default CardView;