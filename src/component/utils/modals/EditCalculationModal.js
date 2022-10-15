import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const EditCalculationModal = (props) => {
    const navigate = useNavigate()

    const goToEdit = () => {
        props.onClose()
        navigate(`/mis-calculos/${props.calculationId}/edicion`)
    }

    return (
        <>
            <Modal isCentered isOpen={props.isOpen} onClose={props.onClose}>
                {props.overlay}
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
                        <Button variant='outline' onClick={props.onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF' onClick={goToEdit}> Si, editar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}