import { Flex, Avatar, Box, Heading, Icon, Text, Tooltip } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export const MyCalculationInfo = ({ml, calculatorName, calculatorInputs, calculatorOutputs, isDraft, userInfo }) => {

    const heading = () => {
        if(!isDraft){
            return(
                <Heading size='md' color='red.300'>Cálculo óptimo para {calculatorInputs.city.name} en {calculatorOutputs.daysAmount} días</Heading>
            )
        } else {
            <Heading size='md' color='red.300'>Borrador de viaje a {calculatorInputs.city.name}</Heading>
        }
    }

    const verifiedUser = () => {
        if(userInfo.verified){
            return(                 
                <Flex alignItems='center' mt={2}>
                    <Icon as={BsFillCheckCircleFill} color='blue.400'/>
                    <Tooltip label={userInfo.username} bg='blue.400'>   
                        <Text ml={1} as='b' fontSize='sm' color='blue.400'> Publicado por un usuario verificado</Text>
                    </Tooltip>
                </Flex>
            )
        }
    }

    return (
        <Flex ml={ml} mb={3}>
            <Box>
                <Flex alignItems='center'>
                    <Avatar size='xl' src={calculatorInputs.city.imageUrl}/>
                    <Flex direction='column' alignContent='space-around' ml={3}>
                        <Heading size='lg' mb={2}>{calculatorName}</Heading>
                        {heading()}
                        {verifiedUser()}
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}