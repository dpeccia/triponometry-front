import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import {useState} from "react"
import {useToast} from "@chakra-ui/toast";
import {unarchivedTrip} from "../../../BackendService";
import {RiInboxUnarchiveFill} from "react-icons/ri";
import {useNavigate} from "react-router";

export const UnarchiveCalculationModal = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const toast = useToast()
    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const unarchivedCalculation = async () => {
        const response = await unarchivedTrip(props.calculationId)
        if(response) {
            toast({
                title: 'Viaje desarchivado!',
                description: `Su viaje a ${props.calculationName} fue desarchivado correctamente`,
                variant: 'top-accent',
                status: 'success',
                isClosable: true,
            })
            onClose()
            navigate("/mis-calculos")
        } else {
            toast({
                title: 'Ocurrio un error',
                description: 'No se pudo desarchivar su viaje',
                variant: 'top-accent',
                status: 'error',
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Button rightIcon={<RiInboxUnarchiveFill />} bg='#94A1AA' variant='solid' alignSelf='flex-end'
                    onClick={() => {
                        setOverlay(<OverlayOne />)
                        onOpen()
                    }}
            >
                Desarchivar cálculo
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader> Desarchivar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            ¿Estas seguro que deseas desarchivar el calculo  <Text as='abbr' fontWeight='bold'> {props.calculationName} </Text> ?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF' onClick={unarchivedCalculation}> Si, desarchivar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}