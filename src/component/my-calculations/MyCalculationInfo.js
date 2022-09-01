import { Flex, Avatar, Box, Heading } from "@chakra-ui/react";

export const MyCalculationInfo = ({calculatorName, calculatorInputs, calculatorOutputs }) => {
    return (
        <Flex ml={55} mb={3}>
            <Box>
                <Flex alignItems='center'>
                    <Avatar size='xl' src={calculatorInputs.city.imageUrl}/>
                    <Flex direction='column' alignContent='space-around' ml={3}>
                        <Heading size='lg' mb={2}>{calculatorName}</Heading>
                        <Heading size='md' color='red.300'>Cálculo óptimo para {calculatorInputs.city.name} en {calculatorOutputs.daysAmount} días</Heading>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}