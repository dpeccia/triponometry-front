import {Flex, Heading} from "@chakra-ui/react";
import {useState} from "react";
import {ActivitiesInputs} from "../activities/ActivitiesInput";
import {AccommodationSearchBar} from "./AccommodationSearchBar";
import {AccommodationList} from "./AccommodationList";
import {NextButton} from "../../../utils/NextButton";

export const AccommodationInput = (props) => {
    const [selectedAccommodation, setSelectedAccommodation] = useState();
    const [stepFinished, setStepFinished] = useState(false);
    const [accommodationsResponse, setAccommodationsResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const accommodations = accommodationsResponse.map((accommodations) => {
        return {
            name: accommodations.name,
            latitude: accommodations.point.lat,
            longitude: accommodations.point.lon,
            rate: accommodations.rate,
        }
    })

    const onClick = () => {
        props.setCalculatorInputs(prevState => ({...prevState, accommodation: selectedAccommodation}))
        props.nextStep(
            <ActivitiesInputs
                selectedAccommodation={selectedAccommodation}
                nextStep={props.nextStep}
                setCalculatorInputs={props.setCalculatorInputs}
            />
        )
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
                cityLat={props.selectedCity.latitude}
                cityLon={props.selectedCity.longitude}/>
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