import {Flex, Spinner} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import {CityInput} from "../calculator/inputs/city/CityInput";
import { AccommodationInput } from "../calculator/inputs/accommodation/AccommodationInput";
import { ActivitiesInputs } from "../calculator/inputs/activities/ActivitiesInput";
import { HorariosInput } from "../calculator/inputs/horarios/HorariosInput";
import { MobilityInput } from "../calculator/inputs/mobility/MobilityInput";
import { NewCalculationResult } from "../calculator/output/NewCalculationResult";
import { calculateNewTrip } from "../../BackendService";
import { isNull } from "lodash";
import { Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { EditCalculationResult } from "../calculator/output/EditCalculationResult";
import { EditBadge } from "../utils/EditBadge";

export const NewCalculationPage = ({ tripId, edit, beginInput, inputs, name }) => {
    const toast = useToast()
    const changeInputType = (inputType) => { setInputType(inputType) }

    const setInitialState = () => {
        if (edit) {
            return inputs
        } else {
            return { city: {}, accommodation: {}, activities: [], horarios: {}, mobility: "" }
        }
    }

    const [calculatorInputs, setCalculatorInputs] = useState(setInitialState());

    const [inputType, setInputType] = useState(beginInput);

    const InputComponents = {
        CITY: <CityInput calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        ACCOMMODATION: <AccommodationInput calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        ACTIVITIES: <ActivitiesInputs calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        TIME: <HorariosInput calculatorInputs={calculatorInputs} nextStep={changeInputType} setCalculatorInputs={setCalculatorInputs}/>,
        MOBILITY: <MobilityInput calculatorInputs={calculatorInputs} setCalculatorInputs={setCalculatorInputs}/>
    }

    const inputSpecificComponent = InputComponents[inputType]

    const [showResults, setShowResults] = useState(false)
    const [calculatorOutputs, setCalculatorOutputs] = useState(null)

    const calculateTrip = async () => {
        setCalculatorOutputs(null)
        setShowResults(true)

        const response = await calculateNewTrip(calculatorInputs)
        
        if (response) {
            setCalculatorOutputs({ mapId: response.kml, events: response.events, daysAmount: response.daysAmount })
        } else {
            setShowResults(false)
            toast({
                title: 'Ocurrio un error',
                description: 'No se pudo calcular su nuevo viaje',
                variant: 'top-accent',
                status: 'error',
                isClosable: true,
            })
        }
    }

    if(showResults) {
        if(isNull(calculatorOutputs)) {
            return (
                <Flex direction='column' minHeight='600px' w='100%' justify='center' align='center'>
                    <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='red.300' size='xl' mb='6'/>
                    <Heading size='md'>Calculando tu viaje ideal en {calculatorInputs.city.name}...</Heading>
                </Flex>
            );
        }

        if(edit) {
            return <EditCalculationResult setShowResults={setShowResults} id={tripId} name={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} />
        } else {
            return <NewCalculationResult setShowResults={setShowResults} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} />
        }
    }

    const addEditBadge = () => {
        if(edit)
            return <EditBadge justify='start' align='end' />
    }

    return (
        <>
            <CalculatorComponent handleClick={changeInputType} calculatorInputs={calculatorInputs} setCalculatorInputs={setCalculatorInputs} calculateTrip={calculateTrip} />
            <Flex direction='column' marginLeft={3} grow='1' alignItems='center'>
                {addEditBadge()}
                {inputSpecificComponent}
            </Flex>
        </>
    );
}