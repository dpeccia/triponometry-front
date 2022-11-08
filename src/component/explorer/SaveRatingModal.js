import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    FormControl, FormLabel, Flex,
    RadioGroup, Radio, HStack, Textarea
} from "@chakra-ui/react";
import { useState } from "react"
import {saveNewRating} from "../../BackendService";
import { useToast } from "../utils/useToast";
import {RatingButtons} from "../utils/RatingButtons";
import {isEmpty} from "lodash";

export const SaveRatingModal = (props) => {
    const [showSuccessToast, showErrorToast] = useToast()
    const [score, setScore] = useState(0)
    const [hasDone, setHasDone] = useState('')
    const [review, setReview] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onCancel = () => {
        setScore(0)
        setHasDone('')
        props.onClose()
    }

    const saveRating = async () => {
        setIsLoading(true)
        const response = await saveNewRating(props.calculationId, score, hasDone, review)

        if (response?.status !== "Error") {
            showSuccessToast('¡Opinión guardada!', `Tu opinión a ${props.calculatorName} fue guardada correctamente`)
            props.onClose()
            props.setNewRating(true)
        } else {
            showErrorToast(response.msg)
        }
        setIsLoading(false)
    }

    return (
        <>
            <Modal isCentered isOpen={props.isOpen} onClose={props.onClose} size='lg'>
                {props.overlay}
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
                                            Sí
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
                                    placeholder='¿Querés decirnos algo más sobre tu calificación?'
                                    size='sm'
                                />
                            </FormControl>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' onClick={onCancel} m={1}> Cancelar </Button>
                        <Button isLoading={isLoading} isDisabled={isEmpty(score) || isEmpty(hasDone)} variant='solid' bg='#EFB4BF' onClick={saveRating}> Sí, guardar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 