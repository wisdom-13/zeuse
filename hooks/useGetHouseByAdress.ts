import { House } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetHouseByAdress = (address?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [house, setHouse] = useState<House | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!address) {
      return;
    }

    setIsLoading(true);

    const fetchHouse = async () => {
      const { data, error } = await supabaseClient
        .from('houses')
        .select('*')
        .eq('address', address)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setHouse(data as House);
      setIsLoading(false);
    }

    fetchHouse();
  }, [address, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    house
  }), [isLoading, house]);
}

export default useGetHouseByAdress;