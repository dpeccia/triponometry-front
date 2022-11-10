import {Box, Flex} from "@chakra-ui/react";
import {CalculatorScreen} from "../calculator/CalculatorScreen";
import {ResultMap} from "./ResultMap";
import {LoadScript} from "@react-google-maps/api";
import {ResultCalendar} from "./ResultCalendar";

export const ResultTrip = ({ calculatorInputs, calculatorOutputs, isDraft, loggedIn }) => {

    const showMap = () => {
        if(!isDraft){
            if(window.google) {
                return <ResultMap mapId={calculatorOutputs.mapId} accommodation={calculatorInputs.accommodation} loggedIn={loggedIn}/>
            }
            return (
                <LoadScript googleMapsApiKey="AIzaSyAIQZSE4hWZYz9YcyNuTCSjjs6j3jObME0">
                    <ResultMap mapId={calculatorOutputs.mapId} accommodation={calculatorInputs.accommodation} loggedIn={loggedIn}/>
                </LoadScript>
            );
        }
    }
    
    const showResult = () => {
        if(!isDraft)
        return (
            <ResultCalendar events={calculatorOutputs.events} daysAmount={calculatorOutputs.daysAmount} loggedIn={loggedIn}/>
        )
    }

    return (
        <Flex justify='space-around' grow={1} gap={2}>
            <Flex flexDirection="column">
                <Box margin={1} bg='#94A1AA' borderTopRadius='40px' px='3' py='3' boxShadow='lg'>
                    <CalculatorScreen calculatorInputs={calculatorInputs} width='500px' height='200px' />
                </Box>
                {showMap()}
            </Flex>
            {showResult()}
        </Flex>
    )
}