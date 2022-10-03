import { Box, Table, Tbody, Td, Th, Thead, Tr, HStack, IconButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri'
import { OrderTableProps } from '.'
import { DeleteModal } from '../../../../components'
import { useOrder } from '../../../../hooks'
import { priceFormat } from '../../../../utils'

export const OrderTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { orders, removeIsLoading } = useOrder()

  const onRemove = () => { }

  return (
    <Box height={'70vh'} overflowY="auto">
      <Table colorScheme="blackAlpha" size="sm">
        <Thead>
          <Tr>
            <Th>Produtos</Th>
            <Th  w={'140px'}>Total</Th>
            <Th textAlign="center" w={'120px'}>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => {
            return (
              <Tr key={order.id}>
                <Td>{JSON.stringify(order.products)}</Td>
                <Td>{priceFormat(order.totalValue)}</Td>
                <Td>
                  <HStack justifyContent="center">
                    <IconButton
                      m="0"
                      size="sm"
                      colorScheme="blue"
                      aria-label='Editar Produto'
                      icon={<RiPencilLine />}
                    // onClick={() => updateOrder(order)}
                    />
                    <IconButton
                      marginInlineStart="0px"
                      size="sm"
                      colorScheme="red"
                      aria-label='Excluir Produto'
                      icon={<RiDeleteBin6Line />}
                    // onClick={() => onOpenModalRemove(order.id)}
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