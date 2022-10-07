import React from 'react'
import { HStack, Stack, Text } from '@chakra-ui/react'
import { CardItemProps } from './card-item.types'

export const CardItem = ({ icon, title, value }: CardItemProps) => {
  return (
    <Stack padding="16px" borderRadius="16px" bg="white" flex={1}>
      <Text color="gray.600">{title}</Text>
      <HStack>
        {icon}
        <Text fontSize="xl" color="blackAlpha.700" fontWeight={500}>{value}</Text>
      </HStack>
    </Stack>
  )
}