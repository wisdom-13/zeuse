import { HouseBuild } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { fetchHouseByAddress } from '@/services/houseService';

export const useHouseBuildByAddress = (address?: string) => {
  return useQuery<HouseBuild | null, Error>({
    queryKey: ['house', address],
    queryFn: () => fetchHouseByAddress(address),
    staleTime: 10000,
  });
};