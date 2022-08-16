import { Box, Flex, VStack, HStack, Spacer } from "@chakra-ui/react";
import { ResultMap } from "../map/ResultMap";
import { InfoCalculation } from "../infoCalculation/InfoCalculation";
import { MyBigCalendar } from "../calendar/BigCalendar";
import { TripInfo } from "../resultPage/TripInfo";
import { LoadScript} from "@react-google-maps/api";

export const ResultPage = () => {

    return (

        <Flex flexDirection="column" width="100%">

            <TripInfo></TripInfo>

            <Flex>

                <Flex flexDirection="column" width="65%">

                    <InfoCalculation></InfoCalculation>

                    {window.google === undefined ?  
                    <LoadScript googleMapsApiKey="AIzaSyAIQZSE4hWZYz9YcyNuTCSjjs6j3jObME0"> <ResultMap></ResultMap></LoadScript>
                    : <ResultMap />}
                    
                </Flex>

                <MyBigCalendar></MyBigCalendar>

            </Flex>

        </Flex>

    )

}


