import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { Product } from "../pages";

const productService = (db: Firestore) => ({
  list: async () => {
    try {
      const productQuery = await query(collection(db, "product"));

      const querySnapshot = await getDocs(productQuery);

      const products: Product[] = [];

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          created_at: doc.data().created_at,
          brand: doc.data().brand,
          description: doc.data().description,
          name: doc.data().name,
          price: doc.data().price,
          stock: doc.data().stock,
          model: doc.data().model,
        });
      });

      return products;
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
  create: async (productData: Omit<Product, "id" | "created_at">) => {
    try {
      const newProduct: Omit<Product, "id"> = {
        ...productData,
        created_at: new Date(),
      };

      const docRef = await addDoc(collection(db, "product"), newProduct);

      const product: Product = {
        id: docRef.id,
        ...newProduct,
      };

      return product;
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
  update: async (productId: string, data: Omit<Product, "id">) => {
    try {
      const docRef = doc(db, "product", productId);

      await updateDoc(docRef, data);

      const updatedProduct: Product = {
        id: productId,
        ...data,
      };

      return updatedProduct;
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
  delete: async (productId: string) => {
    try {
      const docRef = doc(db, "product", productId);

      await deleteDoc(docRef);
    } catch (error) {
      throw new Error("Algum erro aconteceu, tente novamente mais tarde");
    }
  },
});

export default productService;
