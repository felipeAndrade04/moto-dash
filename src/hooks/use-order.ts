import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Order } from "../pages";
import services from "../services";
import { useOrderStore } from "../store";

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const toast = useToast({ position: "top" });
  const order = useOrderStore((state) => state.order);
  const clear = useOrderStore((state) => state.clear);
  const addProduct = useOrderStore((state) => state.addProduct)
  const removeProduct = useOrderStore(state => state.removeProduct)
  const incrementProductQuantity = useOrderStore(
    (state) => state.incrementProductQuantity
  );
  const decrementProductQuantity = useOrderStore(
    (state) => state.decrementProductQuantity
  );

  useEffect(() => {
    const loadData = async () => {
      await list();
    };

    loadData();
  }, []);

  const list = async () => {
    try {
      setIsLoading(true);

      const response = await services.order.list();

      setOrders(response);
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

  const create = async (order: Omit<Order, "id" | "created_at">) => {
    try {
      setCreateIsLoading(true);
      const response = await services.order.create(order);

      toast({
        title: "Venda cadastrada com sucesso!",
        status: "success",
        isClosable: true,
      });

      setOrders([response, ...orders]);
      clear();
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setCreateIsLoading(false);
    }
  };

  const remove = async (orderId: string) => {
    try {
      setRemoveIsLoading(true);
      await services.order.delete(orderId);

      toast({
        title: "Venda deletada com sucesso!",
        status: "success",
        isClosable: true,
      });

      const updatedOrders = orders.filter((order) => order.id !== orderId);

      setOrders(updatedOrders);
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setRemoveIsLoading(false);
    }
  };

  return {
    order,
    orders,
    isLoading,
    removeIsLoading,
    createIsLoading,
    list,
    create,
    remove,
    addProduct,
    removeProduct,
    incrementProductQuantity,
    decrementProductQuantity,
  };
};
