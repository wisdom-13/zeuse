import { BoardList as BoardListType } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getBoardByName = async (house_id: string, board_name: string): Promise<BoardListType | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data: data, error: error } = await supabase
    .from('board')
    .select(`
      *,
      posts:posts!left(*, family:family_id (*))
    `)
    .eq('house_id', house_id)
    .eq('name', board_name)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as BoardListType) || null;
}

export default getBoardByName;