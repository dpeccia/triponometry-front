import {SpinnerSearchBox} from "../utils/SpinnerSearchBox";
import {Box, Button, Flex} from "@chakra-ui/react";
import {MyCalculationInfo} from "../my-calculations/MyCalculationInfo";
import {ResultTrip} from "../result/ResultTrip";
import {useNavigate, useParams} from "react-router";
import {getATrip} from "../../BackendService";
import {useEffect, useState} from "react";
import {SaveRatingModal} from "../utils/modals/SaveRatingModal";
import {FaRegLightbulb} from "react-icons/fa";
import {RatingDrawer} from "../explorer/RatingDrawer";

export const ExploredCalculationPage = () => {
    const navigate = useNavigate()
    const params = useParams();
    const idCalculation = params.id;

    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const handlePlantillaClick = () => {
        navigate(`/explorar/${idCalculation}/edicion`)
    }

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
                                <Button rightIcon={<FaRegLightbulb />} onClick={handlePlantillaClick}> Usar como plantilla </Button>
                                <Box>
                                    <SaveRatingModal calculationId={idCalculation} calculatorName={calculation.name} calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                                    <RatingDrawer reviews={calculation.reviews} averageRating={calculation.rating}/>
                                </Box>
                            </Flex>
                        </Flex>
                        <ResultTrip calculatorInputs={calculation.calculatorInputs} calculatorOutputs={calculation.calculatorOutputs}/>
                    </>
            }
        </Flex>
    )
}