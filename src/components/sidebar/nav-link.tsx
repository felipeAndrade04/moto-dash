import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react"
import { NavLink as NavLinkRouter } from "react-router-dom"
import { NavLinkProps } from "./"

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <NavLinkRouter to={href}>
      {({isActive}) => (
        <ChakraLink display="flex" align="center" {...rest} >
          <Icon as={icon} fontSize="20" color={isActive ? "orange.400" : "blackAlpha.800"} />
          <Text ml="4" fontWeight="medium" color={isActive ? "orange.400" : "blackAlpha.800"}>{children}</Text>
        </ChakraLink>
      )}
    </NavLinkRouter>
  )
}