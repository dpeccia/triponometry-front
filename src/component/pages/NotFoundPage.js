import {useLocation, useNavigate} from "react-router";
import {Button, Flex, Image, Text} from "@chakra-ui/react";
import {ArrowLeftIcon} from "@chakra-ui/icons";

export const NotFound = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate()

    return (
        <>
            <Flex direction='column' grow='2' alignItems='flex-end'>
                <Flex grow='2' alignItems='center' alignSelf='flex-start' gap={9}>
                    <Image boxSize='xs' m={5} src={'../compass.png'} />
                    <Flex direction='column' w='450px'>
                        <Text color='#F08B9D ' fontSize='4xl' as='b'>
                            ¡Oops! Por acá no es...
                        </Text>
                        <Text fontSize='xl' as='cite'>
                            '{pathname}'
                        </Text>
                        <Text fontSize='xl'>
                            no existe o no tenés autorización.
                        </Text>
                        <Button leftIcon={<ArrowLeftIcon />} mt={4} w='230px' bg='gray.400' color='white' onClick={() => navigate("/mis-calculos")}>
                            Volver a Mis Cálculos
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}