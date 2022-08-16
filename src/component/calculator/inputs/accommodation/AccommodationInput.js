import {Flex, Heading} from "@chakra-ui/react";
import {useState} from "react";
import {ActivitiesInputs} from "../activities/ActivitiesInput";
import {AccommodationSearchBar} from "../accommodation/AccommodationSearchBar";
import {AccommodationList} from "../accommodation/AccommodationList";
import {NextButton} from "../../../utils/NextButton";

export const AccommodationInput = (props) => {
    const [selectedAccommodation, setSelectedAccommodation] = useState();
    const [stepFinished, setStepFinished] = useState(false);
    const [accommodationsResponse, setAccommodationsResponse] = useState([]);

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
        <Flex direction="column" alignContent="space-around" mt='3vh'>
            <Heading textAlign='center' marginBottom={3}>
                Alojamiento
            </Heading>
            <AccommodationSearchBar
                setAccommodationsResponse={setAccommodationsResponse}
                cityLat={props.selectedCity.latitude}
                cityLon={props.selectedCity.longitude}/>
            <AccommodationList
                accommodations={accommodations}
                setSelectedAccommodation={setSelectedAccommodation}
                setStepFinished={setStepFinished}/>
            <NextButton
                stepFinished={stepFinished}
                onClick={onClick}
                description='Continua con Actividades'/>
        </Flex>
    )
}