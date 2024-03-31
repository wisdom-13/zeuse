import { BoardList as BoardListType } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetBoardById = (board_id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [board, setBoard] = useState<BoardListType | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!board_id) {
      return;
    }

    setIsLoading(true);

    const fetchBoard = async () => {
      const { data, error } = await supabaseClient
        .from('board')
        .select(`
        *,
        posts:posts!left(*, family:family_id (*))
      `)
        .eq('id', board_id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setBoard(data as BoardListType);
      setIsLoading(false);
    }

    fetchBoard();
  }, [board_id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    board
  }), [isLoading, board]);
}

export default useGetBoardById;