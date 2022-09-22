import { Flex, Avatar, Box, Heading } from "@chakra-ui/react";

export const NewCalculationResultInfo = ({ calculatorInputs, calculatorOutputs }) => {
    return (
        <div id="tripInfo">
            <Flex ml={55} mb={3}>
                <Box>
                    <Flex>
                        <Avatar size='xl' src={calculatorInputs.city.imageUrl} />
                        <Flex direction='column' marginLeft={10} >
                            <Heading size='lg' mb={2}>Tu cálculo de viaje ideal a</Heading>
                            <Heading size='md' color='red.300'>{calculatorInputs.city.name} en {calculatorOutputs.daysAmount} días</Heading>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </div>
    );
}