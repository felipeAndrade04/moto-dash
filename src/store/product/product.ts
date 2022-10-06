import create from "zustand";
import { ProductStore } from "./";

const INITIAL_STATE = {
  products: []!,
};

export const useProductStore = create<ProductStore>((set) => ({
  ...INITIAL_STATE,
  setProducts: (products) => set(() => ({ products })),
}));
