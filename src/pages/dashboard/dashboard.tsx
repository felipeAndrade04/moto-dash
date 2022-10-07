import React from "react";
import { PageLayout } from "../../components";
import { OrderChart, CardItem } from "./";
import { useDashboard } from "../../hooks";
import { priceFormat } from "../../utils";
import { HStack, Icon } from "@chakra-ui/react";
import { RiMoneyDollarCircleLine, RiShoppingBag3Line } from "react-icons/ri";

export const Dashboard = () => {
  const { graphData, isLoading, ordersQuantity, totalValue } = useDashboard()

  console.log(ordersQuantity, totalValue)

  return (
    <PageLayout>
      <HStack>
        <CardItem title="Preço total de vendas" value={priceFormat(totalValue)} icon={<Icon as={RiMoneyDollarCircleLine} fontSize="30" color="blackAlpha.700" />} />
        <CardItem title="Quantidade total de vendas" value={`${ordersQuantity} vendas`} icon={<Icon as={RiShoppingBag3Line} fontSize="30" color="blackAlpha.700" />} />
      </HStack>
      <OrderChart graphData={graphData} isLoading={isLoading} />
    </PageLayout>
  )
}