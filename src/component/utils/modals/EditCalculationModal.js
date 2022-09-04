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
import {FaEdit} from "react-icons/fa";

export const EditCalculationModal = (props) => {
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
            {
                props.hasText ? (
                    <Button rightIcon={<FaEdit />} bg='#94A1AA' variant='solid' alignSelf='flex-end'
                        onClick={() => {
                            setOverlay(<OverlayOne />)
                            onOpen()
                        }}
                    >
                        Editar calculo
                    </Button>
                ) : (
                    <IconButton as={FaEdit} size='sm' m={1} p={2}
                        onClick={() => {
                            setOverlay(<OverlayOne />)
                            onOpen()
                        }}
                    />
                )
            }

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader> Editar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            ¿Estas seguro que deseas editar el calculo  <Text as='abbr' fontWeight='bold'> {props.calculationName} </Text> ?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF'> Si, editar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}