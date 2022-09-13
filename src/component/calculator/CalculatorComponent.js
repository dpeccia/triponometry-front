import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import { Box, Grid, VStack, IconButton, GridItem } from "@chakra-ui/react";
import { CalculatorScreen } from "./CalculatorScreen";
import { CalculatorButton } from "./CalculatorButton";
import { FaEquals } from "react-icons/fa";
import {BedIcon,BusIcon,CalendarIcon,DestinationIcon,DollarIcon,HourglassIcon} from "./CalculatorIcons";
import { isEmpty } from "lodash";
import { SaveDraftModal } from "../utils/modals/SaveDraftModal";
import { SaveDraftEditionModal } from "../utils/modals/SaveDraftEditionModal";

export const CalculatorComponent = (props) => {
    const checkInputs = () => {
        if (Object.values(props.calculatorInputs).some(input => isEmpty(input)))
            return ({
                isDisabled: true,
                filter: 'grayscale(100%)',
                backgroundColor: 'gray.300'
            });
        else
            return ({
                isDisabled: false,
                filter: 'none',
                backgroundColor: '#EFB4BF'
            });
    }

    const draftModal = () => {
        if(!props.tripId) {
            return (
                <SaveDraftModal calculatorInputs={props.calculatorInputs} calculatorOutputs={null} isDisabled={!props.calculatorInputs.city.name}/>
            )
        } else {
            return (
                <SaveDraftEditionModal tripId={props.tripId} calculatorName={props.name} calculatorInputs={props.calculatorInputs} calculatorOutputs={null} isDisabled={props.status === 'ACTIVE'}/>
            )
        }
    }

    const { isDisabled, filter, backgroundColor } = checkInputs()

    return(
        <Box bg='#94A1AA' minW='440px' h='572px' borderRadius='40px' px='5' py='6' boxShadow='lg'>
            <VStack>
                <CalculatorScreen calculatorInputs={props.calculatorInputs} width='400px' height='250px' />
                <Grid w='100%' templateRows='repeat(3, 1fr)' templateColumns='repeat(4, 1fr)' gap={4}>
                    <CalculatorButton column='1' row='1' icon={<BedIcon w='70%' h='70%'/>} input={props.calculatorInputs.accommodation} onClick={() => props.handleClick('ACCOMMODATION')} />
                    <CalculatorButton column='1' row='2' icon={<BusIcon w='70%' h='70%'/>} input={props.calculatorInputs.mobility} onClick={() => props.handleClick('MOBILITY')} />
                    <CalculatorButton column='1' row='3' icon={<CalendarIcon w='70%' h='70%'/>} input={{}} onClick={() => {}} />
                    <CalculatorButton column='2' row='1' icon={<HourglassIcon w='70%' h='70%'/>} input={props.calculatorInputs.horarios} onClick={() => props.handleClick('TIME')} />
                    <CalculatorButton column='2' row='2' icon={<DestinationIcon w='70%' h='70%'/>} input={props.calculatorInputs.activities} onClick={() => props.handleClick('ACTIVITIES')} />
                    <CalculatorButton column='2' row='3' icon={<DollarIcon w='70%' h='70%'/>} input={{}} onClick={() => {}} />

                    <GridItem gridColumnStart='3' gridRowStart='1' w='100%' h='70px'>
                        <IconButton bg='gray.200' boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<MinusIcon w='40%' h='40%'/>} onClick={() => props.handleClick("Eliminar")} />
                    </GridItem>
                    <GridItem gridColumnStart='4' gridRowStart='1' w='100%' h='70px'>
                        {draftModal()}
                    </GridItem>
                    <GridItem gridColumnStart='3' gridRowStart='2' w='100%' h='100%' rowSpan='2'>
                        <IconButton bg='gray.200' boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<AddIcon w='35%' h='35%' />} onClick={() => props.handleClick("Agregar")}/>
                    </GridItem>
                    <GridItem gridColumnStart='4' gridRowStart='2' w='100%' h='100%' rowSpan='2'>
                        <IconButton bg={backgroundColor} filter={filter} isDisabled={isDisabled} boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={<FaEquals w='100%' h='100%' />} onClick={() => props.calculateTrip()}/>
                    </GridItem>
                </Grid>
            </VStack>
        </Box>
    )
}