import {Box, Flex} from "@chakra-ui/react";
import {CalculatorScreen} from "../calculator/CalculatorScreen";
import {ResultMap} from "../calculator/output/ResultMap";
import {LoadScript} from "@react-google-maps/api";
import {ResultCalendar} from "../calculator/output/ResultCalendar";
import {Export} from "../calculator/output/Export";

export const TripResult = ({ calculatorInputs, calculatorOutputs }) => {

    const showMap = () => {
        if(window.google) {
            return <ResultMap mapId={calculatorOutputs.mapId} accommodation={calculatorInputs.accommodation}/>
        }
        return (
            <LoadScript googleMapsApiKey="AIzaSyAIQZSE4hWZYz9YcyNuTCSjjs6j3jObME0">
                <ResultMap mapId={calculatorOutputs.mapId} accommodation={calculatorInputs.accommodation}/>
            </LoadScript>
        );
    }

    const showResultCalendar = () => {
        return <ResultCalendar events={calculatorOutputs.events}/>
    }

    const showExportCalendar = () => {
        return <Export exportType='calendar'requestData={calculatorOutputs.events} fileType='text/plain' fileName='myCalendar.ics' downloadText='Download Calendar'/>
    }

    return (
        <Flex justify='space-around'>
            <Flex flexDirection="column">
                <Box margin={5} bg='#94A1AA' borderTopRadius='40px' px='5' py='6' boxShadow='lg'>
                    <CalculatorScreen calculatorInputs={calculatorInputs} width='500px' height='200px' />
                </Box>
                {showMap()}
            </Flex>
            {showResultCalendar()}
            {showExportCalendar()}
        </Flex>
    )
}