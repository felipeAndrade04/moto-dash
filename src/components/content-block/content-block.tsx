import { HStack, Stack, Heading, Divider } from "@chakra-ui/react";

import { ContentBlockProps } from "./";

export function ContentBlock({ children, headerButton, title }: ContentBlockProps) {
  return (
    <Stack w="100%" h="100%" spacing={4}>
      {title && (
        <>
          <HStack justifyContent="space-between">
            <Heading fontSize="24px" fontWeight="normal">{title}</Heading>
            {headerButton}
          </HStack>
          <Divider borderColor="blackAlpha.400" />
        </>
      )}

      {children}
    </Stack>
  )
}