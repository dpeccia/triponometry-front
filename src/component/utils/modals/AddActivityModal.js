import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, FormControl, FormLabel, Input, Flex, InputGroup, InputRightAddon, Box,
    useDisclosure, FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react"
import { isEmpty, isNull} from "lodash";
import { IconButton } from "@chakra-ui/button";
import { FaPlus } from "react-icons/fa";
import { getActivityInfo } from "../../../BackendService";
import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/tag";
import { InfoOutlineIcon } from "@chakra-ui/icons";

export const AddActivityModal = (props) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    const [hoursQty, setHoursQty] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [activityInfo, setActivityInfo] = useState(null)

    const onHoursInputChange = (e) => {
        setError(false)
        setHoursQty(e.target.value)
    }

    const checkError = () => {
        if(error)
            return <FormErrorMessage>Debe ingresar el tiempo que le dedicará a esta actividad</FormErrorMessage>
    }

    const addActivity = () => {
        if(isEmpty(hoursQty)) {
            setError(true)
            return
        } 
        props.addActivity({...props.activity, timeSpent: hoursQty * 60})
    }

    const openModal = async () => {
        setIsLoading(true)

        const response = await getActivityInfo(props.city.name, props.activity.name)
        
        if (response) {
            setActivityInfo(response)
        }

        setIsLoading(false)
        setOverlay(<OverlayOne />)
        onOpen()
    }

    const showActivityInfoLabel = () => {
        if(activityInfo.minTimeSpent === activityInfo.maxTimeSpent)
            return activityInfo.minTimeSpent / 60
        else
            return `entre ${activityInfo.minTimeSpent / 60} y ${activityInfo.maxTimeSpent / 60}`
    }

    const showActivityInfo = () => {
        if (!isNull(activityInfo)) {
            return (
                <Tag mt={5} p={3} variant='outline' colorScheme='facebook'>
                    <TagLeftIcon boxSize='25px' as={InfoOutlineIcon} />
                    <Text fontSize='md'>
                    Otros usuarios indicaron que le van a dedicar {showActivityInfoLabel()} hora/s a esta actividad
                    </Text>
                </Tag>
            )
        }
    }

    return (
        <>
            <IconButton isLoading={isLoading} icon={<FaPlus w='80%' h='80%' />} onClick={openModal} colorScheme='whatsapp' size='sm' isRound />
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='lg'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Agregar actividad </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column'>
                            <Text alignSelf='center' fontSize='lg'>
                                ¿Estas seguro que querés agregar la actividad <Text as='abbr' fontWeight='bold'>{props.activity.name}</Text>?
                            </Text>
                            <Flex mt={5}>
                                <FormControl isInvalid={error}>
                                    <FormLabel>Ingrese cuantas horas le dedicará a esta actividad:</FormLabel>
                                    <InputGroup w='200px'>
                                        <Input placeholder='Ejemplo: 2' value={hoursQty} onChange={onHoursInputChange}/>
                                        <InputRightAddon children='horas' />
                                    </InputGroup>
                                    {checkError()}
                                    {showActivityInfo()}
                                </FormControl>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF' onClick={addActivity} > Agregar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 