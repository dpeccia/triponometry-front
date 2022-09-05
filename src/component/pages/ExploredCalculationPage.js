import {SpinnerSearchBox} from "../utils/SpinnerSearchBox";
import {Button, Flex} from "@chakra-ui/react";
import {MyCalculationInfo} from "../my-calculations/MyCalculationInfo";
import {ResultTrip} from "../result/ResultTrip";
import {useParams} from "react-router";
import {getATrip} from "../../BackendService";
import {useEffect, useState} from "react";

export const ExploredCalculationPage = () => {
    const params = useParams();
    const idCalculation = params.id;

    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchCalculation = async () => {
        return await getATrip(idCalculation)
    }

    const onFinish = (response) => {
        if(response){
            setCalculation(response)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCalculation().then(onFinish);
    }, []);

    return (
        <Flex flexDirection="column" width="100%">
            {
                isLoading ? <SpinnerSearchBox/> :
                    <>
                        <Flex alignItems='center' justifyContent='space-between'>
                            <MyCalculationInfo calculatorName={calculation.name} calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                            <Flex mt={2} justifyContent='flex-end'>
                                <Button> Usar como plantilla </Button>
                            </Flex>
                        </Flex>
                        <ResultTrip calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                    </>
            }
        </Flex>
    )
}