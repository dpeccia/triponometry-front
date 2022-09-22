import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMyTrip } from "../../BackendService";
import { SpinnerSearchBox } from "../utils/SpinnerSearchBox";
import { ResultTrip } from "../result/ResultTrip";
import { Flex, Box } from "@chakra-ui/react";
import { EditCalculationModal } from "../utils/modals/EditCalculationModal";
import { MyCalculationInfo } from "../my-calculations/MyCalculationInfo";
import { NotFound } from "./NotFoundPage";
import { UnarchiveCalculationModal } from "../utils/modals/UnarchiveCalculationModal";
import { PdfButtonExport1 } from "../calculator/output/ExportPdf";

export const MyCalculationPage = () => {
    const params = useParams();
    const idCalculation = params.id;

    const [isValid, setIsValid] = useState(true)
    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const isDraft = () => {
        return calculation.status === 'DRAFT'
    }

    const getCustomeButton = (calculation) => {
        if (calculation.status === 'ACTIVE' || calculation.status === 'DRAFT')
            return <EditCalculationModal calculationId={calculation.id} calculationName={calculation.name} hasText={true} />
        else
            return <UnarchiveCalculationModal calculationId={calculation.id} calculationName={calculation.name} />
    }

    const fetchCalculation = async () => {
        return await getMyTrip(idCalculation)
    }

    const onFinish = (response) => {
        if (response) {
            setCalculation(response)
            setIsLoading(false)
        } else {
            setIsValid(false)
        }
    }

    useEffect(() => {
        fetchCalculation().then(onFinish);
    }, []);

    return (
        <Flex flexDirection="column" width="100%">
            {
                isValid ? (
                    isLoading ? <SpinnerSearchBox/> :
                        <>
                            <Flex alignItems='center' justifyContent='space-between'>
                            <MyCalculationInfo calculatorName={calculation.name} calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs} isDraft={isDraft()}/>
                                <Flex mt={2} justifyContent='flex-end'>
                                    {getCustomeButton(calculation)}
                                </Flex>
                                <Box boxSize='90px' marginLeft={1000}>
                                    <PdfButtonExport1 calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}></PdfButtonExport1>
                                </Box>
                            </Flex>
                            <ResultTrip calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs} isDraft={isDraft()}/>
                        </>
                ) : <NotFound />
            }

        </Flex>

    )
}