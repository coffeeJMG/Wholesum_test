import { create } from "zustand";

type updateProductStoreProps = {
    updatedProductList: boolean;
    setUpdatedProductList: (boolean: boolean) => void;
};
export const updateProductStore = create<updateProductStoreProps>((set) => ({
    updatedProductList: false,

    setUpdatedProductList: (boolean) => set({ updatedProductList: boolean }),
}));
