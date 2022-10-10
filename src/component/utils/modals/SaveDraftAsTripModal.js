import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, Flex,
    useDisclosure
} from "@chakra-ui/react";
import { useState } from "react"
import { FaSave } from "react-icons/fa";
import {  saveNewEdition } from "../../../BackendService";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";

export const SaveDraftAsTripModal = ({ tripId, calculatorName, calculatorInputs, calculatorOutputs}) => {
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
    const [isLoading, setIsLoading] = useState(false)

    const saveEdition = async () => {
        setIsLoading(true)
        const response = await saveNewEdition(tripId, calculatorName, calculatorInputs, calculatorOutputs)
        
        if (response?.status !== "Error") {
            toast({
                title: 'Guardado!',
                description: `Su viaje ${calculatorName} fue generado correctamente`,
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
                    <ModalHeader> Guardar viaje</ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column'>
                            <Text alignSelf='center' fontSize='lg'>
                                ¿Estas seguro que querés guardar el calculo? El borrador asociado dejará de existir
                            </Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={saveEdition}> Guardar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 