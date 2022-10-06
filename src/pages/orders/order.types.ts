import { Timestamp } from "firebase/firestore"
import { Product } from "../"

export interface Order {
  id: string
  created_at: Timestamp
  totalValue: number
  products: Product[]
}