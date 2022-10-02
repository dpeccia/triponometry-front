import {Flex, Heading, Alert, AlertTitle, AlertIcon, AlertDescription, Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import { ActivitiesSearchBar } from "./ActivitiesSearchBar";
import { ActivitiesList } from "./ActivitiesList";
import { useActivities } from "./useActivities";
import {NextButton} from "../../../utils/NextButton";
import { useToast } from "@chakra-ui/toast";
import { filter, includes, lowerCase, size } from "lodash";

export const ActivitiesInputs = (props) => {
    const toast = useToast()
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
        toast({
            title: 'Actividad eliminada!',
            description: `Eliminaste ${activity.name}`,
            status: 'success',
            duration: 1800,
        })
    }

    const alert = (count) =>{
        if(count < 10 && count >= 7)
        {
            return(
                <Alert status='warning' mb={2}>
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Llegando al limite de actividades</AlertTitle>
                        <AlertDescription>Te quedan {10 - count} actividades por elegir!</AlertDescription>
                    </Box>
                </Alert>
            )
        }
        if(count == 10)
        {
            return (
                <Alert status='error' mb={2}>
                    <AlertIcon />
                    <Box>
                        <AlertTitle>¡Llegaste al límite de actividades!</AlertTitle>
                        <AlertDescription>Por favor, continua con el siguiente paso</AlertDescription>
                    </Box>
                </Alert>
            )
        }
        return(
            <Alert status='info' mb={2}>
                <AlertIcon />
                <Box>
                    <AlertTitle>Actividades restantes</AlertTitle>
                    <AlertDescription>Te quedan {10 - count} actividades por elegir!</AlertDescription>
                </Box>
            </Alert>
        )
    }
    
    const addActivity = (activity) => {
        if(size(selectedActivities) < 10)
        {
            setSelectedActivities([...selectedActivities, activity])
            setStepFinished(true)
            toast({
                title: 'Actividad seleccionada!',
                description: `Elegiste ${activity.name}`,
                status: 'success',
                duration: 1800,
            })
        } else {
            toast({
                title: 'Estas en el límite!',
                description: `Si querés realizar esta actividad es necesario eliminar otra`,
                status: 'error',
                duration: 1800,
            })
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
                disableAdd={size(selectedActivities) == 10}
                />
            {alert(size(selectedActivities))}
            <NextButton
                stepFinished={stepFinished}
                onClick={onClick}
                description='Continua con Horarios'/>
        </Flex>
    )
}