import { Flex } from "@chakra-ui/react";
import { NewCalculationResultInfo } from "./NewCalculationResultInfo";
import { SaveCalculationModal } from "../../utils/modals/SaveCalculationModal";
import {ResultTrip} from "../../result/ResultTrip";
import { IconButton } from "@chakra-ui/button";
import { MdArrowBackIosNew } from "react-icons/md";

export const NewCalculationResult = ({ setShowResults, calculatorInputs, calculatorOutputs }) => {
    return (
        <Flex flexDirection="column" width="100%">
            <Flex width="100%">
                <IconButton variant='ghost' as={MdArrowBackIosNew} size='lg' mt={5} ml={5} p={1} onClick={() => setShowResults(false)}/>
                <NewCalculationResultInfo calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            </Flex>
            <ResultTrip calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <SaveCalculationModal calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
        </Flex>
    );
}