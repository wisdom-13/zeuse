import { create } from 'zustand';

interface CreateHouseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useCreateHouseModal = create<CreateHouseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useCreateHouseModal;