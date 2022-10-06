import React from 'react'
import {
  Flex,
  IconButton,
  Text
} from '@chakra-ui/react';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { CartProps } from './';
import { useOrder } from '../../hooks';

export const Cart = ({ onClick }: CartProps) => {
  const { order: { products } } = useOrder()

  return (
    <Flex position="relative">
      <Flex position="absolute" top="0" right="14px" bg="gray.300" borderRadius={999} zIndex={1} paddingX="5px">
        <Text fontSize="xs">{products?.length || 0}</Text>
      </Flex>
      <IconButton
        marginRight="16px"
        size="md"
        colorScheme="blue"
        aria-label='Excluir Produto'
        icon={<MdOutlineLocalGroceryStore size={28} />}
        variant="ghost"
        onClick={onClick}
        isDisabled={!products?.length}
      />
    </Flex>
  )
}