import { Box, Flex, VStack, HStack, Spacer } from "@chakra-ui/react";
import { ResultMap } from "../map/ResultMap";
import { InfoCalculation } from "../infoCalculation/InfoCalculation";
import { MyBigCalendar } from "../calendar/BigCalendar";
import { TripInfo } from "../resultPage/TripInfo";

export const ResultPage = () => {

    return (

        <Flex flexDirection="column" width="100%">

            <TripInfo></TripInfo>

            <Flex>

                <Flex flexDirection="column" width="65%">

                    <InfoCalculation></InfoCalculation>
                    <ResultMap></ResultMap>

                </Flex>

                <MyBigCalendar></MyBigCalendar>

            </Flex>

        </Flex>

    )

}


