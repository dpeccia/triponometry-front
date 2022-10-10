import {
    Button,
    Divider,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useState } from "react"
import { deleteDraft } from "../../../BackendService";

export const DeleteDraftModal = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirmClick = async () => {
        setIsLoading(true)
        const response = await deleteDraft(props.draftId)
        if (response?.status !== "Error") {
            toast({
                title: 'Borrador eliminado con exito!',
                description: `Su borrador ${props.calculationName} fue eliminado correctamente`,
                variant: 'top-accent',
                status: 'success',
                isClosable: true,
            })

            onClose()
            props.fetchCalculations()
        } else {
            toast({
                title: 'Error',
                description: response.msg,
                variant: 'top-accent',
                status: 'error',
                isClosable: true,
            })
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
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader> Eliminar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            ¿Estas seguro que deseas eliminar el calculo  <Text as='abbr' fontWeight='bold'> {props.calculationName} </Text> ?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={handleConfirmClick}> Si, eliminar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}