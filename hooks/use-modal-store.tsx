import { create } from "zustand";

export type ModalType = "CREATE_STORE";

interface ModalStoreInterface {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStoreInterface>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type: type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
