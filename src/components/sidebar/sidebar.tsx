import { 
  Box, 
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerHeader, 
  DrawerOverlay, 
  useBreakpointValue 
} from "@chakra-ui/react"
import { SidebarNav } from "./sidebar-nav"

export function Sidebar() {
  const isDrawerSidebar = useBreakpointValue({
    base: false,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer placement="left" isOpen={true} onClose={() => {}}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="2">
      <SidebarNav />
    </Box>
  );
}