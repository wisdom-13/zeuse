import { BoardList } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getBoardByName from './getBoardByName';

const getBoardByTitle = async (house_id: string, board_name: string, title: string): Promise<BoardList | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  if (!title) {
    const allBoardList = await getBoardByName(house_id, board_name);
    return allBoardList;
  }

  const { data: data, error: error } = await supabase
    .from('board')
    .select(`
      *,
      posts:posts!left(*, family:family_id (*))
    `)
    .eq('house_id', house_id)
    .eq('name', board_name)
    .like('posts.title', `%${title}%`)
    .order('created_at', { ascending: false })
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as BoardList) || null;
}

export default getBoardByTitle;