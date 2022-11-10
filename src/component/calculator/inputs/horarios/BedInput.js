import {Box, Divider, Flex, Input, Text, VStack} from "@chakra-ui/react";

export const BedInput = (props) => {
    return (
        <Box>
            <Text as='b' size='xs' mb={1} align='center' color='#718096'>¿Cuánto tiempo querés dedicarle a las actividades?</Text>
            <Divider borderColor={"#718096"} marginBottom={2}/>
            <VStack columns={2} spacing={2} alignItems='flex-start'>
                <Flex alignItems='center'>
                        Quiero empezar a las
                        <Input type="time" marginLeft={1} w='auto' size='sm' value={props.selectedHorarios.despertarse} onChange={(event) => {props.setSelectedHorarios(prevState => ({...prevState, despertarse: event.target.value}))}}/>
                        <Text ml={1} color='tomato' fontSize='xl'> *</Text>
                </Flex>
                <Flex alignItems='center'>
                    Quiero terminar a las
                    {<Input type="time" marginLeft={1} w='auto' size='sm' value={props.selectedHorarios.dormirse} onChange={(event) => {props.setSelectedHorarios(prevState => ({...prevState, dormirse: event.target.value}))}}/>}
                    <Text ml={1} color='tomato' fontSize='xl'> *</Text>
                </Flex>
            </VStack>
        </Box>
    )
}