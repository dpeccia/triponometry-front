import { Button, ModalBody, ModalFooter, HStack, Text, Box, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { isEmpty, size } from "lodash";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useToast } from "../../utils/useToast";
import { verifyRestorePasswordCode } from "../../../BackendService";

export const CodeEntryStep = ({ next, restoreInfo, setRestoreInfo, closeModal }) => {
    const [error, setError] = useState(false)
    const [showSuccessToast, showErrorToast] = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [isCodeValid, setIsCodeValid] = useState(false)
    
    const verifyCode = async () => {
        setIsLoading(true)
        const response = await verifyRestorePasswordCode(restoreInfo)
        
        if (response?.status !== "Error") {
            setError(false)
            showSuccessToast('Código verificado', 'El código que insertaste es válido')
            next('THIRD_STEP')
        } else {
            setError(true)
            showErrorToast(response.msg)
        }
        setIsLoading(false)
    }

    const setVerificationCode = (prevState, code) => {
        const newState = {...prevState, verificationCode: code}
        setIsCodeValid(!(isEmpty(newState.verificationCode) || size(newState.verificationCode) < 6))
        return newState
    }

    const onCodeInputChange = (code) => {
        setError(false)
        setRestoreInfo(prevState => setVerificationCode(prevState, code))
    }

    return (
        <>
            <ModalBody>
                <Text fontSize='md'>
                    Te enviamos un código al email: <Text as='i'>{restoreInfo.email}</Text>
                </Text>
                <Box mt={3} mx={5} >
                    <FormControl isInvalid={error}>
                        <Text as='b' fontSize='md'>
                            Ingresá el código de verificación
                        </Text>
                        <HStack mt={2}>
                            <PinInput isInvalid={error} value={restoreInfo.verificationCode} onChange={onCodeInputChange}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <Text>-</Text>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </FormControl>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' onClick={closeModal} m={1}> Cancelar </Button>
                <Button isLoading={isLoading} isDisabled={!isCodeValid} variant='solid' bg='#EFB4BF' onClick={verifyCode}> Verificar código </Button>
            </ModalFooter>
        </>
    )
}