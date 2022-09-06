import {Box, Divider, Heading, Input, VStack} from "@chakra-ui/react";

export const BedInput = (props) => {
    return (
        <Box marginBottom={8}>
            <Heading textAlign='left' fontSize='xl'>
                Levantarse Dormirse
            </Heading>
            <Divider borderColor={"black"} marginBottom={2}/>
            <VStack columns={2} spacing={2} alignItems='flex-start'>
                <Box>
                    Quiero levantarme no antes de las:
                    {<Input type="time" marginLeft={1} w='auto' value={props.selectedHorarios.despertarse} onChange={(event) => {props.setSelectedHorarios(prevState => ({...prevState, despertarse: event.target.value}))}}/>}
                </Box>
                <Box>
                    Quiero dormirme no despues de las:
                    {<Input type="time" marginLeft={1} w='auto' value={props.selectedHorarios.dormirse} onChange={(event) => {props.setSelectedHorarios(prevState => ({...prevState, dormirse: event.target.value}))}}/>}
                </Box>
            </VStack>
        </Box>
    )
}