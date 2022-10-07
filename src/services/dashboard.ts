import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { Order, ChartData } from "../pages";
import { getLastSixMonths } from "../utils";

const dashboardService = (db: Firestore) => ({
  get: async () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const startDate = Timestamp.fromDate(
      new Date(currentDate.getFullYear(), currentMonth - 5, 1)
    );
    const endDate = Timestamp.fromDate(
      new Date(currentDate.getFullYear(), currentMonth + 1, 0)
    );

    function formatGraphData(orders: Order[]) {
      const months = getLastSixMonths();
      const data = [0, 0, 0, 0, 0, 0];

      months.forEach((month, index) => {
        orders.forEach((order) => {
          if (order.created_at.toDate().getMonth() === month) {
            data[index] += order.totalValue / 100;
          }
        });
      });

      return data;
    }

    const dashboardQuery = await query(
      collection(db, "order"),
      orderBy("created_at", "desc"),
      where("created_at", ">=", startDate),
      where("created_at", "<=", endDate)
    );

    const querySnapshot = await getDocs(dashboardQuery);

    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        created_at: doc.data().created_at,
        products: doc.data().products,
        totalValue: doc.data().totalValue,
      });
    });

    const totalValue = orders.reduce((acc, item) => acc + item.totalValue, 0);

    const ordersQuantity = orders.length;

    const graphData: ChartData[] = [
      {
        name: "orders",
        data: formatGraphData(orders),
      },
    ];

    return { graphData, totalValue, ordersQuantity };
  },
});

export default dashboardService;
