import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
