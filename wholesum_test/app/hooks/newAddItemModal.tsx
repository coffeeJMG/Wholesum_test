import { create } from "zustand";

interface newAddItmStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const newAddItem = create<newAddItmStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
