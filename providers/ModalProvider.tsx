'use client';

import { useEffect, useState } from 'react';
import { WidgetBrawer } from '@/components/modal/WidgetBrawer';
import { AuthModal } from '@/components/modal/AuthModal';
import CreateHouseModal from '@/components/modal/CreatHouseModal';
import { SettingModal } from '@/components/modal/SettingModal';

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
      <SettingModal />
      <WidgetBrawer />
    </>
  );
}

export default ModalProvider;