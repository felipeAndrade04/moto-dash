import React, { useState } from 'react'
import { Box, Table, Tbody, Td, Th, Thead, Tr, HStack, IconButton, useDisclosure } from '@chakra-ui/react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { DeleteModal } from '../../../../components'
import { useOrder, useProduct } from '../../../../hooks'
import { formatDate, priceFormat } from '../../../../utils'
import { Product } from '../../../products'
import { Order } from '../../'

export const OrderTable = () => {
  const [order, setOrder] = useState<Order>({} as Order)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { orders, removeIsLoading, remove } = useOrder()
  const { updateProducts } = useProduct()

  const onRemove = async () => {
    await remove(order.id)
    await updateProducts(order.products, 'restore')
    onClose()
  }

  const onOpenModalRemove = (order: Order) => {
    onOpen()
    setOrder(order)
  }

  const formatProductText = (products: Product[]) => {
    return products.map(product => `${product.quantity} x ${product.name}`).join(', ')
  }

  return (
    <Box height={'70vh'} overflowY="auto">
      <Table colorScheme="blackAlpha" size="sm">
        <Thead>
          <Tr>
            <Th w={'150px'}>Data</Th>
            <Th>Produtos</Th>
            <Th w={'140px'}>Total</Th>
            <Th textAlign="center" w={'120px'}>Remover</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => {
            return (
              <Tr key={order.id}>
                <Td>{formatDate(order.created_at.toDate())}</Td>
                <Td>{formatProductText(order.products)}</Td>
                <Td>{priceFormat(order.totalValue)}</Td>
                <Td>
                  <HStack justifyContent="center">
                    <IconButton
                      marginInlineStart="0px"
                      size="sm"
                      colorScheme="red"
                      aria-label='Excluir Produto'
                      icon={<RiDeleteBin6Line />}
                      onClick={() => onOpenModalRemove(order)}
                    />
                  </HStack>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <DeleteModal
        title="Deletar Venda!"
        description="Tem certeza que deseja excluir a venda?"
        isOpen={isOpen}
        isLoading={removeIsLoading}
        onOpen={onOpen}
        onClose={onClose}
        onDelete={onRemove}
      />
    </Box>
  )
}