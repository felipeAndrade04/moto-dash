import { Product } from "../../";

export interface ProductFormProp {
  hideForm: () => void;
  clearData: () => void;
  data: Product | undefined
}