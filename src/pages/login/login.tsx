import React from 'react'
import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginData, loginSchema } from '.';
import { Input } from '../../components/Form/Input';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate()

  const { isLoading, login } = useAuth()

  const handleLogin: SubmitHandler<LoginData> = async (values) => {
    await login(values)
  }

  const handleNavigateRegister = () => {
    navigate('/cadastro')
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
        onSubmit={handleSubmit(handleLogin)}
      >
        <Heading textAlign='center'>Login</Heading>
        <Stack spacing="4">
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

        </Stack>
        <Button
          colorScheme="blue"
          variant='link'
          onClick={handleNavigateRegister}
          width="100px"
          marginLeft={'auto'}
        >
          Criar conta
        </Button>
        <Button type="submit" mt="6" colorScheme="blue" size="lg" isLoading={isLoading}>Entrar</Button>
      </Flex>
    </Flex>
  )
}