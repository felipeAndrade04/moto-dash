export interface HeaderProps {
  name: string;
  email: string;
  onCartClick: () => void
}

export interface ProfileProps {
  showProfileData?: boolean;
  name: string;
  email: string;
}

export interface CartProps {
  onClick: () => void
}