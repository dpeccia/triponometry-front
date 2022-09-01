import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getMyTrip} from "../../BackendService";
import {SpinnerSearchBox} from "../utils/SpinnerSearchBox";
import {TripResult} from "../calculation/TripResult";
import {Flex} from "@chakra-ui/react";
import {TripInfo} from "../calculator/output/TripInfo";
import {FaEdit} from "react-icons/fa";
import {EditCalculationModal} from "../my-calculations/modals/EditCalculationModal";

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
                        <Flex alignItems='center'>
                            <TripInfo calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                            <EditCalculationModal icon={FaEdit} calculationName={calculation.name}/>
                        </Flex>
                        <TripResult calculatorInputs={calculation.calculatorInputs}
                                    calculatorOutputs={calculation.calculatorOutputs}/>

                    </>
            }

        </Flex>

    )
}