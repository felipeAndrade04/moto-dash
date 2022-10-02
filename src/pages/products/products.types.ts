export interface Product {
  id: string
  created_at: Date
  name: string;
  description: string;
  stock: number;
  price: number;
  brand: string;
  model?: string;
}
