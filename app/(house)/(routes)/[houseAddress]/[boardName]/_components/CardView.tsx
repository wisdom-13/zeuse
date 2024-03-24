'use client';

import { PostFamily } from '@/types';

import Link from 'next/link';

import { useParams } from 'next/navigation';
import CardItem from './CardItem';

interface CardViewProps {
  posts: PostFamily[];
}

const CardView = ({
  posts
}: CardViewProps) => {
  const param = useParams();

  return (
    <>
      <div className='grid grid-cols-3 gap-2'>
        {posts && posts.map((item) => (
          <Link key={item.id} href={`/${param.houseAddress}/${param.boardName}/${item.id}`}>
            <CardItem post={item} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default CardView;