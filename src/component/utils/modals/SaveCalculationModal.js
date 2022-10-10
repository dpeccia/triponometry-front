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
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";

export const SaveCalculationModal = ({ calculatorInputs, calculatorOutputs }) => {
    const toast = useToast()
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
        const response = await saveNewTrip(tripName, calculatorInputs, calculatorOutputs)
        
        if (response?.status !== "Error") {
            toast({
                title: 'Viaje guardado!',
                description: `Su viaje a ${calculatorInputs.city.name} fue guardado correctamente`,
                variant: 'top-accent',
                status: 'success',
                isClosable: true,
            })

            onClose()
            navigate("/mis-calculos")
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
            <Button leftIcon={<FaSave />} mt={5} mr="100px" w='150px' colorScheme='red' variant='solid' alignSelf='flex-end' 
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}>
                Guardar
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='lg'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Guardar cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column'>
                            <Text alignSelf='center' fontSize='lg'>
                                ¿Estas seguro que querés guardar tu cálculo de <Text as='abbr' fontWeight='bold'> {calculatorInputs.city.name} </Text>?
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