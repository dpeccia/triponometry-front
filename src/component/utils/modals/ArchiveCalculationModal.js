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
import { archiveTrip } from "../../../BackendService";
import {useToast} from "@chakra-ui/toast";
import {RiInboxArchiveFill} from "react-icons/ri";

export const ArchiveCalculationModal = (props) => {
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

    const archiveCalculation = async () => {
        setIsLoading(true)
        const response = await archiveTrip(props.calculationId)
        if (response?.status !== "Error") {
            toast({
                title: 'Viaje archivado!',
                description: `Su viaje a ${props.calculationName} fue archivado correctamente`,
                variant: 'top-accent',
                status: 'success',
                isClosable: true,
            })
            props.fetchCalculations()
            onClose()
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
                as={RiInboxArchiveFill}
                size='sm'
                m={1}
                p={2}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            />
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader> Archivar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            ¿Estas seguro que deseas archivar el calculo  <Text as='abbr' fontWeight='bold'> {props.calculationName} </Text> ?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={archiveCalculation}> Si, archivar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}