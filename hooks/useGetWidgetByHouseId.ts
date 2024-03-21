import { Widget } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner';

const useGetWidgetByHouseId = (houseId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [widgets, setWidgets] = useState<Widget[] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setIsLoading(true);

    if (!houseId) {
      return undefined;
    }

    const fetchHouse = async () => {
      const { data, error } = await supabaseClient
        .from('widget')
        .select(`*`)
        .eq('house_id', houseId);

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setWidgets(data as Widget[]);
      setIsLoading(false);
    }

    fetchHouse();
  }, [houseId, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    widgets,
  }), [isLoading, widgets]);
}

export default useGetWidgetByHouseId;