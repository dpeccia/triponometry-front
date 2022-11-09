import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, FormControl, FormLabel, Input, Flex, Avatar,
    useDisclosure, FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { isEmpty } from "lodash";
import { saveNewTrip } from "../../../BackendService";
import { useToast } from "../useToast";
import { useNavigate } from "react-router";
import { checkErrorTokenExpired } from "../../../BackendService";

export const SaveCalculationModal = ({ calculatorInputs, calculatorOutputs, logout }) => {
    const [showSuccessToast, showErrorToast] = useToast()
    const navigate = useNavigate()

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const [tripName, setTripName] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onNameInputChange = (e) => {
        setError(false)
        setTripName(e.target.value)
    }

    const checkError = () => {
        if(error)
            return <FormErrorMessage>Tenés que ingresar un nombre</FormErrorMessage>
    }

    const saveTrip = async () => {
        if(isEmpty(tripName)) {
            setError(true)
            return
        } 

        setIsLoading(true)
        const response = await saveNewTrip(tripName, calculatorInputs, calculatorOutputs)
        
        if (response?.status !== "Error") {
            showSuccessToast('¡Viaje guardado!', `Tu viaje a ${calculatorInputs.city.name} fue guardado correctamente`)
            onClose()
            navigate("/mis-calculos")
        } else {
            showErrorToast(response.msg, logout)
        }
        setIsLoading(false)
    }

    return (
        <>
            <Button leftIcon={<FaSave />} variant='solid' bg='gray.300' alignSelf='flex-end'
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}>
                Guardar
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Guardar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column'>
                            <Text alignSelf='center'>
                                ¿Estás seguro que querés guardar tu cálculo de <Text as='abbr' fontWeight='bold'> {calculatorInputs.city.name} </Text>?
                            </Text>
                            <Flex mt={5}>
                                <Avatar size='2xl' src={calculatorInputs.city.imageUrl} mr={4}/>
                                <FormControl isInvalid={error}>
                                    <FormLabel>¡Ingresá un nombre para identificarlo!</FormLabel>
                                    <Input placeholder='Nombre' value={tripName} onChange={onNameInputChange}/>
                                    {checkError()}
                                </FormControl>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={saveTrip}> Sí, guardar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 