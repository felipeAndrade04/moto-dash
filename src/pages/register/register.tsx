import React from 'react'
import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterData, registerSchema } from './';
import { Input } from '../../components/Form/Input';

export const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = () => { }

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
            {...register('name')}
          />
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
          <Input
            type="confirmPassword"
            label="Confirmação de senha"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />
          <Input
            type="token"
            label="Token"
            error={errors.token}
            {...register('token')}
          />
        </Stack>
        <Button type="submit" mt="6" colorScheme="orange" size="lg" isLoading={isSubmitting}>Enviar</Button>
      </Flex>
    </Flex>
  )
}