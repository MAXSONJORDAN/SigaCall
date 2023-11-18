import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { type } from "os"

type IDeleteButtonProps = {
    title?: string,
    description?: string,
    onConfimation?: () => void
}
export const DeleteButton = (props: IDeleteButtonProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (<>
        <Button colorScheme="red" onClick={onOpen}>Delete</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.title ?? "Tem certeza de que deseja excluir este item?"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {props.description ?? "Esta ação não pode ser desfeita. Ao confirmar a exclusão, todas as informações associadas a este item serão permanentemente removidas."}
                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onClose}>Cancelar</Button>
                    <Button colorScheme='red' mr={3} onClick={() => {
                        if (props.onConfimation) {
                            props.onConfimation();
                        }
                        onClose();
                    }}>
                        Confirmar Exclusão
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}