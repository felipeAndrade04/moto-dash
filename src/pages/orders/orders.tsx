import React from "react";

import { PageLayout } from "../../components";
import { OrderTable } from "./";

export const Orders = () => {
  return (
    <PageLayout title="Vendas">
      <OrderTable />
    </PageLayout>
  )
}