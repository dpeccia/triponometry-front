import {Box, Flex, Heading, Icon, Image, Text, Tooltip} from "@chakra-ui/react";
import {MdEmail} from "react-icons/md";
import {SiGithub} from "react-icons/si";

export const AboutThisPage = () => {

    const Integrante = (props) => {
        return (
            <Flex alignItems='center' gap={2}>
                <Text>{props.nombre}</Text>
                <Tooltip label={props.mail} placement='right'>
                    <Flex><Icon as={MdEmail} boxSize='18px'/></Flex>
                </Tooltip>
                <Tooltip label={props.github} placement='right'>
                    <Flex><Icon as={SiGithub} boxSize='18px'/></Flex>
                </Tooltip>
            </Flex>
        )
    }
    return (
        <>
            <Flex alignItems='center' justifyContent='center' gap={16} w='100%'>
                <Image src={'../poster.png'} w='700px' h='600px' rounded='3xl'/>
                <Flex direction='column' justifyContent='space-around' w='550px' h='600px' bg='blackAlpha.50' borderWidth='1px' borderRadius='40px' boxShadow='lg' p={4} >
                    <Flex direction='column' p={3}>
                        <Heading fontSize={30} mb={7} color='#E87288'>Sobre este proyecto ...</Heading>
                        <Text alignContent='stretch'>
                            <Text as='abbr' fontWeight='bold'>Triponometry®</Text> es una plataforma desarrollada para la asignatura Proyecto Final de la carrera
                            Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional - Regional Buenos Aires.
                        </Text>
                        <Text mt={3} alignContent='stretch'>
                            Su funcionamiento se basa en un <Text as='abbr' fontWeight='bold'>Algoritmo Genético</Text> para determinar tu itinerario de viaje
                            óptimo. Además, <Text as='abbr' fontWeight='bold'>se integra con Google</Text> permitiendo iniciar sesión, exportar tu calendario para la fecha que
                            quieras y exportar tu mapa con el recorrido de cada día.
                        </Text>
                    </Flex>
                    <Flex justifyContent='space-evenly' fontSize='sm'>
                        <Flex direction='column'>
                            <Text as='b' color='#E87288'> Integrantes: </Text>
                            <Integrante nombre={'Lucas Mendoza'} mail={'lmendoza@frba.utn.edu.ar'} github={'lmendoza01'}/>
                            <Integrante nombre={'Magalí Modugno'} mail={'mmodugno@frba.utn.edu.ar'} github={'mmodugno'}/>
                            <Integrante nombre={'Ivan Unterberger Bauni'} mail={'iunterbergerbauni@frba.utn.edu.ar'} github={'iunter'}/>
                            <Integrante nombre={'Diego Peccia'} mail={'dpeccia@frba.utn.edu.ar'} github={'dpeccia'}/>
                            <Integrante nombre={'Marina Posru'} mail={'mposru@frba.utn.edu.ar'} github={'mposru'}/>
                        </Flex>
                        <Flex direction='column'>
                            <Text as='b' color='#E87288'> Director de Cátedra: </Text>
                            <Text> Mag. Ing. Gabriela Salem </Text>
                            <Text as='b' color='#E87288'> Profesor a cargo del curso: </Text>
                            <Text> Mag. Ing. Roberto Eribe </Text>
                            <Text as='b' color='#E87288'> Profesor a cargo del proyecto: </Text>
                            <Text> Ing. Gisela Brassesco</Text>
                        </Flex>
                    </Flex>
                    <Image src={'../utn-frba.jpg'} />
                </Flex>
            </Flex>
        </>
    )
}