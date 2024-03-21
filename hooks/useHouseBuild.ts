import { HouseBuild } from '@/types';
import { create } from 'zustand';

interface HouseBuildStore {
  houseId: string | undefined,
  setHouseId: (id: string | undefined) => void;
  houseBuild: HouseBuild | undefined,
  setHouseBuild: (id: HouseBuild | undefined) => void;
};

const useHouseBuild = create<HouseBuildStore>((set) => ({
  houseId: undefined,
  setHouseId: (id) => set({ houseId: id }),
  houseBuild: undefined,
  setHouseBuild: (house) => set({ houseBuild: house })
}))

export default useHouseBuild;