import { Flex, Heading, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { Button } from "@chakra-ui/button"
import { useNavigate } from "react-router"

export const EmptySavedPage = () => {
    const navigate = useNavigate()

    return (
        <Flex h='100%' justify='center' align='center' direction='column'>
            <Image src={'../mundo.jpeg'} h='350px'/>
            <Heading mt='3' fontSize='2xl' >No tenés ningún viaje guardado</Heading>
            <Text mt='3'>Generá un nuevo cálculo de viaje y guardalo para poder visualizarlo acá</Text>
            <Button mt='8' size='lg' variant='solid' bg='#EFB4BF' shadow='md' onClick={() => navigate('/nuevo')}>
                Nuevo Cálculo de Viaje
            </Button>
            <Text mt='3' fontSize='sm'>
                O generá un nuevo cálculo a partir de uno hecho por otro usuario
            </Text>
            <Text fontSize='sm'>
                navegando a 
                <Button variant='link' fontSize='sm' fontWeight='normal' mx='1' onClick={() => navigate('/explorar')}>
                    la pantalla de Explorar
                </Button>y usandolo como plantilla
            </Text>
        </Flex>
    )
}