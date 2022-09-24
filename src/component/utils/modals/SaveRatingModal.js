import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, FormControl, FormLabel, Flex,
    useDisclosure, RadioGroup, Radio, HStack, Textarea
} from "@chakra-ui/react";
import { useState } from "react"
import { BiCommentAdd } from "react-icons/bi";
import {saveNewRating} from "../../../BackendService";
import { useToast } from "@chakra-ui/toast";
import {RatingButtons} from "../RatingButtons";

export const SaveRatingModal = (props) => {
    const toast = useToast()

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const [score, setScore] = useState(0)
    const [hasDone, setHasDone] = useState('')
    const [review, setReview] = useState('')

    const saveRating = async () => {

        const response = await saveNewRating(props.calculationId, score, hasDone, review)

        if (response) {
            toast({
                title: 'Opinión guardada!',
                description: `Su opinión a ${props.calculatorName} fue guardado correctamente`,
                variant: 'top-accent',
                status: 'success',
                isClosable: true,
            })
            onClose()
            props.setNewRating(true)
        } else {
            toast({
                title: 'Ocurrio un error',
                description: 'No se pudo guardar su opinión',
                variant: 'top-accent',
                status: 'error',
                isClosable: true,
            })
        }
    }

    return (
        <>
            <Button rightIcon={<BiCommentAdd />} variant='solid' alignSelf='flex-end' ml={2}
                    onClick={() => {
                        setOverlay(<OverlayOne />)
                        onOpen()
                    }}>
                Opinar
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size='lg'>
                {overlay}
                <ModalContent>
                    <ModalHeader> Opinar sobre {props.calculatorName}  </ModalHeader>
                    <Divider />
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex direction='column' gap={5}>
                            <FormControl isRequired>
                                <FormLabel>¿Como calificás el recorrido?</FormLabel>
                                <RatingButtons setScore={setScore}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>¿Realizaste el recorrido?</FormLabel>
                                <RadioGroup onChange={setHasDone} colorScheme='blackAlpha'>
                                    <HStack spacing={5}>
                                        <Radio value={'true'}>
                                            Si
                                        </Radio>
                                        <Radio value={'false'}>
                                            No
                                        </Radio>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Escribir tu opinión</FormLabel>
                                <Textarea
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder='¿Queres decirnos algo más sobre tu cualificación?'
                                    size='sm'
                                />
                            </FormControl>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF' onClick={saveRating}> Si, guardar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 