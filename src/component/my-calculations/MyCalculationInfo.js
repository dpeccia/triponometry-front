import { Flex, Avatar, Box, Heading, Icon, Text, Tooltip, AvatarBadge} from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import {RiImageEditLine} from "react-icons/ri";

export const MyCalculationInfo = (props) => {

    const heading = () => {
        if(!props.isDraft){
            return(
                <Heading size='md' color='red.300'>Cálculo óptimo para {props.calculatorInputs.city.name} en {props.calculatorOutputs.daysAmount} días</Heading>
            )
        } else {
            <Heading size='md' color='red.300'>Borrador de viaje a {props.calculatorInputs.city.name}</Heading>
        }
    }

    const verifiedUser = () => {
        if(props.userInfo.verified){
            return(                 
                <Flex alignItems='center' mt={2}>
                    <Icon as={BsFillCheckCircleFill} color='blue.400'/>
                    <Tooltip label={props.userInfo.username} bg='blue.400'>
                        <Text ml={1} as='b' fontSize='sm' color='blue.400'> Publicado por un usuario verificado</Text>
                    </Tooltip>
                </Flex>
            )
        }
    }

    return (
        <>
            <Flex ml={4} mb={3}>
                <Box>
                    <Flex alignItems='center'>
                        <Flex alignItems='flex-end'>
                            <Avatar size='xl' src={props.calculatorInputs.city.imageUrl}>
                                <AvatarBadge as='button' borderColor='gray.200' bg='gray.100' boxSize='30px'>
                                    <Icon as={RiImageEditLine} boxSize='18px' onClick={props.handleEditAvatarClick}/>
                                </AvatarBadge>
                            </Avatar>
                        </Flex>
                        <Flex direction='column' alignContent='space-around' ml={3}>
                            <Heading size='lg' mb={2}>{props.calculatorName}</Heading>
                            {heading()}
                            {verifiedUser()}
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}