import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { ResultMap } from "../map/ResultMap";
import { InfoCalculation } from "../infoCalculation/InfoCalculation";
import {ICalendar} from "../calendar/Icalendar";
import {MyBigCalendar} from "../calendar/BigCalendar";

export const ResultPage = () => {

    return (
        <VStack>

            {/*TODO: ver de mover los css de aca y crear un componente para todo que es titulo/icono/pdf export*/}
            <Flex flexDirection='row'
                position="relative"
                left="0%"
                width="100%"
                padding="15px 15px"
                justifyContent="space-between"
            >
                <IconButton></IconButton>
                <VStack marginLeft={3} >
                    <h1>Paseo Historico</h1>
                    <h3>Roma en 3 dias</h3>
                </VStack>
                <img src="https://cdn-icons-png.flaticon.com/512/80/80942.png" width="50" height="auto"></img>

            </Flex>

            <Flex flexDirection='row'>

                <VStack>
                    <Box>
                        <InfoCalculation />
                    </Box>

                    <Box>
                        <ResultMap />
                    </Box>

                </VStack>

                <Flex marginLeft={3} alignItems="flex-start">
                    <ICalendar></ICalendar>
                    <MyBigCalendar></MyBigCalendar>
                </Flex>

            </Flex>
        </VStack>

    )

}


