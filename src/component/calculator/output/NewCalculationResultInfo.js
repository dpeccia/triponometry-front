import { Flex, Avatar, Heading } from "@chakra-ui/react";

export const NewCalculationResultInfo = ({ calculatorInputs, calculatorOutputs }) => {
    return (
        <Flex ml={4}>
            <Flex alignItems='center'>
                <Flex alignItems='flex-end'>
                    <Avatar size='xl' src={calculatorInputs.city.imageUrl} />
                </Flex>
                <Flex direction='column' alignSelf='flex-start' ml={3}>
                    <Heading size='lg' mb={2}>Tu cálculo de viaje ideal a</Heading>
                    <Heading size='md' color='red.300'>{calculatorInputs.city.name} en {calculatorOutputs.daysAmount} días</Heading>
                </Flex>
            </Flex>
        </Flex>
    );
}