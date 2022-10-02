import { Product } from "../..";

export interface ProductTableProps {
  updateProduct: (product: Product) => void;
  onClickName: (product: Product) => void;
}