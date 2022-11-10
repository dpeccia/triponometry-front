import {Box, Divider, SimpleGrid, Text} from "@chakra-ui/react";
import {MealItem} from "./MealItem";

export const MealInput = (props) => {
    return (
        <Box marginBottom={8}>
            <Text as='b' size='xs' mb={1} align='center' color='#718096'>¿Querés reservar tiempo para tus comidas?</Text>
            <Divider borderColor={"#718096"} marginBottom={2}/>
            <SimpleGrid columns={2} spacing={2}>
                <MealItem label={"Desayuno"} meal={props.selectedHorarios.desayuno} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, desayuno: value}))}}/>
                <MealItem label={"Merienda"} meal={props.selectedHorarios.merienda} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, merienda: value}))}}/>
                <MealItem label={"Almuerzo"} meal={props.selectedHorarios.almuerzo} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, almuerzo: value}))}}/>
                <MealItem label={"Cena"} meal={props.selectedHorarios.cena} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, cena: value}))}}/>
            </SimpleGrid>
        </Box>
    )
}