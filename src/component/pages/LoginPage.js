import { Box, Flex, Image, Divider, Text, Button} from "@chakra-ui/react"
import { useState } from "react";
import { logIn,googleLogIn } from "../../BackendService";
import { ErrorBadge } from "../login/ErrorBadge";
import { GoogleLoginInput } from "../login/GoogleLogin/GoogleLogin";
import {EmailInput} from "../login/EmailInput";
import {PasswordInput} from "../login/PasswordInput";
import {useNavigate} from "react-router";
import { RestorePasswordModal } from "../utils/modals/RestorePasswordModal";
import { ModalOverlay } from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";

export const LoginPage = (props) => {

    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(5px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const handleRestorePasswordClick = () => {
        setOverlay(<OverlayOne />)
        onOpen()
    }

    const handleLogInClick = async () => {
        setIsLoading(true)
        const response = await logIn(email,password)
        if (response?.status !== "Error") {
            props.changeAvatar(response.username, "")
            navigate("/mis-calculos")
        } else {
            setError(response.msg)
        }
        setIsLoading(false)
    }

    const handleGoogleLogInClick = async (gmail,gpassword, avatar, gusername) => {
        const response = await googleLogIn(gmail,gpassword, gusername)
        if (response?.status !== "Error") {
            props.changeAvatar(gusername, avatar)
            navigate("/mis-calculos")
        } else {
            setError(response.msg)
        }
    }

    return(
        <>
            <Image src={'../esquina-derecha.png'} h='300px' position='absolute' zIndex='-1' right='0' top='0'/>
            <Image src={'../esquina-izquierda.png'} h='300px' position='absolute' zIndex='-1' left='0' bottom='4'/>
            <Flex direction='column' minW='750px' h='450px' borderWidth='1px' borderRadius='40px' boxShadow='lg' margin='auto' p={4} bg='white'>
                <Flex justifyContent='space-between' alignItems='center' direction='row' p={2} mb={2}>
                    <Image w='380px' src={'../nombre-triponometry.png'} />
                    <Button variant='link' fontWeight='bold' size='sm' m={2} onClick={() => navigate("/sign-up")}>
                        Registrarme
                    </Button>
                </Flex>
                <Divider borderColor='blackAlpha.300' marginBottom={2}/>
                <Flex justifyContent='space-around' alignItems='center' grow={2}>
                    <Image w='280px' src={'../bag.png'}/>
                    <Flex direction='column' h='315px'>
                        <Flex direction='column' mb={1}>
                            <Text as='b' fontSize='3xl' color='#E87288'> Bienvenido </Text>
                            <Text fontSize='xs' color='#718096'>Inicia sesión para continuar</Text>
                        </Flex>
                        <Flex direction='column' grow={2}>
                            <EmailInput email={email} setEmail={setEmail} setEmailValid={null}/>
                            <PasswordInput setPassword={setPassword} setPasswordValid={null}/>
                            <Button alignSelf='flex-start' variant='link' size='xs' fontWeight='normal' mt={1} onClick={handleRestorePasswordClick}>
                                ¿Olvidaste tu contraseña?
                            </Button>
                            <Box mt={3}>
                                {error !== null ? (<ErrorBadge msg={error}/>) : (<></>)}
                            </Box>
                        </Flex>
                        <Flex direction='row' my={3}>
                            <GoogleLoginInput action="logIn" actionTitle="Iniciar sesión con Google" logInAction={handleGoogleLogInClick}/>
                            <Button isLoading={isLoading} size='sm' variant='solid' bg='#EFB4BF' shadow='md' ml={3} onClick={handleLogInClick}>
                                Iniciar Sesión
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <RestorePasswordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} overlay={overlay}/>
        </>
    )
}