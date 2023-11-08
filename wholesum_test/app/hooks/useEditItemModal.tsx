import { create } from "zustand";

interface useEditItemStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useEditItem = create<useEditItemStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
