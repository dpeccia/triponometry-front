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
import { useToast } from "@chakra-ui/toast";
import {RatingButtons} from "../utils/RatingButtons";

export const SaveRatingModal = (props) => {
    const toast = useToast()
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
            props.onClose()
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
                        <Button variant='outline' onClick={props.onClose} m={1}> Cancelar </Button>
                        <Button variant='solid' bg='#EFB4BF' onClick={saveRating}> Si, guardar </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 