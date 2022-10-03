import { Product } from "../"

export interface Order {
  id: string
  created_at: Date
  totalValue: number
  products: Product[]
}