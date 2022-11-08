import {Button, Flex, Image, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router";

export const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Image src={'../nombre-triponometry.png'} w='450px' position='absolute' top='10' left='10'/>
            <Image src={'../esquina-derecha.png'} h='300px' position='absolute' right='0' top='0'/>
            <Image src={'../esquina-izquierda.png'} h='300px' position='absolute' left='0' bottom='4'/>
            <Flex direction='column' grow='2' alignItems='flex-end'>

                <Flex grow='2' alignItems='center' alignSelf='center'>
                    <Flex direction='column' gap={3} w='450px' >
                        <Text fontSize='4xl'>¡Planificá tu viaje ideal!</Text>
                        <Text fontSize='md' textAlign='justify'>
                            Creá tu cronograma óptimo de viaje en base a tus gustos
                            <br />
                            y tus tiempos con tan solo unos clicks
                        </Text>
                        <Flex>
                            <Button variant='solid' bg='#EFB4BF' shadow='md' mt={4} onClick={() => navigate("/sign-up")}>
                                Registrarme
                            </Button>
                        </Flex>
                        <Button alignSelf='flex-start' variant='link' size='xs' fontWeight='normal' mt={1} onClick={() => navigate("/nuevo")}>
                            Continuar sin registrarme
                        </Button>
                    </Flex>
                    <Flex direction='column' justifyContent='space-between' alignItems='flex-end' grow='2'>
                        <Button variant='solid' colorScheme='gray' shadow='md' mb={4} onClick={() => navigate("/sign-in")}>
                            Iniciar sesión
                        </Button>
                        <Image w='30%' h='80%' zIndex='-1' boxSize='3xl' src={'../landing.png'} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}