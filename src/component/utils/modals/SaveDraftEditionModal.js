import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, IconButton, Flex,
    useDisclosure
} from "@chakra-ui/react";
import { useState } from "react"
import { FaSave } from "react-icons/fa";
import {  saveNewEdition } from "../../../BackendService";
import { useToast } from "../useToast";
import { useNavigate } from "react-router";

export const SaveDraftEditionModal = ({ tripId, calculatorName, calculatorInputs, calculatorOutputs, isDisabled }) => {
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
    const [isLoading, setIsLoading] = useState(false)

    const saveEdition = async () => {
        setIsLoading(true)
        const response = await saveNewEdition(tripId, calculatorName, calculatorInputs, calculatorOutputs)
        
        if (response?.status !== "Error") {
            showSuccessToast('¡Editado!', `Tu borrador ${calculatorName} fue editado correctamente`)
            onClose()
            navigate("/mis-calculos", {state: {defaultIndex: 1}})
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
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='xl'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Actualizar Borrador</ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column'>
                            <Text alignSelf='center' fontSize='lg'>
                                ¿Estás seguro que querés actualizar el borrador <Text as='abbr' fontWeight='bold'> {calculatorName} </Text>?
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