import { Box, Heading, VStack, StackDivider } from "@chakra-ui/react";

export const TripElementPdf = (props) => {

    return (
        <>
            <VStack marginTop="10px" divider={<StackDivider borderColor='gray.200' />} spacing={4} align="stretch">
                <Box bg="#ffffff" hidden={props.shouldHideTitle}>
                    <Heading as='h3' size='md' textAlign="center">Tu {props.elementName} para {props.calculatorInputs.city.name} en {props.calculatorOutputs.daysAmount} días</Heading>
                </Box>
                {props.element}

            </VStack>
        </>
    )

}