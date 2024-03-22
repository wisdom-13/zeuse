import { create } from 'zustand';

interface WidgetEditStore {
  isBrawerOpen: boolean;
  onBrawerOpen: () => void;
  onBrawerClose: () => void;
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  isEditing: boolean;
  onEditingStart: () => void;
  onEditingEnd: () => void;
};

const useWidgetEdit = create<WidgetEditStore>((set) => ({
  isBrawerOpen: false,
  onBrawerOpen: () => set({ isBrawerOpen: true }),
  onBrawerClose: () => set({ isBrawerOpen: false }),
  isModalOpen: false,
  onModalOpen: () => set({ isModalOpen: true }),
  onModalClose: () => set({ isModalOpen: false }),
  isEditing: false,
  onEditingStart: () => set({ isEditing: true }),
  onEditingEnd: () => set({ isEditing: false }),
}))

export default useWidgetEdit;