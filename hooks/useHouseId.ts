import { create } from 'zustand';

interface HouseIdStore {
  houseId: string | undefined,
  setHouseId: (id: string | undefined) => void;
};

const useHouseId = create<HouseIdStore>((set) => ({
  houseId: undefined,
  setHouseId: (id) => set({ houseId: id })
}))

export default useHouseId;