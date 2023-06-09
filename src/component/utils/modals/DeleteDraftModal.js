import {
    Button,
    Divider,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import { useState } from "react"
import { deleteDraft } from "../../../BackendService";
import { useToast } from "../useToast";

export const DeleteDraftModal = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const [showSuccessToast, showErrorToast] = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirmClick = async () => {
        setIsLoading(true)
        const response = await deleteDraft(props.draftId)
        if (response?.status !== "Error") {
            showSuccessToast('¡Borrador eliminado con éxito!', `Tu borrador ${props.calculationName} fue eliminado correctamente`)
            onClose()
            props.fetchCalculations()
        } else {
            showErrorToast(response.msg)
        }
        setIsLoading(false)
    }

    return (
        <>
            <IconButton
                as={props.icon}
                size='sm'
                ml={1}
                p={2}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            />
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Eliminar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            ¿Estás seguro que querés eliminar el cálculo  <Text as='abbr' fontWeight='bold'> {props.calculationName} </Text> ?
                        </Text>
                        <Text mt='3'>
                            Esta acción es definitiva y ya no vas a poder recuperarlo
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={handleConfirmClick}> Sí, eliminar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}