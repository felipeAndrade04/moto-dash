import { 
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogOverlay, 
  Button 
} from "@chakra-ui/react"
import { useRef } from "react"
import { DeleteModalProps } from "./"

export function DeleteModal(props: DeleteModalProps) {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {props.title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {props.description}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose} disabled={props.isLoading}>
              Cancelar
            </Button>
            <Button colorScheme='red' onClick={props.onDelete} ml={3} isLoading={props.isLoading}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
} 