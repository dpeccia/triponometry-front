import {Box, Divider, Flex, Heading} from "@chakra-ui/react";
import {IncrementDecrementInputComponent} from "../../../utils/IncrementDecrementInputComponent";

export const FreeDaysInput = (props) => {
    return (
        <Box marginBottom={8}>
            <Heading textAlign='left' fontSize='xl'>
                Dias Libres
            </Heading>
            <Divider borderColor={"black"} marginBottom={2}/>
            <Flex alignItems='center'>
                Quiero tener {<IncrementDecrementInputComponent handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, libres: value}))}}/>} dias sin actividades predefinidas
            </Flex>
        </Box>
    )
}