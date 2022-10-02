import { Stack } from "@chakra-ui/react"
import { 
  RiDashboardLine, 
  RiMoneyDollarCircleLine, 
  RiLogoutCircleLine,
  RiShoppingBag3Line
} from "react-icons/ri"

import { NavLink } from "./nav-link"
import { NavSection } from "./nav-section";
import { useAuth } from "../../hooks";

export function SidebarNav() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Stack h="100%" spacing="8" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/" icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink href="/produtos" icon={RiShoppingBag3Line}>Produtos</NavLink>
        <NavLink href="/vendas" icon={RiMoneyDollarCircleLine}>Vendas</NavLink>
      </NavSection>

      <NavSection title="CONFIGURAÇÃO">
        <NavLink href="/login"  icon={RiLogoutCircleLine} onClick={handleLogout}>
          Sair
        </NavLink>
      </NavSection>
    </Stack>
  );
}