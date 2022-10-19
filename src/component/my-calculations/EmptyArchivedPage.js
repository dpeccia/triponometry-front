import { Flex, Heading, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"

export const EmptyArchivedPage = () => {
    return (
        <Flex h='100%' justify='center' align='center' direction='column'>
            <Image src={'../mundo-dibujo.jpeg'} h='275px' />
            <Heading mt='3' fontSize='2xl' >No tenés ningún viaje archivado</Heading>
            <Text mt='3'>Cuando hayas realizado un viaje de los que guardaste, podés archivarlo</Text>
            <Text mt='3'>No podrás editar un viaje archivado pero sí desarchivarlo cuando quieras</Text>
        </Flex>
    )
}