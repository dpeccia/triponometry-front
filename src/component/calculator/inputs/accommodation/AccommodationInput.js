import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {AccommodationSearchBar} from "./AccommodationSearchBar";
import {AccommodationList} from "./AccommodationList";
import {NextButton} from "../../../utils/NextButton";
import {useAccommodations} from "./useAccommodations";
import {useToast} from "../../../utils/useToast";
import {isEqual} from "lodash";

export const AccommodationInput = (props) => {
    const [showSuccessToast, _] = useToast()
    const [selectedAccommodation, setSelectedAccommodation] = useState(props.calculatorInputs.accommodation);
    const [stepFinished, setStepFinished] = useState(false);
    const [accommodations, searchAccommodations] = useAccommodations('', props.calculatorInputs.city);

    useEffect(() => {
        props.setCalculatorInputs(prevState => ({...prevState, accommodation: selectedAccommodation}))
    }, [selectedAccommodation]);

    const onClick = () => {
        props.nextStep('ACTIVITIES')
    }

    const accommodationWasAlreadySelected = (accommodationName) => {
        return isEqual(selectedAccommodation.name, accommodationName)
    }
    const addAccommodation = (accommodation) => {
        setSelectedAccommodation(accommodation)
        setStepFinished(true)
        showSuccessToast('Alojamiento seleccionado!', `Elegiste ${accommodation.name}`)
    }

    return(
        <Flex direction="column" alignContent="space-around" w='750px' mt='3vh'>
            <Heading textAlign='center' marginBottom={3}>
                Alojamiento
            </Heading>
            <AccommodationSearchBar searchAccommodations={searchAccommodations}/>
            <AccommodationList
                accommodations={accommodations}
                addAccommodation={addAccommodation}
                accommodationWasAlreadySelected={accommodationWasAlreadySelected}/>
            <NextButton
                stepFinished={stepFinished}
                onClick={onClick}
                description='Continua con Actividades'/>
        </Flex>
    )
}