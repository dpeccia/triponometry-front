import { Flex, Box } from "@chakra-ui/react";
import { SaveEditionModal } from "../../utils/modals/SaveEditionModal";
import {ResultTrip} from "../../result/ResultTrip";
import { MyCalculationInfo } from "../../my-calculations/MyCalculationInfo";
import { EditBadge } from "../../utils/EditBadge";
import { MdArrowBackIosNew } from "react-icons/md";
import { IconButton } from "@chakra-ui/button";
import { PdfButtonExport1 } from "./ExportPdf";

export const EditCalculationResult = ({ setShowResults, id, name, calculatorInputs, calculatorOutputs, status, userInfo }) => {


    return (
        <Flex flexDirection="column" width="100%">
            <Flex width="100%">
                <IconButton variant='ghost' as={MdArrowBackIosNew} size='lg' mt={5} ml={5} p={1} onClick={() => setShowResults(false)}/>
                <Flex alignItems='center' width="100%" justifyContent='space-between'>
                    <MyCalculationInfo ml='25' calculatorName={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} userInfo={userInfo}/>
                    <EditBadge justify='end' align='center' />
                </Flex>
                <Box boxSize='90px' marginLeft={1000}>
                    <PdfButtonExport1 calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
                </Box>
            </Flex>
            <ResultTrip calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs}/>
            <SaveEditionModal tripId={id} calculatorName={name} calculatorInputs={calculatorInputs} calculatorOutputs={calculatorOutputs} status={status}/>
        </Flex>
    );
}