import { Product } from "../..";

export interface ProductModalProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
}