import React, { useState } from "react";
import { Button, Flex, HStack, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../../../components";
import { Product } from "../..";
import { productSchema, ProductFormProp } from "./";
import { floatFormat, priceFormat } from "../../../../utils";
import { useProduct } from "../../../../hooks";

export const ProductForm = ({ clearData, data, hideForm }: ProductFormProp) => {
  const [price, setPrice] = useState(priceFormat(data?.price || 0) || '')
  const { register, handleSubmit, formState } = useForm<Product>({
    resolver: yupResolver(productSchema),
    defaultValues: data
  });
  const { create, update } = useProduct()

  const handleCreate: SubmitHandler<Product> = async (values) => {
    await create({ ...values, price: floatFormat(String(values.price)) * 100, })

    hideForm()
  }

  const handleUpdate: SubmitHandler<Product> = async (values) => {
    await update(data?.id || '', { ...values, price: floatFormat(String(values.price)) * 100, })

    hideForm()
    clearData()
  }

  return (
    <Stack>
      <Stack pt={4} spacing={4}>
        <HStack spacing={4} alignItems="flex-start">
          <Input
            placeholder="Informe o nome"
            type="text"
            label="Nome"
            error={formState.errors.name}
            {...register('name')}
          />
          <Input
            placeholder="Informe a descrição"
            type="text"
            label="Descrição"
            error={formState.errors.description}
            {...register('description')}
          />
        </HStack>

        <HStack spacing={4} alignItems="flex-start">
          <Input
            placeholder="Informe o estoque"
            type="number"
            label="Estoque"
            error={formState.errors.stock}
            {...register('stock')}
          />
          <Input
            placeholder="Informe o valor"
            type="text"
            label="Valor produto"
            error={formState.errors.price}
            {...register('price')}
            value={price}
            onChange={event => setPrice(priceFormat(event.target.value))}
          />
        </HStack>

        <HStack spacing={4} alignItems="flex-start">
          <Input
            placeholder="Informe a marca"
            type="text"
            label="Marca"
            error={formState.errors.brand}
            {...register('brand')}
          />
          <Input
            placeholder="Informe o modelo"
            type="text"
            label="Modelo"
            error={formState.errors.model}
            {...register('model')}
          />
        </HStack>
      </Stack>

      <Flex paddingTop="6" justify="flex-end">
        <HStack spacing="4">
          <Button colorScheme="blackAlpha" onClick={hideForm}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting}
            onClick={data ? handleSubmit(handleUpdate) : handleSubmit(handleCreate)}
          >
            Salvar
          </Button>
        </HStack>
      </Flex>
    </Stack>
  )
}