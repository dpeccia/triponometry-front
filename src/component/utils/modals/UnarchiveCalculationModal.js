import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    Text,
} from "@chakra-ui/react";
import { useToast } from "../useToast";
import {unarchivedTrip} from "../../../BackendService";
import {useNavigate} from "react-router";
import { useState } from "react";

export const UnarchiveCalculationModal = (props) => {
    const [showSuccessToast, showErrorToast] = useToast()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const unarchivedCalculation = async () => {
        setIsLoading(true)
        const response = await unarchivedTrip(props.calculationId)
        if (response?.status !== "Error") {
            showSuccessToast('¡Viaje desarchivado!', `Tu viaje a ${props.calculationName} fue desarchivado correctamente`)
            props.onClose()
            navigate("/mis-calculos")
        } else {
            showErrorToast(response.msg)
        }
        setIsLoading(false)
    }

    return (
        <>
            <Modal isCentered isOpen={props.isOpen} onClose={props.onClose} size='lg'>
                {props.overlay}
                <ModalContent>
                    <ModalHeader> Desarchivar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>
                            ¿Estás seguro que querés desarchivar el cálculo  <Text as='abbr' fontWeight='bold'> {props.calculationName} </Text> ?
                        </Text>
                        <Text mt='3'>
                            Esta acción va a llevar a tu cálculo nuevamente a la pestaña <Text as='abbr' fontWeight='bold'> Guardados </Text> y vas a poder editarlo
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={props.onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={unarchivedCalculation}> Sí, desarchivar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}