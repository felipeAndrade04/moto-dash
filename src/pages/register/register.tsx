import React from 'react'
import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterData, registerSchema } from './';
import { Input } from '../../components';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate()

  const { isLoading, register } = useAuth()

  const handleRegister: SubmitHandler<RegisterData> = async (values) => {
    register(values).then(() => {
      handleGoBack()
    })
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bg="blackAlpha.300"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="white"
        p="8"
        borderRadius={8}
        flexDir="column"
        gap={4}
        onSubmit={handleSubmit(handleRegister)}
      >
        <Heading textAlign='center'>Cadastrar</Heading>
        <Stack spacing="4">
          <Input
            type="name"
            label="Nome"
            error={errors.name}
            {...registerForm('name')}
          />
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...registerForm('email')}
          />
          <Input
            type="password"
            label="Senha"
            error={errors.password}
            {...registerForm('password')}
          />
          <Input
            type="password"
            label="Confirmação de senha"
            error={errors.confirmPassword}
            {...registerForm('confirmPassword')}
          />
          <Input
            type="token"
            label="Token"
            error={errors.token}
            {...registerForm('token')}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          size="lg"
          isLoading={isLoading}
        >
          Enviar
        </Button>
      </Flex>
    </Flex>
  )
}