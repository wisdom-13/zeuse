import { BoardList as BoardListType } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getBoardByName = async (house_address: string, board_name: string): Promise<BoardListType | null> => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: data, error: error } = await supabase
    .from('board')
    .select(`
      *,
      houses:houses!inner(*)
    `)
    .eq('name', board_name)
    .eq('houses.address', house_address)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || null;
}

export default getBoardByName;