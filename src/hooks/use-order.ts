import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Order } from "../pages"
import services from "../services"

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([])

  const toast = useToast({ position: "top" });

  useEffect(() => {
    const loadData = async () => {
      await list()
    }

    loadData()
  }, [])

  const list = async () => {
    try {
      setIsLoading(true);

      const response = await services.order.list();

      setOrders(response)
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
  } 

  const create = async (order: Omit<Order, "id" | "created_at">) => {
    try {
      const response = await services.order.create(order);

      toast({
        title: 'Venda cadastrada com sucesso!',
        status: "success",
        isClosable: true,
      });

      setOrders([response, ...orders])
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  }

  const update = async (orderId: string, data: Omit<Order, "id">) => {
    try {
      const response = await services.order.update(orderId, data);

      toast({
        title: 'Venda atualizada com sucesso!',
        status: "success",
        isClosable: true,
      });

      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return response
        }

        return order
      })

      setOrders(updatedOrders)
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  }

  const remove = async (orderId: string) => {
    try {
      setRemoveIsLoading(true)
      await services.order.delete(orderId);

      toast({
        title: 'Venda deletada com sucesso!',
        status: "success",
        isClosable: true,
      });

      const updatedOrders = orders.filter(order => order.id !== orderId)
      
      setOrders(updatedOrders)
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    } finally {
      setRemoveIsLoading(false)
    }
  }

  return {
    list,
    create,
    update,
    remove,
    orders,
    isLoading,
    removeIsLoading
  }
}