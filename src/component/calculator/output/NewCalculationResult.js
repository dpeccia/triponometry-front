import { Flex } from "@chakra-ui/react";
import { NewCalculationResultInfo } from "./NewCalculationResultInfo";
import { SaveModal } from "../../pages/SaveModal";
import {ResultTrip} from "../../result/ResultTrip";

export const NewCalculationResult = ({ calculatorInputs, calculatorOutputs }) => {

    return (
        <Flex flexDirection="column" width="100%">
            <NewCalculationResultInfo calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <ResultTrip calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <SaveModal calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
        </Flex>
    );
}


