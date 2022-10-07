import React from "react";
import { Spinner, Stack, Text } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import { OrderChatProps, options } from "./";

export const OrderChart = ({ graphData, isLoading }: OrderChatProps) => {
  return (
    <Stack
      padding="16px"
      width="full"
      borderRadius={'16px'}
      bg="white"
      boxShadow='sm'
      flex={1}
    >
      {isLoading ? (
        <Stack height="full" width="full" justifyContent="center" alignItems="center">
        <Spinner colorScheme="blue" size="lg" />
        </Stack>
      ) : (
        <>
          <Text fontSize="18px" fontWeight="500" marginLeft="12px">
            Gráfico do total de vendas nos últimos 6 meses
          </Text>
          {/* @ts-ignore:next-line */}
          <ReactApexChart options={options} series={graphData} type="bar" height={'80%'}/>
        </>
      )}
    </Stack>
  )
}