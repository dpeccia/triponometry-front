import {
    Button, Divider, Flex, FormControl, FormErrorMessage, Input, Text,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
} from "@chakra-ui/react";
import { useState } from "react"
import {updateTripAvatar} from "../../../BackendService";
import { useToast } from "../useToast";

export const EditAvatarImageModal = (props) => {
    const [showSuccessToast, showErrorToast] = useToast()

    const [imageUrl, setImageUrl] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onCancel = () => {
        setError(false)
        props.onClose()
    }

    const onImageUrlInputChange = (e) => {
        setError(false)
        setImageUrl(e.target.value)
    }

    const isValidUrl = (url) => {
        return /.*\.png$/.test(url) || /.*\.jpg$/.test(url)
    }

    const saveImageUrl = async () => {
        if(!isValidUrl(imageUrl)){
            setError(true)
            return
        }

        setIsLoading(true)
        const response = await updateTripAvatar(props.calculationId, imageUrl)

        if (response?.status !== "Error") {
            showSuccessToast('Imagen guardada!', `Tu nueva imagen fue guardado correctamente`)
            props.onClose()
            props.setHasNewImage(true)
        } else {
            showErrorToast(response.msg)
        }
        setIsLoading(false)
    }

    return (
        <>
            <Modal isCentered size='xl' isOpen={props.isOpen} onClose={onCancel}>
                {props.overlay}
                <ModalContent>
                    <ModalHeader> Cambiar imagen del cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text p={1}>
                            <Text as='b'> 1. </Text> Buscá la imagen que mas te guste en tu navegador.
                        </Text>
                        <Text p={1}>
                            <Text as='b'> 2. </Text> Copiá la direccion de la imagen.
                        </Text>
                        <Text p={1}>
                            <Text as='b'> 3. </Text> Pegá el link acá abajo.
                        </Text>
                        <Flex direction='column' mt={2} mb={2}>
                            <FormControl isInvalid={error}>
                                <Input placeholder='Ingresa acá el link...' onChange={onImageUrlInputChange}  size='sm' />
                                {error && <FormErrorMessage> Recordá que debe tener el formato .jpg o .png </FormErrorMessage>}
                            </FormControl>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onCancel} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} variant='solid' bg='#EFB4BF' onClick={saveImageUrl}> Si, editar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
