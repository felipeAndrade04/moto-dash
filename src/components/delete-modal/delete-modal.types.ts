export interface DeleteModalProps {
  title: string
  description: string
  isOpen: boolean
  isLoading: boolean
  onOpen: () => void
  onClose: () => void
  onDelete: () => void
}