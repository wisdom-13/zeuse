import { useEffect, useState } from 'react';
import { Family, UserDetails } from '@/types';
import { useUser } from './useUser';
import { useHouseBuildByAddress } from '../api/useHouseBuilder';

interface UserHouseRole {
  role?: string;
  isUser: boolean;
  isFamily: boolean;
  isEditer: boolean;
  isOwner: boolean;
  profiles?: {
    user: UserDetails;
    family: UserDetails;
  };
}

export const useUserHouseRole = (address: string): UserHouseRole => {
  const { user, userDetails } = useUser();
  const { data } = useHouseBuildByAddress(address);
  const [role, setRole] = useState<UserHouseRole>({ isUser: false, isFamily: false, isEditer: false, isOwner: false });

  useEffect(() => {
    if (user && userDetails && data) {
      const houseFamily = data.family;
      const familyUser = houseFamily.find(member => member.user_id === user.id);

      if (familyUser) {
        const familyProfile = {
          id: user.id,
          name: familyUser?.nick_name,
          avatar_url: familyUser?.avatar_path,
        }

        setRole({
          role: familyUser.role,
          isUser: true,
          isFamily: true,
          isEditer: true,
          isOwner: familyUser.is_owner,
          profiles: { user: userDetails, family: familyProfile }
        });
      } else {
        setRole({ isUser: true, isFamily: false, isEditer: false, isOwner: false });
      }
    }
  }, [user, userDetails, data]);

  return role;
};
