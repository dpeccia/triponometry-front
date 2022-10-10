import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, FormControl, FormLabel, Input, Flex, Box,
    useDisclosure, FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { isEmpty, isNull } from "lodash";
import { saveNewTrip, saveNewEdition } from "../../../BackendService";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";
import { Radio } from "@chakra-ui/radio";
import { RadioGroup } from "@chakra-ui/radio";

export const SaveEditionModal = ({ tripId, calculatorName, calculatorInputs, calculatorOutputs }) => {
    const toast = useToast()
    const navigate = useNavigate()
    const [radioValue, setRadioValue] = useState(null)

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

    const saveEdition = async () => {
        if (radioValue == 'NEW') {
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
        } else {
            setIsLoading(true)
            const response = await saveNewEdition(tripId, calculatorName, calculatorInputs, calculatorOutputs)
            
            if (response?.status !== "Error") {
                toast({
                    title: 'Editado!',
                    description: `Su viaje a ${calculatorInputs.city.name} fue editado correctamente`,
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
        }
        setIsLoading(false)
    }

    const addName = () => {
        if (radioValue == 'NEW') {
            return (
                <Box mt={3} mx={30} >
                    <FormControl isInvalid={error}>
                        <Input placeholder='Nuevo nombre' value={tripName} onChange={onNameInputChange}/>
                        {checkError()}
                    </FormControl>
                </Box>
            )
        }
    }

    return (
        <>
            <Button leftIcon={<FaSave />} mt={5} mr="100px" w='200px' colorScheme='red' variant='solid' alignSelf='flex-end' 
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}>
                Guardar edición
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Guardar edición </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column'>
                            <Text alignSelf='center' fontSize='lg'>
                                ¿Que desea hacer con su edición de cálculo de <Text as='abbr' fontWeight='bold'> {calculatorInputs.city.name} </Text>?
                            </Text>
                            <Flex mt={5}>
                                <RadioGroup onChange={setRadioValue} value={radioValue}>
                                    <Flex direction='column' ml='10'>
                                        <Radio value='OVERRIDE'>Sobreescribir cálculo: <Text as='abbr' fontWeight='bold'>{calculatorName}</Text></Radio>
                                        <Radio value='NEW'>Crear un cálculo nuevo y mantener ambos</Radio>
                                    </Flex>
                                </RadioGroup>
                            </Flex>
                            {addName()}
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} isDisabled={isNull(radioValue)} variant='solid' bg='#EFB4BF' onClick={saveEdition}> Guardar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 