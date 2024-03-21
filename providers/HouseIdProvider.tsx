'use client';

import useGetHouseBuildByAddress from '@/hooks/useGetHouseBuildByAddress';
import useHouseBuild from '@/hooks/useHouseBuild';
import { useEffect } from 'react';

interface HouseIdProviderProps {
  houseAddress: string,
  children: React.ReactNode;
}

const HouseIdProvider = ({
  houseAddress,
  children
}: HouseIdProviderProps) => {
  const { house } = useGetHouseBuildByAddress(houseAddress);
  const { setHouseId, setHouseBuild } = useHouseBuild();

  useEffect(() => {
    setHouseId(house?.id)
  }, [house, setHouseId])

  useEffect(() => {
    setHouseBuild(house)
  }, [house, setHouseBuild])

  return (
    <>
      {children}
    </>
  );
}

export default HouseIdProvider;