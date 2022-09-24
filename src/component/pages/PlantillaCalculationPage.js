import { NewCalculationPage } from "./NewCalculationPage"
import { useState, useEffect } from "react"
import { NotFound } from "./NotFoundPage"
import { getATrip } from "../../BackendService"
import { useParams } from "react-router"
import { SpinnerSearchBox } from "../utils/SpinnerSearchBox"

export const PlantillaCalculationPage = () => {
    const params = useParams()
    const idCalculation = params.id

    const [isValid, setIsValid] = useState(true)
    const [calculation, setCalculation] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const fetchCalculation = async () => {
        return await getATrip(idCalculation)
    }

    const onFinish = (response) => {
        if(response){
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
        isValid ? (isLoading ? <SpinnerSearchBox/> : <NewCalculationPage beginInput='ACCOMMODATION' inputs={calculation.calculatorInputs} original={{name: calculation.name, link: `http://localhost:3000/explorar/${idCalculation}`}}/>) : <NotFound/>
    )
}