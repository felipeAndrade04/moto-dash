import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './styles/theme';
import { Register } from './pages/register';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Register />
    </ChakraProvider>
  );
}

export default App;
