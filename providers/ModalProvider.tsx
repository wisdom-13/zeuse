'use client';

import { AuthModal } from '@/components/modal/AuthModal';
import CreateHouseModal from '@/components/modal/CreatHouseModal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <CreateHouseModal />
    </>
  );
}

export default ModalProvider;