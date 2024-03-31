import { Memo } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetMemoListById = (board_id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [memos, setMemos] = useState<Memo[] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!board_id) {
      return;
    }

    setIsLoading(true);

    const fetchMemo = async () => {
      const { data, error } = await supabaseClient
        .from('memos')
        .select('*')
        .eq('board_id', board_id)
        .order('created_at', { ascending: false });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setMemos(data as Memo[]);
      setIsLoading(false);
    }

    fetchMemo();
  }, [board_id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    memos
  }), [isLoading, memos]);
}

export default useGetMemoListById;