import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from "@chakra-ui/react"
import { priceFormat } from "../../../../utils";

import { ProductModalProps } from "./";

export function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do Produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack mb="4">
            <Stack flex={1}>
              <Text fontWeight="700">Nome:</Text>
              <Text mt="0">{product?.name}</Text>
            </Stack>

            <Stack flex={1}>
              <Text fontWeight="700">Marca:</Text>
              <Text>{product?.brand}</Text>
            </Stack>
          </HStack>

          <HStack mb="4">
            <Stack flex={1}>
              <Text fontWeight="700">Estoque:</Text>
              <Text>{product?.stock}</Text>
            </Stack>

            <Stack flex={1}>
              <Text fontWeight="700">Preço:</Text>
              <Text>{priceFormat(product?.price || 0)}</Text>
            </Stack>
          </HStack>

          <Text fontWeight="700">Descrição:</Text>
          <Text mb="4">{product?.description}</Text>

          <Text fontWeight="700">Modelo:</Text>
          <Text mb="4">{product?.model}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}