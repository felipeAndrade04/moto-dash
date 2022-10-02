import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, Text, HStack, IconButton, useDisclosure, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { DeleteModal } from "../../../../components";
import { useProduct } from "../../../../hooks";
import { priceFormat } from "../../../../utils";
import { ProductTableProps } from "./";

export const ProductTable = ({ updateProduct, onClickName }: ProductTableProps) => {
  const [productId, setProdutId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { removeIsLoading, remove, products } = useProduct()

  const onRemove = async () => {
    await remove(productId)
    onClose()
  }

  const onOpenModalRemove = (productId: string) => {
    onOpen()
    setProdutId(productId)
  }

  return (
    <Box height={'70vh'} overflowY="auto">
      <Table colorScheme="blackAlpha" size="sm">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Marca</Th>
            <Th>Preço</Th>
            <Th>Estoque</Th>
            <Th textAlign="center" w={'120px'}>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(product => {
            return (
              <Tr key={product.id}>
                <Td>
                  <Box>
                    <Link color="blue.400" onClick={() => {
                      onClickName(product)
                    }}>
                      <Text fontWeight="bold">{product.name}</Text>
                    </Link>
                  </Box>
                </Td>
                <Td>{product.brand}</Td>
                <Td>{priceFormat(product.price)}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  <HStack justifyContent="center">
                    <IconButton
                      m="0"
                      size="sm"
                      colorScheme="blue"
                      aria-label='Editar Produto'
                      icon={<RiPencilLine />}
                      onClick={() => updateProduct(product)}
                    />
                    <IconButton
                      marginInlineStart="0px"
                      size="sm"
                      colorScheme="red"
                      aria-label='Excluir Produto'
                      icon={<RiDeleteBin6Line />}
                      onClick={() => onOpenModalRemove(product.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <DeleteModal
        title="Deletar Produto!"
        description="Tem certeza que deseja excluir o produto?"
        isOpen={isOpen}
        isLoading={removeIsLoading}
        onOpen={onOpen}
        onClose={onClose}
        onDelete={onRemove}
      />
    </Box>
  )
}