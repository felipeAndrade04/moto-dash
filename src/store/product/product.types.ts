import { Product } from "../../pages";

export interface ProductStore {
  products: Product[]
  setProducts: (product: Product[]) => void
}