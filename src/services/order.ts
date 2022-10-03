import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, updateDoc } from "firebase/firestore";
import { Order } from "../pages";

const orderService = (db: Firestore) => ({
  list: async () => {
    try {
      const orderQuery = await query(collection(db, "order"));

      const querySnapshot = await getDocs(orderQuery);

      const orders: Order[] = [];

      querySnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          created_at: doc.data().created_at,
          products: doc.data().products,
          totalValue: doc.data().totalValue
        });
      });

      return orders;
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
  create: async (orderData: Omit<Order, "id" | "created_at">) => {
    try {
      const newOrder: Omit<Order, "id"> = {
        created_at: new Date(),
        ...orderData
      }

      const docRef = await addDoc(collection(db, 'order'), newOrder)

      const order: Order = {
        id: docRef.id,
        ...newOrder
      }

      return order
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
  update: async (orderId: string, data: Omit<Order, "id">) => {
    try {
      const docRef = doc(db, "order", orderId);

      await updateDoc(docRef, data);

      const updatedOrder: Order = {
        id: orderId,
        ...data
      }

      return updatedOrder;
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
  delete: async (orderId: string) => {
    try {
      const docRef = doc(db, "order", orderId);

      await deleteDoc(docRef);
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
})

export default orderService
