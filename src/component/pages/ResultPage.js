import {Box, Flex} from "@chakra-ui/react";
import { ResultMap } from "../map/ResultMap";

export const ResultPage = () => {

    return(
    <Flex flexDirection='row'>
        <Box>
            InfoCalculation
        </Box>
        
        <Flex marginLeft={3} alignItems="flex-start">
            <ResultMap></ResultMap>
        </Flex>

        <Flex marginLeft={3} alignItems="flex-start">
            Calendar
        </Flex>
    </Flex>
    )

}


    