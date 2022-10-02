import React, { useState } from "react";
import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import { PageLayout } from "../../components";
import { RiAddLine } from "react-icons/ri";
import { ProductForm, Product, ProductTable, ProductModal } from "./";

export const Products = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const clearData = () => {
    setSelectedProduct(undefined)
  }

  const hideForm = () => {
    setShowForm(false)
  }

  const updateProduct = (product: Product) => {
    setSelectedProduct(product)
    setShowForm(true)
  }

  const onSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    onOpen()
  }

  return (
    <PageLayout
      title="Produtos"
      headerButton={
        !showForm &&
        <Button
          size="sm"
          fontSize="sm"
          colorScheme="blue"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={() => {
            clearData()
            setShowForm(true)
          }}
        >
          Cadastrar produto
        </Button>
      }
    >
      {
        showForm
          ? <ProductForm data={selectedProduct} clearData={clearData} hideForm={hideForm} />
          : <ProductTable updateProduct={updateProduct} onClickName={onSelectProduct} />
      }

      <ProductModal isOpen={isOpen} onClose={onClose} product={selectedProduct} />
    </PageLayout >
  )
}