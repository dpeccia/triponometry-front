import {Flex, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { ActivitiesSearchBar } from "./ActivitiesSearchBar";
import { ActivitiesList } from "./ActivitiesList";
import { useActivities } from "./useActivities";
import {NextButton} from "../../../utils/NextButton";
import { useToast } from "../../../utils/useToast";
import { filter, includes, lowerCase, size } from "lodash";

export const ActivitiesInputs = (props) => {
    const [showSuccessToast, showErrorToast] = useToast()
    const [selectedActivities, setSelectedActivities] = useState(props.calculatorInputs.activities);
    const [stepFinished, setStepFinished] = useState(false);
    const [activities, searchActivities] = useActivities('', props.calculatorInputs.accommodation);

    useEffect(() => {
        props.setCalculatorInputs(prevState => ({...prevState, activities: selectedActivities}))
    }, [selectedActivities]);

    const onClick = () => {
        props.nextStep('TIME')
    }

    const activityWasAlreadySelected = (activityFromList) => {
        const activityName = lowerCase(activityFromList.name)
        const selectedActivitiesNames = selectedActivities.map((activity) => lowerCase(activity.name))
        return includes(selectedActivitiesNames, activityName)
    }

    const removeActivity = (activity) => {
        if(size(selectedActivities) <= 1) {
            setStepFinished(false)
        }
        setSelectedActivities(filter(selectedActivities, (selectedActivity) => lowerCase(selectedActivity.name) !== lowerCase(activity.name)))
        showSuccessToast('Actividad eliminada!', `Eliminaste ${activity.name}`)
    }
    
    const addActivity = (activity) => {
        if(size(selectedActivities) < 9)
        {
            setSelectedActivities([...selectedActivities, activity])
            setStepFinished(true)
            showSuccessToast('Actividad seleccionada!', `Elegiste ${activity.name}`)
        } else {
            showErrorToast('Estas en el límite!', `Si querés realizar esta actividad es necesario eliminar otra`)
        }
    }

    return (
        <Flex direction="column" alignContent="space-around" w='550px' mt='3vh'>
            <Heading textAlign='center' marginBottom={3}>
                Actividades
            </Heading>
            <ActivitiesSearchBar searchActivities={searchActivities}/>
            <ActivitiesList
                city={props.calculatorInputs.city}
                activities={activities}
                addActivity={addActivity}
                removeActivity={removeActivity}
                activityWasAlreadySelected={activityWasAlreadySelected}
                disableAdd={size(selectedActivities) == 9}
                />
            <NextButton
                stepFinished={stepFinished}
                onClick={onClick}
                description='Continua con Horarios'/>
        </Flex>
    )
}