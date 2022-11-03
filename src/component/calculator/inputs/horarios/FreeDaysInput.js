import {Box, Divider, Flex, Text} from "@chakra-ui/react";
import {IncrementDecrementInputComponent} from "../../../utils/IncrementDecrementInputComponent";

export const FreeDaysInput = (props) => {
    return (
        <Box marginBottom={8}>
            <Text as='b' size='xs' mb={1} align='center' color='#718096'>¿Querés reservar dias sin actividades?</Text>
            <Divider borderColor={"#718096"} marginBottom={2}/>
            <Flex alignItems='center'>
                Quiero tener {<IncrementDecrementInputComponent value={props.selectedHorarios.libres} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, libres: value}))}}/>} dias sin actividades
            </Flex>
        </Box>
    )
}