import { useQuery } from '@tanstack/react-query';
import { fetchHouseByAddress } from '@/services/houseService';
import { HouseBuild, Widget as WidgetType } from '@/types';

export const useHouseBuildByAddress = (address?: string) => {
  return useQuery<HouseBuild | null, Error>({
    queryKey: ['house', address],
    queryFn: () => fetchHouseByAddress(address),
    staleTime: 10000,
  });
};