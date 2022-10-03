import React from "react";
import { Text } from "@chakra-ui/react";

import { PageLayout } from "../../components";
import { useOrder } from "../../hooks";
import { OrderTable } from "./";

export const Orders = () => {
  const { orders } = useOrder()

  return (
    <PageLayout title="Vendas">
      <OrderTable />
    </PageLayout>
  )
}