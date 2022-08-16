import { Box, Flex } from "@chakra-ui/react";
import { ResultMap } from "../map/ResultMap";
import { MyBigCalendar } from "../calendar/BigCalendar";
import { TripInfo } from "../resultPage/TripInfo";
import { CalculatorScreen } from "../calculator/CalculatorScreen";
import { LoadScript } from "@react-google-maps/api";

export const ResultPage = ({ calculatorInputs, calculatorOutputs }) => {
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

    return (
        <Flex flexDirection="column" width="100%">
            <TripInfo calculatorInputs={calculatorInputs}/>
            <Flex justify='space-around'>
                <Flex flexDirection="column">
                    <Box margin={5} bg='#94A1AA' borderTopRadius='40px' px='5' py='6' boxShadow='lg'>
                        <CalculatorScreen calculatorInputs={calculatorInputs} width='500px' height='200px' />
                    </Box>
                    {showMap()}
                </Flex>
                <MyBigCalendar />
            </Flex>
        </Flex>
    );
}


