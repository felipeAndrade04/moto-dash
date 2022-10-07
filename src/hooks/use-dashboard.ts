import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChartData } from "../pages";
import services from "../services";

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState<ChartData[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [ordersQuantity, setOrdersQuantity] = useState(0);
  const toast = useToast({ position: "top" });

  useEffect(() => {
    const loadData = async () => {
      await get();
    };

    loadData();
  }, []);

  const get = async () => {
    try {
      setIsLoading(true);

      const response = await services.dashboard.get();

      setGraphData(response.graphData);
      setTotalValue(response.totalValue);
      setOrdersQuantity(response.ordersQuantity);
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    graphData,
    totalValue,
    ordersQuantity,
    get,
  };
};
