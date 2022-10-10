import { Button, ModalBody, ModalFooter, Text, Box, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { sendRestorePasswordEmail } from "../../../BackendService";
import { useToast } from "@chakra-ui/toast";
import { EmailInput } from "../EmailInput";

export const EmailSendStep = ({ next, restoreInfo, setRestoreInfo, closeModal }) => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    
    const sendEmail = async () => {
        setIsLoading(true)
        const response = await sendRestorePasswordEmail(restoreInfo.email)
        
        if (response?.status !== "Error") {
            toast({
                title: 'Email enviado!',
                description: `Se ha enviado un email con un codigo de verificacion a: ${restoreInfo.email}`,
                variant: 'top-accent',
                status: 'success',
                isClosable: true,
            })

            next('SECOND_STEP')
        } else {
            toast({
                title: 'Error',
                description: response.msg,
                variant: 'top-accent',
                status: 'error',
                isClosable: true,
            })
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
                    Podés restablecerla en tres sencillos pasos!
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