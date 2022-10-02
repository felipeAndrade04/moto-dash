import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Product } from "../pages";
import services from "../services";

export const useProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([])

  const toast = useToast({ position: "top" });

  const list = async () => {
    try {
      setIsLoading(true);

      const response = await services.product.list();

      setProducts(response)
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

  const create = async (product: Omit<Product, "id" | "created_at">) => {
    try {
      const response = await services.product.create(product);

      setProducts([response, ...products])
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  }
  
  const update = async (productId: string, data: Omit<Product, "id">) => {
    try {
      const response = await services.product.update(productId, data);

      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return response
        }

        return product
      })

      setProducts(updatedProducts)
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  }

  const remove = async (productId: string) => {
    try {
      await services.product.delete(productId);

      const updatedProducts = products.filter(product => product.id !== productId)
      
      setProducts(updatedProducts)
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  }

  return {
    list, 
    create,
    update,
    remove,
    isLoading,
    products
  }
}