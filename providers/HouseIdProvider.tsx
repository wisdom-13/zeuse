'use client';

import useGetHouseByAdress from '@/hooks/useGetHouseByAdress';
import useHouseId from '@/hooks/useHouseId';
import { useEffect } from 'react';

interface HouseIdProviderProps {
  houseAddress: string,
  children: React.ReactNode;
}

const HouseIdProvider = ({
  houseAddress,
  children
}: HouseIdProviderProps) => {
  const { house } = useGetHouseByAdress(houseAddress);
  const { setHouseId } = useHouseId();

  useEffect(() => {
    setHouseId(house?.id)
  }, [setHouseId])

  return (
    <>
      {children}
    </>
  );
}

export default HouseIdProvider;