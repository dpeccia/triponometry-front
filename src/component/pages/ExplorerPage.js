import {
    Button, Divider,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";

export const ExplorerPage = () => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.100'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    return (
        <>
            <Button
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                Use Overlay one
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <Divider />
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Custom backdrop filters!</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}