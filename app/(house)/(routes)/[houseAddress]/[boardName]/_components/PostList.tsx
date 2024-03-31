'use client';

import { PostFamily } from '@/types';


import { ScrollArea } from '@/components/ui/scroll-area';

import useGetPostListById from '@/hooks/useGetPostListById';
import Link from 'next/link';
import ListItem from './ListItem';
import { useParams } from 'next/navigation';
import CardItem from './CardItem';

interface PostListProps {
  id: string;
  view: string;
  searchKeyword: string;
}

const PostList = ({
  id,
  view,
  searchKeyword
}: PostListProps) => {
  // const data = board.posts;
  const param = useParams();
  const { posts, isLoading } = useGetPostListById(id);

  const Item = (view == 'list') ? ListItem : CardItem;

  if (!posts) {
    return false;
  }

  const filterPosts = posts
    .filter((post: PostFamily) => {
      return post.title.toLowerCase().includes(searchKeyword) || post.content.toLowerCase().includes(searchKeyword);
    });

  if (filterPosts && filterPosts.length === 0) {
    return (
      <div className='mt-4'>
        <p className='text-muted-foreground text-base'>작성된 포스트가 없습니다.</p>
      </div>
    )
  }

  return (
    <>
      <ScrollArea className='w-full h-full'>
        <div
          className={(view == 'list')
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
    </>
  );
}

export default PostList;