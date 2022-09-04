import {Box, Button, Flex, Image, Link, Text} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";
import {useNavigate} from "react-router";

export const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Flex direction='column' grow='2' alignItems='flex-end'>

                <Flex grow='2' alignItems='center' alignSelf='center'>
                    <Flex direction='column' w='450px' >
                        <Text fontSize='3xl'>Planificá tu viaje ideal!</Text>
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
                        <Image minW='512px' boxSize='lg' src={'../landing.png'} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}