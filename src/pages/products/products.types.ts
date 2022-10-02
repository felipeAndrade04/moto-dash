export interface Product {
  id: string
  created_at: Date
  name: string;
  description: string;
  stock: string;
  price: number;
  brand: string;
  model?: string;
}
