import {Flex, Button, Link, Text, HStack, useToast, Divider, Image} from "@chakra-ui/react"
import {useEffect, useState} from "react"
import {Link as ReachLink, useNavigate} from "react-router-dom";
import { logIn, signUp, googleLogIn } from "../../BackendService";
import { GoogleLoginInput } from "../login/GoogleLogin/GoogleLogin";
import {EmailInput} from "../login/EmailInput";
import {PasswordInput} from "../login/PasswordInput";
import {ConfirmPassInput} from "../login/ConfirmPassInput";
import {UsernameInput} from "../login/UsernameInput";



export const SignUpPage = (props) => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [usernameValid, setUsernameValid] = useState(false)

    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(false)

    const [password, setPassword] = useState("")
    const [passwordValid, setPasswordValid] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false)

    useEffect(() => {
        setConfirmPasswordValid(false)
    }, [password])

    const handleRegistrarmeClick = async () => {
        const params = {}
        params.email = email
        params.password = password

        if (!passwordValid || !confirmPasswordValid || !emailValid || !usernameValid){
            toast({
                title: 'Error',
                description: "Corrija los campos en rojo y vuelva intentar",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        } else {
            setIsLoading(true)
            const response = await signUp(email, password, username)

            if(response.status !== "Error"){
                const logInResponse = await logIn(email, password)
                if (logInResponse?.status !== "Error") {
                    props.changeAvatar(username, "")
                    navigate("/mis-calculos")
                } else {
                    toast({
                        title: 'Error',
                        description: logInResponse.msg,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                }
            } else {
                toast({
                    title: 'Error',
                    description: response.msg,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                })
            }
            setIsLoading(false)
        }
    }

    const handleGoogleLogInClick = async (gmail,gpassword, avatar, gusername) => {
        const response = await googleLogIn(gmail,gpassword, gusername)
        if (response?.status !== "Error") {
            props.changeAvatar(gusername, avatar)
            navigate("/mis-calculos")
        } else {
            toast({
                title: 'Error',
                description: response.msg,
                status: 'error',
                duration: 5000,
                isClosable: true
            })
        }
    }

    return(
        <>
            <Image src={'../esquina-derecha.png'} h='300px' position='absolute' zIndex='-1' right='0' top='0'/>
            <Image src={'../esquina-izquierda.png'} h='300px' position='absolute' zIndex='-1' left='0' bottom='4'/>
            <Flex direction='column' grow={2} justifyContent='center' alignItems='center'>
                <Flex direction='column' minW='440px' h='550px' borderWidth='1px' borderRadius='40px' px='5' py='6' boxShadow='lg'>
                    <Flex justifyContent='center'>
                        <Image w='300px' mb={3} src={'../nombre-triponometry.png'} />
                    </Flex>
                    <Divider borderColor='blackAlpha.300' marginBottom={2}/>
                    <Flex direction='column' grow={2}>
                        <Text as='b' align='center' my={2} fontSize='3xl' color='#E87288'> Crear cuenta </Text>
                        <UsernameInput setUsername={setUsername} setUsernameValid={setUsernameValid}/>
                        <EmailInput email={email} setEmail={setEmail} setEmailValid={setEmailValid}/>
                        <PasswordInput password={password} setPassword={setPassword} passwordValid={passwordValid} setPasswordValid={setPasswordValid}/>
                        <ConfirmPassInput password={password} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} confirmPasswordValid={confirmPasswordValid} setConfirmPasswordValid={setConfirmPasswordValid}/>
                    </Flex>
                    <Flex direction='column' alignItems='center'>
                        <Button isLoading={isLoading} size='sm' variant='solid' bg='#EFB4BF' shadow='md' w='full' mt={3} mb={2} type='submit' isDisabled={!passwordValid || !confirmPasswordValid || !emailValid || !usernameValid} onClick={handleRegistrarmeClick}> Registrarme </Button>
                        <GoogleLoginInput action="signUp" actionTitle="Registrarme con Google" logInAction={handleGoogleLogInClick}/>
                        <HStack mt={2}>
                            <Text fontSize='xs'>¿Ya tenés cuenta?</Text>
                            <Link as={ReachLink} to="/sign-in" fontSize='xs' fontWeight='bold'>
                                Inicia sesión
                            </Link>
                        </HStack>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}