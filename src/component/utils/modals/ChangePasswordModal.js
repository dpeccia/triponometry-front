import {Center, VStack, Button, Modal, useDisclosure, MenuItem, ModalOverlay, ModalContent, ModalHeader, Divider, ModalCloseButton, ModalBody} from "@chakra-ui/react"
import { PasswordInput } from "../../login/PasswordInput"
import { useState, useEffect } from "react"
import { updateUserPassword } from "../../../BackendService"
import { useNavigate } from "react-router"
import { ConfirmPassInput } from "../../login/ConfirmPassInput"
import { useToast } from "../useToast"
import {BsNutFill} from "react-icons/bs";

export const ChangePasswordModal = () => {

    const [actualPassword, setActualPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [arePassEquals, setArePassEquals] = useState(false)

    const {isOpen, onOpen, onClose} = useDisclosure()

    const [successToast, errorToast] = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        setArePassEquals(false)
    }, [newPassword])
    
    const handleChangePasswordClick = async () => {
        
        if (!isPasswordValid || !arePassEquals){
            errorToast("Corregí los campos en rojo y volvé a intentar")
        } else {
            const response = await updateUserPassword(actualPassword, newPassword)

            if(response.status !== "Error"){
                successToast("Cambio de contraseña exitoso", "Tu contraseña ha sido modificada exitosamente")
                navigate('/mis-calculos')
                handleClose()
    
            } else {
                errorToast(response.msg)
            }
        }
    }

    const handleClose = () => {
        setActualPassword("")
        setConfirmNewPassword("")
        setNewPassword("")
        onClose()
    }

    return(
        <>
            <MenuItem icon={<BsNutFill/>} onClick={onOpen}> Cambiar contraseña </MenuItem>
            <Modal isCentered isOpen={isOpen} onClose={handleClose} size='lg'>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader> Modificar contraseña </ModalHeader>
                    <Divider/>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Center>
                            <VStack ml={3} mr={3} mb={3}>
                                <PasswordInput setPassword={setActualPassword} placeholder='Contraseña actual'/>
                                <PasswordInput password={newPassword} setPassword={setNewPassword} passwordValid={isPasswordValid} setPasswordValid={setIsPasswordValid} placeholder='Contraseña nueva'/>
                                <ConfirmPassInput password={newPassword} setConfirmPassword={setConfirmNewPassword} confirmPasswordValid={arePassEquals} setConfirmPasswordValid={setArePassEquals} confirmPassword={confirmNewPassword}/>
                                <Button size='sm' bg='red.400' color='white' shadow='lg' w='full' mb={2} type='submit' isDisabled={!isPasswordValid || !arePassEquals} onClick={handleChangePasswordClick}> Cambiar contraseña </Button>
                            </VStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}