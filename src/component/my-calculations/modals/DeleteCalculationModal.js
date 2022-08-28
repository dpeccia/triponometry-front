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

export const DeleteCalculationModal = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

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
                        <Button variant='solid' bg='#EFB4BF'> Si, eliminar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}