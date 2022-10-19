import { Flex, Heading, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { useNavigate } from "react-router"

export const EmptyDraftsPage = () => {
    return (
        <Flex h='100%' justify='center' align='center' direction='column'>
            <Image src={'../avion-dibujo.jpeg'} h='200px'/>
            <Heading mt='3' fontSize='2xl' >No tenés ningún borrador</Heading>
            <Text mt='3'>Los borradores sirven para cuando no terminaste de cargar los datos de tu nuevo cálculo de viaje,</Text>
            <Text>pero querés guardar el progreso para seguirlo más tarde</Text>
            <Text mt='3'>Podes guardar tu borrador desde el botón de guardado en la calculadora,</Text>
            <Text>en la pantalla de Nuevo Cálculo de Viaje</Text>
        </Flex>
    )
}