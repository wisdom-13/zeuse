import { create } from 'zustand';

interface LodingModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useLodingModal = create<LodingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useLodingModal;