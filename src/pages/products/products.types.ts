export interface Product {
  id: string
  created_at: Date
  name: string;
  description: string;
  stock: number;
  quantity?: number;
  price: number;
  brand: string;
  model?: string;
}
