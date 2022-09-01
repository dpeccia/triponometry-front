import { Box, VStack, Heading, Flex, Image, Center, Input, Button, Link , Text, HStack, useToast} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { PasswordInput } from "../login/PasswordInput"
import { FcGoogle } from "react-icons/fc";
import {Link as ReachLink, useNavigate} from "react-router-dom";
import validator from 'validator'
import { ErrorBadge} from "../login/ErrorBadge";
import { SuccessBadge } from "../login/SuccessBadge";
import { logIn, singUp } from "../../BackendService";

export const SignUpPage = (props) => {

    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [arePassEquals, setArePassEquals] = useState(false)
    const toast = useToast()

    useEffect(() => {
        setArePassEquals(checkEquals(confirmPassword))
    }, [password])

    const handlePasswordChange = (value) => {
        setPassword(value)
        passwordStrength(value)
    }

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value)
        setArePassEquals(checkEquals(value))
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        setIsEmailValid(checkEmail(event.target.value))
    }

    const handleRegistrarmeClick = async () => {
        const params = {}
        params.email = email
        params.password = password

        if (!isPasswordValid || !arePassEquals || !isEmailValid){
            toast({
                title: 'Error',
                description: "Corrija los campos en rojo y vuelva intentar",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        } else {
            const response = await singUp(email, password)

            if(response.status !== "Error"){
                const response = await logIn(email, password)
                if(!response) {
                    toast({
                        title: 'Error',
                        description: "Se completo el registro pero no se puedo ingresar, intente ingresar mediante el login",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                } else {
                    props.changeAvatar(email, "")
                    navigate("/mis-calculos")
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
        }
    }

    const passwordStrength = (value) => {
 
        if (validator.isStrongPassword(value, {
          minLength: 8, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 0
        })) {
          setIsPasswordValid(true)
        } else {
            setIsPasswordValid(false)
        }
    }

    const checkEquals = (value) => {
        return password === value
    }

    const checkEmail = (value) => {
        return (/\S+@\S+\.\S+/.test(value));
    }

    return(
        <Box borderWidth='2px' borderRadius='lg' overflow='hidden' margin='auto'>
            <Center>
                <VStack ml={3} mr={3} mb={3}>
                    <Flex m={2} mr={8} justifyContent='flex-start' alignContent='center'>
                        <Image w='30vh' src={'../nombre-triponometry.png'} />
                    </Flex>      
                    <Heading fontSize='2xl' mb={2}> Crear cuenta </Heading>
                    <Input  mb={1} onChange={handleEmailChange} placeholder="Email" isInvalid={!isEmailValid & email !== ""} type='email'/>
                    {(isEmailValid) ? (<></>) : email !== "" ? (<ErrorBadge msg="Inserte un Email valido"/>) : (<></>)}
                    <PasswordInput handleChange={handlePasswordChange} isInvalid={!isPasswordValid && password !== ""}/>
                    {(isPasswordValid) ? (<SuccessBadge msg="Contraseña Segura" />) : (password !== "") ? (<ErrorBadge msg="Contraseña Insegura"/>) : (<></>)}
                    <PasswordInput handleChange={handleConfirmPasswordChange} placeholder='Confirmar Contraseña'/>
                    {(arePassEquals && confirmPassword !== "") ? (<SuccessBadge msg="Las contraseñas coinciden"/>) : (confirmPassword !== "") ?  (<ErrorBadge msg="Las contraseñas no coinciden"/>) : (<></>)}
                    <Button size='sm' bg='red.400' color='white' shadow='lg' w='full' mb={2} type='submit' isDisabled={!isPasswordValid || !arePassEquals || !isEmailValid} onClick={handleRegistrarmeClick}> Registrarme </Button>
                    <Button mr={1} size='sm' leftIcon={<FcGoogle/>} fontWeight='normal' shadow='md' w='full'> Registrarme con Google </Button>
                    <HStack>   
                        <Text fontSize='xs'>Ya tenés cuenta?</Text> 
                        <Link as={ReachLink} to="/" fontSize='xs' fontWeight='bold'>
                            Inicia sesión
                        </Link>
                    </HStack>
                </VStack>
            </Center>
        </Box>
    )
}

