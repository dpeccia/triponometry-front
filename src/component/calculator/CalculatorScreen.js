import { Box } from "@chakra-ui/react";
import {ScrollingBox} from "../utils/ScrollingBox";
import { ItemCard, MealCard, BedCard, FreeDayCard } from "./CalculatorTag";

export const CalculatorScreen = (props) => {
    const generateTags = (calculatorInputs) => {
        return(
            <>
                <ItemCard>{calculatorInputs.city.name}</ItemCard>
                <ItemCard>{calculatorInputs.accommodation.name}</ItemCard>
                { calculatorInputs.activities.map( (activity) => {
                    return (
                        <ItemCard>{activity.name}</ItemCard>
                    )
                })}
                <MealCard meal={calculatorInputs.horarios.desayuno} mealType='desayunar'/>
                <MealCard meal={calculatorInputs.horarios.almuerzo} mealType='almorzar'/>
                <MealCard meal={calculatorInputs.horarios.merienda} mealType='merendar'/>
                <MealCard meal={calculatorInputs.horarios.cena} mealType='cenar'/>
                <BedCard bed={calculatorInputs.horarios.despertarse} bedType='Despertarse'/>
                <BedCard bed={calculatorInputs.horarios.dormirse} bedType='Dormirse'/>
                <FreeDayCard freeDay={calculatorInputs.horarios.libres}/>
                <ItemCard>{calculatorInputs.mobility}</ItemCard>
            </>
        )
    }

    return (
        <Box bg='#DDEF8D' w={props.width} h={props.height} marginBottom='6' p='3' borderTopRadius='30' borderBottomRadius='15' boxShadow='inner'>
            <ScrollingBox>
                {generateTags(props.calculatorInputs)}
            </ScrollingBox>
        </Box>
    );
}