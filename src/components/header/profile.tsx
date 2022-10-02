import { Avatar, Box, Flex, Text, } from "@chakra-ui/react";

import { ProfileProps } from "./";
import Logo from '../../assets/logo.png'

export function Profile({ 
  showProfileData = true, 
  email, 
  name,
}: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{name}</Text>
          <Text color="gray.300" fontSize="small">
            {email}
          </Text>
        </Box>
      )}

      <Avatar size="md" name={name} src={Logo} borderWidth={2} borderColor="blue.400" />
    </Flex>
  );
}