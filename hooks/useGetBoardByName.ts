import { Board } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetBoardByName = (house_address?: string | string[], board_name?: string | string[]) => {
  const [isLoading, setIsLoading] = useState(false);
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!house_address || !board_name) {
      return;
    }

    setIsLoading(true);

    const fetchBoard = async () => {
      const { data, error } = await supabaseClient
        .from('board')
        .select(`
          *,
          houses:houses!inner(*)
        `)
        .eq('name', board_name)
        .eq('houses.address', house_address)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setBoard(data as Board);
      setIsLoading(false);

    }

    fetchBoard();
  }, [house_address, board_name, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    board
  }), [isLoading, board]);
}

export default useGetBoardByName;