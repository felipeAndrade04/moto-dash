import create from "zustand";
import { Product } from "../../pages";
import { OrderStore } from "./";

const INITIAL_STATE = {
  id: "",
  created_at: null!,
  totalValue: 0,
  products: []!,
};

export const useOrderStore = create<OrderStore>((set) => ({
  order: INITIAL_STATE,
  addProduct: (selectedProduct) =>
    set((state) => {
      const productIndex = state.order?.products?.findIndex(
        (product) => product.id === selectedProduct.id
      );

      if (productIndex >= 0) {
        const updatedProducts = state.order?.products.map((product) => ({
          ...product,
          quantity:
            product.id === selectedProduct.id
              ? product.quantity! + 1
              : product.quantity,
        }));

        return { order: { ...state.order, products: updatedProducts } };
      }

      const product: Product = {
        ...selectedProduct,
        quantity: 1,
      };

      return {
        order: {
          ...state.order,
          products: [product, ...state.order.products],
          totalValue: state.order.totalValue + selectedProduct.price,
        },
      };
    }),
  incrementProductQuantity: (selectedProduct) =>
    set((state) => {
      const updatedProducts = state.order.products.map((product) => ({
        ...product,
        quantity:
          product.id === selectedProduct.id
            ? product.quantity! + 1
            : product.quantity,
      }));

      return {
        order: {
          ...state.order,
          products: updatedProducts,
          totalValue: state.order.totalValue + selectedProduct.price,
        },
      };
    }),
  decrementProductQuantity: (selectedProduct) =>
    set((state) => {
      const updatedProducts = state.order.products.map((product) => ({
        ...product,
        quantity:
          product.id === selectedProduct.id
            ? product.quantity! - 1
            : product.quantity,
      }));

      return {
        order: {
          ...state.order,
          products: updatedProducts,
          totalValue: state.order.totalValue - selectedProduct.price,
        },
      };
    }),
  removeProduct: (selectedProduct) =>
    set((state) => {
      const updatedProducts = state.order.products.filter(
        (product) => product.id !== selectedProduct.id
      );

      return {
        order: {
          ...state.order,
          products: updatedProducts,
          totalValue:
            state.order.totalValue -
            selectedProduct.price * (selectedProduct.quantity || 0),
        },
      };
    }),
  clear: () =>
    set(() => ({
      order: INITIAL_STATE,
    })),
}));
