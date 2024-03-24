'use client';

import { PostFamily } from '@/types';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ListItem from './ListItem';

interface ListViewProps {
  posts: PostFamily[];
}

const ListView = ({
  posts
}: ListViewProps) => {
  const param = useParams();

  return (
    <>
      <div className='flex flex-col gap-2'>
        {posts && posts.map((item) => (
          <Link key={item.id} href={`/${param.houseAddress}/${param.boardName}/${item.id}`}>
            <ListItem post={item} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default ListView;