import React, { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { PageLayout } from "../../components";
import { useProduct } from "../../hooks";

export const Products = () => {
  const { list } = useProduct()

  useEffect(() => {
    const loadData = async () => {
      const response = await list()

      console.log(response)
    }

    loadData()
  }, [])

  return (
    <PageLayout>
      <Text>Produtos</Text>
    </PageLayout>
  )
}