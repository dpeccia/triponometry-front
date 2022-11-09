import { NewCalculationPage } from "./NewCalculationPage"
import { useState, useEffect } from "react"
import { NotFound } from "./NotFoundPage"
import { getATrip } from "../../BackendService"
import { useParams } from "react-router"
import { SpinnerSearchBox } from "../utils/SpinnerSearchBox"
import { checkErrorTokenExpired } from "../../BackendService"
import { useToast } from "../utils/useToast"

export const PlantillaCalculationPage = ({logout}) => {
    const params = useParams()
    const idCalculation = params.id

    const [isValid, setIsValid] = useState(true)
    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [_, showErrorToast] = useToast()


    const fetchCalculation = async () => {
        return await getATrip(idCalculation)
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

    useEffect(() => {
        fetchCalculation().then(onFinish);
    }, []);

    return (
        isValid ? (isLoading ? <SpinnerSearchBox/> : <NewCalculationPage beginInput='ACCOMMODATION' inputs={calculation.calculatorInputs} original={{name: calculation.name, link: window.location.origin + `/explorar/${idCalculation}`}} loggedIn={true} logout={logout}/>) : <NotFound/>
    )
}