import React, { useState } from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr, Link, Text, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { DeleteModal } from "../../../../components";
import { useOrder, useProduct } from "../../../../hooks";
import { priceFormat } from "../../../../utils";
import { ProductTableProps } from "./";
import { Product } from "../../products.types";

export const ProductTable = ({ updateProduct, onClickName }: ProductTableProps) => {
  const [productId, setProdutId] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { removeIsLoading, products, remove, add } = useProduct()
  const { order, addProduct } = useOrder()

  const onRemove = async () => {
    await remove(productId)
    onClose()
  }

  const onOpenModalRemove = (productId: string) => {
    onOpen()
    setProdutId(productId)
  }

  const handleAddProduct = (product: Product) => {
    addProduct(product)
    add(product.id)
  }

  const productDisabled = (selectedProduct: Product) => {
    if (selectedProduct.stock === 0) return true

    return !!order.products.find(product => product.id === selectedProduct.id)
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
            <Th textAlign="center" w={'150px'}>Ações</Th>
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
                    <IconButton
                      marginInlineStart="0px"
                      size="sm"
                      colorScheme="green"
                      aria-label='Adicionar Produto'
                      icon={<AiOutlinePlus />}
                      onClick={() => handleAddProduct(product)}
                      isDisabled={productDisabled(product)}
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