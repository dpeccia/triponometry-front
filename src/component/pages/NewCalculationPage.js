import {Flex, Spinner} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import {CityInput} from "../calculator/inputs/city/CityInput";
import { ResultPage } from "./ResultPage";
import { calculateNewTrip } from "../../BackendService";
import { isNull } from "lodash";
import { Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

export const NewCalculationPage = () => {
    const toast = useToast()
    const handleClick = (inputComponent) => { setInputComponent(inputComponent) }

    const [calculatorInputs, setCalculatorInputs] = useState({
        city: {}, accommodation: {}, activities: [], horarios: {}, mobility: "", days: {}, money: {}
    });
    const [inputComponent, setInputComponent] = useState(
        <CityInput nextStep={handleClick} setCalculatorInputs={setCalculatorInputs}/>
    );
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

        return (
            <ResultPage calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} />
        );
    }

    return (
        <>
            <CalculatorComponent handleClick={handleClick} calculatorInputs={calculatorInputs} setCalculatorInputs={setCalculatorInputs} calculateTrip={calculateTrip} />
            <Flex marginLeft={3} grow='1' justifyContent='center'>
                {inputComponent}
            </Flex>
        </>
    );
}