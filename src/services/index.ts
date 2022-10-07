import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from "../config";
import authService from "./auth";
import dashboardService from "./dashboard";
import orderService from "./order";
import productService from "./product";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);

const services = {
  auth: authService(auth),
  product: productService(db),
  order: orderService(db),
  dashboard: dashboardService(db)
};

export default services;
