import {Box, Flex, Image, Link, Text} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";

export const LandingPage = () => {
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
                        <Box as='button' borderRadius='md' bg='#F0A7B4' fontWeight='bold' color='white' w='150px' h={9} mt={5} px={4}>
                            <Link as={ReachLink} to="/sign-up" >
                                Registrarme
                            </Link>
                        </Box>
                    </Flex>
                    <Flex direction='column' justifyContent='space-between' alignItems='flex-end' grow='2'>
                        <Box as='button' borderRadius='md' bg='gray.400' fontWeight='bold' color='white' w='150px' h={9} mb={5} px={4}>
                            <Link as={ReachLink} to="/sign-in" >
                                Iniciar sesión
                            </Link>
                        </Box>
                        <Image minW='512px' boxSize='lg' src={'../landing.png'} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}