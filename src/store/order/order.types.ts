import { Order, Product } from "../../pages";

export interface OrderStore {
  order: Order
  addProduct: (product: Product) => void
  incrementProductQuantity: (product: Product) => void
  decrementProductQuantity: (product: Product) => void
  removeProduct: (product: Product) => void
  clear: () => void
}