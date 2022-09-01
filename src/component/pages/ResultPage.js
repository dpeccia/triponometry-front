import { Flex } from "@chakra-ui/react";
import { TripInfo } from "../calculator/output/TripInfo";
import { SaveModal } from "./SaveModal";
import {TripResult} from "../calculation/TripResult";

export const ResultPage = ({ calculatorInputs, calculatorOutputs }) => {

    return (
        <Flex flexDirection="column" width="100%">
            <TripInfo calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <TripResult calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <SaveModal calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
        </Flex>
    );
}


