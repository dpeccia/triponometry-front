import { NewCalculationPage } from "./NewCalculationPage"
import { useState, useEffect } from "react"
import { NotFound } from "./NotFoundPage"
import { getMyTrip } from "../../BackendService"
import { useParams } from "react-router"
import { SpinnerSearchBox } from "../utils/SpinnerSearchBox"

export const PlantillaCalculationPage = () => {
    const params = useParams()
    const idCalculation = params.id

    const [isValid, setIsValid] = useState(true)
    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchCalculation = async () => {
        return await getMyTrip(idCalculation)
    }

    const onFinish = (response) => {
        if (response?.status !== "Error") {
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
        isValid ? (isLoading ? <SpinnerSearchBox/> : <NewCalculationPage beginInput='ACCOMMODATION' inputs={calculation.calculatorInputs} original={{name: calculation.name, link: window.location.origin + `/explorar/${idCalculation}`}}/>) : <NotFound/>
    )
}