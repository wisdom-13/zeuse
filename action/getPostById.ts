import { PostFamily } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getPostById = async (post_id: string): Promise<PostFamily | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data: data, error: error } = await supabase
    .from('posts')
    .select(`
      *,
      family:family!inner(*)
    `)
    .eq('id', post_id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as PostFamily) || null;
}

export default getPostById;