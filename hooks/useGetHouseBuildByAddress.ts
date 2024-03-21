import { HouseBuild } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetHouseBuildByAddress = (address: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [house, setHouse] = useState<HouseBuild | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const fetchHouse = async () => {
      const { data, error } = await supabaseClient
        .from('houses')
        .select(`
            *, 
            widget:widget!inner(*),
            board:board!inner(*),
            style:style!inner(*),
            family:family!inner(*)
        `)
        .eq('address', address)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setHouse(data as HouseBuild);
      setIsLoading(false);
    }

    fetchHouse();
  }, [address, supabaseClient]);

  const updateHouse = (updatedHouse: HouseBuild) => {
    setHouse(updatedHouse);
  };

  return useMemo(() => ({
    isLoading,
    house,
    updateHouse
  }), [isLoading, house]);
}

export default useGetHouseBuildByAddress;