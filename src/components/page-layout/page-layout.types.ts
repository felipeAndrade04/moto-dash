import { ReactNode } from "react";

export interface PageLayoutProps {
  children: ReactNode;
  headerButton?: ReactNode;
  title?: string;
}