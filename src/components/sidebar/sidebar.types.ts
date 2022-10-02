import { ElementType, ReactNode } from "react"
import { LinkProps } from "@chakra-ui/react"

export interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export interface NavSrctionProps {
  title: string;
  children: ReactNode;
}