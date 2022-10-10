import { Button, ModalBody, ModalFooter, Text, Box, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { recoverPassword } from "../../../BackendService";
import { PasswordInput } from "../PasswordInput";
import { ConfirmPassInput } from "../ConfirmPassInput";
import { useEffect } from "react";

export const RestorePasswordStep = ({ restoreInfo, closeModal }) => {
    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setConfirmPasswordValid(false)
    }, [password])
    
    const resetPassword = async () => {
        setIsLoading(true)
        const response = await recoverPassword(restoreInfo, password)
        
        if (response?.status !== "Error") {
            toast({
                title: 'Contraseña modificada',
                description: `Modificaste la contraseña del email ${restoreInfo.email}`,
                variant: 'top-accent',
                status: 'success',
                isClosable: true,
            })

            closeModal()
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

    return (
        <>
            <ModalBody>
                <Text fontSize='md'>
                    Todo listo para restablecer tu contraseña!
                </Text>
                <Box mt={3} mx={5} >
                    <FormControl>
                        <Text as='b' fontSize='md'>
                            Ingresá tu nueva contraseña
                        </Text>
                        <PasswordInput password={password} setPassword={setPassword} passwordValid={passwordValid} setPasswordValid={setPasswordValid}/>
                        <ConfirmPassInput password={password} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} confirmPasswordValid={confirmPasswordValid} setConfirmPasswordValid={setConfirmPasswordValid}/>
                    </FormControl>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' onClick={closeModal} m={1}> Cancelar </Button>
                <Button isLoading={isLoading} isDisabled={!passwordValid || !confirmPasswordValid} variant='solid' bg='#EFB4BF' onClick={resetPassword}> Restablecer contraseña</Button>
            </ModalFooter>
        </>
    )
}