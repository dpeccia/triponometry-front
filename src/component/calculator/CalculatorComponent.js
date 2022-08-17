import {AddIcon, ArrowRightIcon, EditIcon, MinusIcon} from "@chakra-ui/icons";
import { Box, Grid, VStack, IconButton, GridItem } from "@chakra-ui/react";
import { TransportationInput } from "./TransportationInput";

import { CalculatorScreen } from "./CalculatorScreen";
import { CalculatorButton } from "./CalculatorButton";
import {AccommodationInput} from "./inputs/accommodation/AccommodationInput";
import {HorariosInput} from "./inputs/horarios/HorariosInput";
import { FaEquals } from "react-icons/fa";

import {BedIcon,BusIcon,CalendarIcon,DestinationIcon,DollarIcon,HourglassIcon} from "./CalculatorIcons";
import {ActivitiesInputs} from "./inputs/activities/ActivitiesInput";

export const CalculatorComponent = (props) => {
    return(
        <Box margin={5} bg='#94A1AA' h='572px' borderRadius='40px' px='5' py='6' boxShadow='lg'>
            <VStack>
                <CalculatorScreen calculatorInputs={props.calculatorInputs} width='400px' height='250px' />
                <Grid w='100%' templateRows='repeat(3, 1fr)' templateColumns='repeat(4, 1fr)' gap={4}>
                    <CalculatorButton column='1' row='1' icon={<BedIcon w='70%' h='70%'/>} input={props.calculatorInputs.accommodation}
                        onClick={() => props.handleClick(<AccommodationInput selectedCity={props.calculatorInputs.city} nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>)} />
                    <CalculatorButton column='1' row='2' icon={<BusIcon w='70%' h='70%'/>} input={props.calculatorInputs.mobility}
                        onClick={() => props.handleClick(<TransportationInput setCalculatorInputs={props.setCalculatorInputs}/>)} />
                    <CalculatorButton column='1' row='3' icon={<CalendarIcon w='70%' h='70%'/>} input={props.calculatorInputs.days}
                        onClick={() => props.handleClick("Seleccionar Dias")} />
                    <CalculatorButton column='2' row='1' icon={<HourglassIcon w='70%' h='70%'/>} input={props.calculatorInputs.horarios}
                        onClick={() => props.handleClick(<HorariosInput setCalculatorInputs={props.setCalculatorInputs}/>)} />
                    <CalculatorButton column='2' row='2' icon={<DestinationIcon w='70%' h='70%'/>} input={props.calculatorInputs.activities}
                        onClick={() => props.handleClick(<ActivitiesInputs selectedAccommodation={props.calculatorInputs.accommodation} nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>)} />
                    <CalculatorButton column='2' row='3' icon={<DollarIcon w='70%' h='70%'/>} input={props.calculatorInputs.money}
                        onClick={() => props.handleClick("Seleccionar Presupuesto")} />

                    <GridItem gridColumnStart='3' gridRowStart='1' w='100%' h='70px'>
                        <IconButton bg='gray.200' boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<MinusIcon w='40%' h='40%'/>} onClick={() => props.handleClick("Eliminar")} />
                    </GridItem>
                    <GridItem gridColumnStart='4' gridRowStart='1' w='100%' h='70px'>
                        <IconButton bg='gray.200' boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<EditIcon w='40%' h='40%'/>} onClick={() => props.handleClick("Editar")}/>
                    </GridItem>
                    <GridItem gridColumnStart='3' gridRowStart='2' w='100%' h='100%' rowSpan='2'>
                        <IconButton bg='gray.200' boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<AddIcon w='35%' h='35%' />} onClick={() => props.handleClick("Agregar")}/>
                    </GridItem>
                    <GridItem gridColumnStart='4' gridRowStart='2' w='100%' h='100%' rowSpan='2'>
                        <IconButton bg='#EFB4BF' boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<FaEquals w='100%' h='100%' />} onClick={() => props.calculateTrip()}/>
                    </GridItem>
                </Grid>
            </VStack>
        </Box>
    )
}