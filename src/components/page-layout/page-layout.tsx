import { Flex, Stack } from "@chakra-ui/react"

import { Header, ContentBlock, PageLayoutProps, Sidebar } from "../"
import { useAuth } from "../../hooks";

export function PageLayout({ children, headerButton, title }: PageLayoutProps) {
  const { user } = useAuth()

  return (
    <Stack h="100vh" w="100vw" alignItems="center" paddingX={'16px'}>
      <Header
        name={user?.displayName || ''}
        email={user?.email || ''}
      />

      <Flex w="100%" maxW={1480} mx="auto" h="100%" >
        <Sidebar />

        <Stack w="100%" bg="blackAlpha.50" borderRadius={8} p="4" h="100%">
          <ContentBlock title={title} headerButton={headerButton}>
            {children}
          </ContentBlock>
        </Stack>
      </Flex>
    </Stack>
  )
}
