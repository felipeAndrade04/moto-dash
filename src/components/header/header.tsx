import {
  Flex,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react';

import { Profile, HeaderProps, Cart } from './';

export function Header({ name, email, onCartClick }: HeaderProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      mx="auto"
      align="center"
      py={2}
    >
      <Heading size="lg">Moto Dash</Heading>

      <Flex
        align="center"
        ml="auto"
      >
        <Cart onClick={onCartClick} />

        <Profile
          showProfileData={isWideVersion}
          name={name}
          email={email}
        />
      </Flex>
    </Flex>
  )
}