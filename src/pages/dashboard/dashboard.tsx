import React from "react";
import { PageLayout } from "../../components";
import { OrderChart } from "./";
import { useDashboard } from "../../hooks";

export const Dashboard = () => {
  const { graphData, isLoading, ordersQuantity, totalValue } = useDashboard()

  console.log(ordersQuantity, totalValue)

  return (
    <PageLayout>
      <OrderChart graphData={graphData} isLoading={isLoading} />
    </PageLayout>
  )
}