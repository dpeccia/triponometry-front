import {Flex, Heading} from "@chakra-ui/react";
import {useState} from "react";
import {AccommodationSearchBar} from "./AccommodationSearchBar";
import {AccommodationList} from "./AccommodationList";
import {NextButton} from "../../../utils/NextButton";

export const AccommodationInput = (props) => {
    const [selectedAccommodation, setSelectedAccommodation] = useState();
    const [stepFinished, setStepFinished] = useState(false);
    const [accommodationsResponse, setAccommodationsResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const accommodations = accommodationsResponse.map((accommodation) => {
        return {
            id: accommodation.xid,
            name: accommodation.name,
            latitude: accommodation.point.lat,
            longitude: accommodation.point.lon,
            rate: accommodation.rate,
        }
    })

    const onClick = () => {
        props.setCalculatorInputs(prevState => ({...prevState, accommodation: selectedAccommodation}))
        props.nextStep('ACTIVITIES')
    }

    return(
        <Flex direction="column" alignContent="space-around" w='550px' mt='3vh'>
            <Heading textAlign='center' marginBottom={3}>
                Alojamiento
            </Heading>
            <AccommodationSearchBar
                setAccommodationsResponse={setAccommodationsResponse}
                setIsLoading={setIsLoading}
                setIsEmpty={setIsEmpty}
                cityLat={props.calculatorInputs.city.latitude}
                cityLon={props.calculatorInputs.city.longitude}/>
            <AccommodationList
                accommodations={accommodations}
                setSelectedAccommodation={setSelectedAccommodation}
                setStepFinished={setStepFinished}
                isLoading={isLoading}
                isEmpty={isEmpty}/>
            <NextButton
                stepFinished={stepFinished}
                onClick={onClick}
                description='Continua con Actividades'/>
        </Flex>
    )
}