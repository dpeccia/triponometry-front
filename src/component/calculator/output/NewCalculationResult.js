import { Flex } from "@chakra-ui/react";
import { NewCalculationResultInfo } from "./NewCalculationResultInfo";
import { SaveCalculationModal } from "../../utils/modals/SaveCalculationModal";
import {ResultTrip} from "../../result/ResultTrip";

export const NewCalculationResult = ({ calculatorInputs, calculatorOutputs }) => {

    return (
        <Flex flexDirection="column" width="100%">
            <NewCalculationResultInfo calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <ResultTrip calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <SaveCalculationModal calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
        </Flex>
    );
}


