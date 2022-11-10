import { Button, ModalBody, ModalFooter, Text, Box, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { sendRestorePasswordEmail } from "../../../BackendService";
import { useToast } from "../../utils/useToast";
import { EmailInput } from "../EmailInput";

export const EmailSendStep = ({ next, restoreInfo, setRestoreInfo, closeModal }) => {
    const [showSuccessToast, showErrorToast] = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    
    const sendEmail = async () => {
        setIsLoading(true)
        const response = await sendRestorePasswordEmail(restoreInfo.email)
        
        if (response?.status !== "Error") {
            showSuccessToast('¡Email enviado!', `Se te envió un email con un código de verificación a: ${restoreInfo.email}`)
            next('SECOND_STEP')
        } else {
            showErrorToast(response.msg)
        }
        setIsLoading(false)
    }

    const setEmail = (emailToSet) => {
        setRestoreInfo(prevState => ({...prevState, email: emailToSet}))
    }

    return (
        <>
            <ModalBody>
                <Text fontSize='md'>
                    ¡Podés restablecerla en tres sencillos pasos!
                </Text>
                <Box mt={3} mx={5} >
                    <FormControl>
                        <Text as='b' fontSize='md'>
                            Ingresá tu email
                        </Text>
                        <EmailInput email={restoreInfo.email} setEmail={setEmail} setEmailValid={setEmailValid}/>
                    </FormControl>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' onClick={closeModal} m={1}> Cancelar </Button>
                <Button isLoading={isLoading} isDisabled={!emailValid} variant='solid' bg='#EFB4BF' onClick={sendEmail}> Enviar email </Button>
            </ModalFooter>
        </>
    )
}