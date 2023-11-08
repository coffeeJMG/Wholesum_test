import { create } from "zustand";

interface EditItemInfo {
    editId: string;
    setEditId: (id: string) => void;
}

const useEditItemStore = create<EditItemInfo>((set) => ({
    editId: "",
    setEditId: (id) => set({ editId: id }),
}));

export default useEditItemStore;
