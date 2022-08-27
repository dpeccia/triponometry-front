import {Box, Divider, Heading, SimpleGrid} from "@chakra-ui/react";
import {MealItem} from "./MealItem";

export const MealInput = (props) => {
    return (
        <Box marginBottom={8}>
            <Heading fontSize='xl' textAlign='left' >
                Comidas
            </Heading>
            <Divider borderColor={"black"} marginBottom={2}/>
            <SimpleGrid columns={2} spacing={2}>
                <MealItem label={"Desayuno"} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, desayuno: value}))}}/>
                <MealItem label={"Merienda"} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, merienda: value}))}}/>
                <MealItem label={"Almuerzo"} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, almuerzo: value}))}}/>
                <MealItem label={"Cena"} handleChange={(value) => {props.setSelectedHorarios(prevState => ({...prevState, cena: value}))}}/>
            </SimpleGrid>
        </Box>
    )
}