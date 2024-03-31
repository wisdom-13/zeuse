import { PostFamily } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetPostListById = (board_id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostFamily[] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!board_id) {
      return;
    }

    setIsLoading(true);

    const fetchPost = async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select(`
        *,
        family:family!inner(*)
      `)
        .eq('board_id', board_id)
        .order('created_at', { ascending: false });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setPosts(data as PostFamily[]);
      setIsLoading(false);
    }

    fetchPost();
  }, [board_id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    posts
  }), [isLoading, posts]);
}

export default useGetPostListById;