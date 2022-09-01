import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getMyTrip} from "../../BackendService";
import {SpinnerSearchBox} from "../utils/SpinnerSearchBox";
import {ResultTrip} from "../result/ResultTrip";
import {Box, Flex} from "@chakra-ui/react";
import {FaEdit} from "react-icons/fa";
import {EditCalculationModal} from "../my-calculations/modals/EditCalculationModal";
import {MyCalculationInfo} from "../my-calculations/MyCalculationInfo";

export const MyCalculationPage = () => {
    const params = useParams();
    const idCalculation = params.id;

    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchCalculation = async () => {
        return await getMyTrip(idCalculation)
    }

    const onFinish = (response) => {
        setCalculation(response)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCalculation().then(onFinish);
    }, []);

    return (
        <Flex flexDirection="column" width="100%">
            { isLoading ? <SpinnerSearchBox/> :
                    <>
                        <Flex alignItems='center' justifyContent='space-between'>
                            <MyCalculationInfo calculatorName={calculation.name} calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                            <Box w='50px'>
                                <EditCalculationModal icon={FaEdit} calculationName={calculation.name}/>
                            </Box>
                        </Flex>
                        <ResultTrip calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                    </>
            }

        </Flex>

    )
}