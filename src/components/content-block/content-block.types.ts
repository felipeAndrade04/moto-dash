import { ReactNode } from "react";

export interface ContentBlockProps {
  children: ReactNode;
  headerButton?: ReactNode;
  title?: string;
}