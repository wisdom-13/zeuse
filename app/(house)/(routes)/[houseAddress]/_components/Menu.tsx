import { House, HouseBuild } from '@/types';

import { useRouter } from 'next/navigation';
import { Heart, LogIn, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import useAuthModal from '@/hooks/useAuthModal';
import useSettingModal from '@/hooks/useSettingModal';
import { useUserHouseRole } from '@/hooks/useUserHouseRole';
import { HouseList } from '@/components/HouseList';

import MenuItem from './MenuItem';

interface houseBuildProps {
  houseBuild: HouseBuild;
  houses?: House[];
}

const Menu = ({ houseBuild, houses }: houseBuildProps) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const authModal = useAuthModal();
  const settingModal = useSettingModal();

  const { isUser, isOwner, isEditer } = useUserHouseRole(houseBuild.address);

  const headleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error?.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <>
      <div className='flex flex-col gap-y-2 px-8 py-2'>
        {houseBuild?.board && houseBuild?.board.sort((a, b) => a.order - b.order).map((item) => (
          <MenuItem
            key={item.id}
            label={item.title}
            type={item.type}
            icon={Heart}
            href={(item.type == 'link' ? item.link : `/${houseBuild?.address}/${item.name}`)}
          />
        ))}
      </div>

      <div className='flex flex-col gap-y-2 mt-auto p-2'>
        {isOwner || isEditer && (
          <MenuItem
            label='설정'
            icon={Settings}
            isButton={true}
            onClick={settingModal.onOpen}
          />
        )}
        {isUser && (
          <MenuItem
            label='로그아웃'
            icon={LogOut}
            isButton={true}
            onClick={headleLogout}
          />
        )}
        {isUser && houses && (
          <HouseList position='start' houses={houses} />
        )}
        {!isUser && (
          <MenuItem
            label='로그인'
            icon={LogIn}
            isButton={true}
            onClick={authModal.onOpen}
          />
        )}
      </div>
    </>
  );
}

export default Menu;