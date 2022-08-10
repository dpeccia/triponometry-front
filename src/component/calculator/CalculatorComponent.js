import { AddIcon, ArrowRightIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
import {Box, SimpleGrid, VStack, IconButton, HStack, Tag, TagLabel, TagCloseButton, Text} from "@chakra-ui/react";
import { BedIcon, BusIcon, DestinationIcon, DollarIcon, HourglassIcon, CalendarIcon } from "../icons/icons";
import {AccommodationInput} from "../AccommodationInput";
import {ActivitiesInputs} from "../ActivitiesInput";
import { HorariosInput } from "./horarios/HorariosInput";

const ItemCard = (props) => {
    if(props.children) return (
        <Tag
            borderRadius='full'
            variant='solid'
            colorScheme='blackAlpha'
            m={1}
            boxShadow='md'
        >
            <TagLabel>{props.children}</TagLabel>
            <TagCloseButton />
        </Tag>
    )
}

const MealCard = (props) => {
    if(props.meal) return (
        <ItemCard>{`${props.meal.number}${props.meal.time} para ${props.mealType}`}</ItemCard>
    )
}

const BedCard = (props) => {
    if(props.bed) return (
        <ItemCard>{`${props.bedType} a las ${props.bed}hs`}</ItemCard>
    )
}

const FreeDayCard = (props) => {
    if(props.freeDay) return (
        <ItemCard>{`${props.freeDay} dias libres`}</ItemCard>
    )
}

export const CalculatorComponent = (props) =>{

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
            </>
        )
    }

    return(
        <Box marginRight={3} bg='gray.300' borderRadius='lg'>
            <VStack>
                <Box bg='green.100' w='calc(20vw)' h='calc(30vh)' margin={5} marginRight={2} borderRadius='lg'>
                    { generateTags(props.calculatorInputs) }
                </Box>
                <HStack alignItems='flex-start'>
                    <SimpleGrid columns={2} spacing={2} w='calc(10vW)' marginBottom={5}>
                        <IconButton icon={<BedIcon w='calc(4vw)' h='calc(4vh)'/>} w='calc(5vw)' h='calc(5vh)' onClick={() => props.handleClick(<AccommodationInput selectedCity={props.calculatorInputs.city} nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>)}/>
                        <IconButton icon={<HourglassIcon w='calc(4vw)' h='calc(4vh)' />} w='calc(5vw)' h='calc(5vh)' onClick={() => props.handleClick(<HorariosInput/>)} />
                        <IconButton icon={<BusIcon w='calc(4vw)' h='calc(4vh)'/>} w='calc(5vw)' h='calc(5vh)' onClick={() => props.handleClick("Seleccionar Transporte")} />
                        <IconButton icon={<DestinationIcon w='calc(4vw)' h='calc(4vh)' />} w='calc(5vw)' h='calc(5vh)' onClick={() => props.handleClick(<ActivitiesInputs selectedAccommodation={props.calculatorInputs.accommodation} nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>)}/>
                        <IconButton icon={<CalendarIcon w='calc(4vw)' h='calc(4vh)'/>} w='calc(5vw)' h='calc(5vh)' onClick={() => props.handleClick("Seleccionar Dias")}/>
                        <IconButton icon={<DollarIcon w='calc(4vw)' h='calc(4vh)' />} w='calc(5vw)' h='calc(5vh)' onClick={() => props.handleClick("Seleccionar Presupuesto")}/>
                    </SimpleGrid>
                    <HStack>
                        <VStack>
                            <IconButton icon={<MinusIcon w='calc(2vw)' h='calc(2vh)'/>} w='calc(5vw)' h='calc(5vh)'  onClick={() => props.handleClick("Eliminar")} />
                            <IconButton icon={<AddIcon w='calc(2vw)' h='calc(2vh)' />}  w='calc(5vw)' h='calc(11vh)' onClick={() => props.handleClick("Agregar")}/>
                        </VStack>
                        <VStack>
                            <IconButton icon={<EditIcon w='calc(2vw)' h='calc(2vh)'/>} w='calc(5vw)' h='calc(5vh)'  onClick={() => props.handleClick("Editar")}/>
                            <IconButton icon={<ArrowRightIcon w='calc(2vw)' h='calc(2vh)' />}  w='calc(5vw)' h='calc(11vh)' onClick={() => props.handleClick("Calcular")}/>
                        </VStack>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    )
}