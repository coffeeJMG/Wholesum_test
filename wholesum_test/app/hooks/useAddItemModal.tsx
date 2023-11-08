import { create } from "zustand";

interface useAddItemStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useAddItem = create<useAddItemStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
