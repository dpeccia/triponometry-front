import {FaEdit} from "react-icons/fa";
import {IconButton, ModalOverlay, useDisclosure} from "@chakra-ui/react";
import {EditCalculationModal} from "./EditCalculationModal";
import {useState} from "react";

export const EditCalculationIconModal = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    return(
        <>
            <IconButton as={FaEdit} size='sm' m={1} p={2}
                        onClick={() => {
                            setOverlay(<OverlayOne />)
                            onOpen()
                        }}/>
            <EditCalculationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} overlay={overlay} calculationId={props.calculationId} calculationName={props.calculationName}/>
        </>
    )
}