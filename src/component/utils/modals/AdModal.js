import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

export const AdModal = ({isOpen, body, onClose}) => {

    return(
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader/>
                <ModalCloseButton/>
                <ModalBody>
                    {body}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}