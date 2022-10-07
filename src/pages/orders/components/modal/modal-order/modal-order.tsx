import React from 'react'
import { Button, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ModalOrderProps } from './'
import { priceFormat } from '../../../../../utils'
import { useOrder, useProduct } from '../../../../../hooks'

export const ModalOrder = ({ isOpen, onClose }: ModalOrderProps) => {
  const { create, decrementProductQuantity, incrementProductQuantity, removeProduct, order, createIsLoading } = useOrder()
  const { updateProducts } = useProduct()

  const onCreate = async () => {
    try {
      await create(order)
      await updateProducts(order.products, 'update')
      onClose()
    } catch { }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {order.products.map(product => (
            <HStack justifyContent='space-between' marginBottom="12px">
              <Text>
                {`${product.name} - ${product.quantity} x ${priceFormat(product.price)}`}
              </Text>

              <HStack>
                <IconButton
                  size="xs"
                  colorScheme="blue"
                  aria-label='Diminuir quantidade'
                  icon={<AiOutlineMinus />}
                  onClick={() => decrementProductQuantity(product)}
                  isDisabled={!product.quantity}
                />
                <Text>{product.quantity}</Text>
                <IconButton
                  size="xs"
                  colorScheme="blue"
                  aria-label='Aumentar quantidade'
                  icon={<AiOutlinePlus />}
                  onClick={() => incrementProductQuantity(product)}
                  isDisabled={product.quantity === product.stock}
                />
                <IconButton
                  marginInlineStart="0px"
                  size="xs"
                  colorScheme="red"
                  aria-label='Excluir Produto'
                  icon={<RiDeleteBin6Line />}
                  onClick={() => removeProduct(product)}
                />
              </HStack>
            </HStack>
          ))}
        </ModalBody>

        <ModalFooter width="full" justifyContent="space-between">
          <Text>Total {priceFormat(order.totalValue)}</Text>

          <Button colorScheme='blue' onClick={onCreate} isLoading={createIsLoading} isDisabled={!order.totalValue}>
            Finalizar pedido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}