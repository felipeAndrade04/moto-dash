import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Product } from "../pages";
import services from "../services";
import { useProductStore } from "../store";

export const useProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [removeIsLoading, setRemoveIsLoading] = useState(false);
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  const toast = useToast({ position: "top" });

  useEffect(() => {
    const loadData = async () => {
      await list();
    };

    loadData();
  }, []);

  const list = async () => {
    try {
      setIsLoading(true);

      const response = await services.product.list();

      setProducts(response);
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

  const create = async (product: Omit<Product, "id" | "created_at">) => {
    try {
      const response = await services.product.create(product);

      toast({
        title: "Produto cadastrado com sucesso!",
        status: "success",
        isClosable: true,
      });

      setProducts([response, ...products]);
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const update = async (productId: string, data: Omit<Product, "id">) => {
    try {
      const response = await services.product.update(productId, data);

      toast({
        title: "Produto atualizado com sucesso!",
        status: "success",
        isClosable: true,
      });

      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return response;
        }

        return product;
      });

      setProducts(updatedProducts);
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const updateProducts = async (
    orderProducts: Product[],
    type: "restore" | "update"
  ) => {
    try {
      const updatedProductsPromise: Promise<Product>[] = []
      
      orderProducts.forEach((product) => {
        const currentProduct = products.find((p) => p.id === product.id);

        if (!currentProduct) return;

        updatedProductsPromise.push(services.product.update(product.id, {
          ...product,
          stock:
            type === "restore"
              ? currentProduct.stock + product.quantity!
              : currentProduct.stock - product.quantity!,
        }));
      });

      const response = await Promise.all(updatedProductsPromise);

      const updatedProducts = products.map((product) => {
        const productIndex = response.findIndex(
          (resp) => resp?.id === product.id
        );

        if (productIndex >= 0) {
          return response[productIndex];
        }

        return product;
      });

      setProducts(updatedProducts);
    } catch (error) {
      const { message } = error as TypeError;
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const remove = async (productId: string) => {
    try {
      setRemoveIsLoading(true);
      await services.product.delete(productId);

      toast({
        title: "Produto deletado com sucesso!",
        status: "success",
        isClosable: true,
      });

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );

      setProducts(updatedProducts);
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

  const add = async (productId: string) => {
    const updatedProducts = products.map((product) => ({
      ...product,
      quantity: product.id === productId ? 1 : 0,
    }));

    setProducts(updatedProducts);
  };

  return {
    add,
    list,
    create,
    update,
    remove,
    updateProducts,
    isLoading,
    removeIsLoading,
    products,
  };
};
