import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, FormControl, FormLabel, Input, Flex, Avatar,
    useDisclosure, FormErrorMessage,
    IconButton
} from "@chakra-ui/react";
import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { isEmpty } from "lodash";
import { saveNewTrip } from "../../../BackendService";
import { useToast } from "../useToast";
import { useNavigate } from "react-router";

export const SaveDraftModal = ({ calculatorInputs, isDisabled }) => {
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
            return <FormErrorMessage>Debe ingresar un nombre</FormErrorMessage>
    }

    const saveTrip = async () => {
        if(isEmpty(tripName)) {
            setError(true)
            return
        } 

        setIsLoading(true)
        const response = await saveNewTrip(tripName, calculatorInputs, null)
        
        if (response?.status !== "Error") {
            showSuccessToast('Borrador guardado!', `Su borrador a ${calculatorInputs.city.name} fue guardado correctamente`)
            onClose()
            navigate("/mis-calculos",{state: {defaultIndex: 1}})
        } else {
            showErrorToast(response.msg)
        }
        setIsLoading(false)
    }

    return (
        <>
            <IconButton bg='gray.200' boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<FaSave w='40%' h='40%'/>} isDisabled={isDisabled} onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}/>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='lg'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Guardar Borrador </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column'>
                            <Text alignSelf='center' fontSize='lg'>
                                ¿Estas seguro que querés guardar el progreso de tu viaje a <Text as='abbr' fontWeight='bold'> {calculatorInputs.city.name} </Text> como borrador?
                            </Text>
                            <Flex mt={5}>
                                <Avatar size='2xl' src={calculatorInputs.city.imageUrl} mr={4}/>
                                <FormControl isInvalid={error}>
                                    <FormLabel>Ingresá un nombre para identificarlo!</FormLabel>
                                    <Input placeholder='Nombre' value={tripName} onChange={onNameInputChange}/>
                                    {checkError()}
                                </FormControl>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={saveTrip}> Si, guardar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 