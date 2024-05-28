import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetHouseAllAdress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addressList, setAddressList] = useState<[string] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);

    const fetchHouse = async () => {
      const { data, error } = await supabaseClient
        .from('houses')
        .select('address');

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setAddressList(data?.map(item => item.address) as any);
      setIsLoading(false);
    }

    fetchHouse();
  }, [supabaseClient]);

  return useMemo(() => ({
    isLoading,
    addressList
  }), [isLoading, addressList]);
}

export default useGetHouseAllAdress;