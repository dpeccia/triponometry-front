import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    Text,
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/toast";
import {unarchivedTrip} from "../../../BackendService";
import {useNavigate} from "react-router";

export const UnarchiveCalculationModal = (props) => {
    const toast = useToast()
    const navigate = useNavigate()


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
            props.onClose()
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
            <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
                {props.overlay}
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
                        <Button variant='outline' onClick={props.onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF' onClick={unarchivedCalculation}> Si, desarchivar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}