import {
    Button,
    Divider, Flex,
    IconButton, Input,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, useClipboard,
    useDisclosure
} from "@chakra-ui/react";
import { useState } from "react"
import {FaShareSquare} from "react-icons/fa";

export const ShareCalculationModal = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const [value, setValue] = useState(`http://localhost:3000/explorar/${props.calculationId}`)
    const { hasCopied, onCopy } = useClipboard(value)

    return (
        <>
            <IconButton as={FaShareSquare} size='sm' m={1} p={2}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            />
            <Modal isCentered size='xl' isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader> Compartir cálculo </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex mt={2} mb={2}>
                            <Input value={value} isReadOnly placeholder='Welcome' />
                            <Button onClick={onCopy} ml={2}>
                                {hasCopied ? 'Copiado' : 'Copiar'}
                            </Button>
                        </Flex>
                        <Text p={1}>
                            Cualquier usuario que haya iniciado sesión y tenga acceso a este vínculo podrá
                            <Text as='em' fontWeight='bold'> visualizar tu calculo o usarlo cómo plantilla </Text>.
                        </Text>
                        <Text p={1} color='red.300' fontWeight='bold'>
                            No te preocupes, no podrá modificar tu calculo!
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}