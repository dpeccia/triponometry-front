import {Box, Button, Flex, Image, Link, Text} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";
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
                        <Text fontSize='4xl'>Planificá tu viaje ideal!</Text>
                        <Text fontSize='md' textAlign='justify'>
                            Creá tu cronograma óptimo de viaje en base a tus gustos,
                            <br />
                            tus tiempos y tu presupuesto con tan solo unos clicks
                        </Text>
                        <Button mt={4} w='150px' bg='#F0A7B4' fontWeight='bold' color='white'  onClick={() => navigate("/sign-up")}>
                            Registrarme
                        </Button>
                    </Flex>
                    <Flex direction='column' justifyContent='space-between' alignItems='flex-end' grow='2'>
                        <Button mb={4} bg='gray.400' fontWeight='bold' color='white'  onClick={() => navigate("/sign-in")}>
                            Iniciar sesión
                        </Button>
                        <Image w='30%' h='80%' zIndex='-1' boxSize='3xl' src={'../landing.png'} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}