import { Box, Flex, HStack, Image, Link, Divider, VStack, Heading, Text, Input, Button} from "@chakra-ui/react"
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {Link as ReachLink, useNavigate} from "react-router-dom";
import { logIn } from "../../BackendService";
import { ErrorBadge } from "../login/ErrorBadge";
import { PasswordInput } from "../login/PasswordInput";

export const LoginPage = (props) => {

    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleLogInClick = async () => {
        const response = await logIn(email,password)
        if(!response) {
            setError("Usuario y/o contraseña incorrectos")
        } else {
            props.changeAvatar(email, "")
            navigate("/mis-calculos")
        }
        
    }

    return(
        <Box borderWidth='2px' borderRadius='lg' overflow='hidden' margin='auto'>

            <Flex justifyContent='flex-start' direction='row' >
                <Flex m={2} mr={8} justifyContent='center' alignContent='center'>
                    <Image w='40vh' src={'../nombre-triponometry.png'} />
                </Flex>
                <Flex justifyContent="flex-end" grow={1} bg='#FFF' m={2} alignSelf='center' color='red.400' fontWeight='bold'>    
                    <Link as={ReachLink} to="/sign-up" >
                        Registrarme 
                    </Link>
                </Flex>
            </Flex>

            <Divider borderColor='blackAlpha.300' marginBottom={2}/>

            <HStack m={2}>

                <Image src={'../bag.png'}/>

                <VStack alignItems='baseline' ml={4}>

                    <Box margin="auto">
                        <Heading fontSize='2xl' alignSelf='self-start'> Bienvenido </Heading>
                        <Text fontSize='xs' alignSelf='self-start' color='blackAlpha.600'>Inicia sesión para continuar</Text>
                    </Box>

                    <VStack>
                        {error !== null ? (<ErrorBadge msg={error}/>) : (<></>)}
                        <Input placeholder='Email' mb={1} onChange={handleEmailChange} isInvalid={error !== null} size="md"  maxWidth="-moz-initial"/>
                        <PasswordInput handleChange={handlePasswordChange} isInvalid={error !== null}/>
                        <Link as={ReachLink} to="/help-password" fontSize='xs'>
                            Olvidaste tu Contraseña? 
                        </Link>
                        
                        <HStack mt={2}>
                            <Button mr={1} size='sm' leftIcon={<FcGoogle/>} fontWeight='normal' shadow='md'>
                                Iniciar sesión con Google
                            </Button>
                            <Button size='sm' bg='red.400' color='white' onClick={handleLogInClick}>
                                Iniciar Sesión
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </HStack>
        </Box>
    )
}