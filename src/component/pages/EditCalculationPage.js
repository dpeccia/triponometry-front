import { NewCalculationPage } from "./NewCalculationPage"
import { useState, useEffect } from "react"
import { NotFound } from "./NotFoundPage"
import { getMyTrip } from "../../BackendService"
import { useParams } from "react-router"
import { SpinnerSearchBox } from "../utils/SpinnerSearchBox"
import { isEmpty } from "lodash"
import { useToast } from "../utils/useToast"
import { checkErrorTokenExpired } from "../../BackendService"

export const EditCalculationPage = ({logout}) => {
    const params = useParams()
    const idCalculation = params.id

    const [isValid, setIsValid] = useState(true)
    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [_, showErrorToast] = useToast()

    const fetchCalculation = async () => {
        return await getMyTrip(idCalculation)
    }

    const onFinish = (response) => {
        if (response?.status !== "Error") {
            setCalculation(response)
            setIsLoading(false)
        } else {
            setIsValid(false)
            showErrorToast(response.msg, logout)
        }
    }

    const getFirstMissing = () => {
        if (isEmpty(calculation.calculatorInputs.accommodation.name)){
            return 'ACCOMMODATION'
        }
        if (isEmpty(calculation.calculatorInputs.activities)){
            return 'ACTIVITIES'
        }
        if (isEmpty(calculation.calculatorInputs.horarios.despertarse || calculation.calculatorInputs.horarios.dormirse)){
            return 'TIME'
        }
        if (isEmpty(calculation.calculatorInputs.mobility)){
            return 'MOBILITY'
        }
        return 'ACCOMMODATION'
    }

    useEffect(() => {
        fetchCalculation().then(onFinish);
    }, []);

    return (
        isValid ? (isLoading ? <SpinnerSearchBox/> : <NewCalculationPage tripId={idCalculation} edit={calculation.status !== 'DRAFT'} beginInput={getFirstMissing()} inputs={calculation.calculatorInputs} name={calculation.name} status={calculation.status} userInfo={calculation.user} loggedIn={true} logout={logout}/>) : <NotFound/>
    )
}