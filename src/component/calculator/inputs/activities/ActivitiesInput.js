import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {HorariosInput} from "../horarios/HorariosInput";
import { ActivitiesSearchBar } from "./ActivitiesSearchBar";
import { ActivitiesList } from "./ActivitiesList";
import { useActivities } from "./useActivities";
import {NextButton} from "../../../utils/NextButton";

export const ActivitiesInputs = (props) => {
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [stepFinished, setStepFinished] = useState(false);
    const [activities, searchActivities] = useActivities('', props.selectedAccommodation);

    useEffect(() => {
        props.setCalculatorInputs(prevState => ({...prevState, activities: selectedActivities}))
    }, [selectedActivities]);

    const onClick = () => {
        props.nextStep(
            <HorariosInput nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>
        )
    }

    return (
        <Flex direction="column" alignContent="space-around" w='550px' mt='3vh'>
            <Heading textAlign='center' marginBottom={3}>
                Actividades
            </Heading>
            <ActivitiesSearchBar searchActivities={searchActivities}/>
            <ActivitiesList
                activities={activities}
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
                setStepFinished={setStepFinished}/>
            <NextButton
                stepFinished={stepFinished}
                onClick={onClick}
                description='Continua con Horarios'/>
        </Flex>
    )
}