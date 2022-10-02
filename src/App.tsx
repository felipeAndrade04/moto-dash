import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './styles/theme';
import { useNavigate } from 'react-router-dom';
import { Routes } from './routes';
import { useAuth } from './hooks';

function App() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    let route = '/login'

    if (user) {
      route = '/'
    }

    navigate(route)
  }, [user])

  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
}

export default App;
