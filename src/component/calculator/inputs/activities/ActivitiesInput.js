import {Button,Flex, Heading} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {HorariosInput} from "../horarios/HorariosInput";
import _ from "lodash";
import { ActivitiesSearchBar } from "./ActivitiesSearchBar";
import { ActivitiesList } from "./ActivitiesList";
import { useActivities } from "./useActivities";

export const ActivitiesInputs = (props) => {
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [stepFinished, setStepFinished] = useState(false);
    const [activities, searchActivities] = useActivities('', props.selectedAccommodation);

    return (
        <Flex direction="column" alignContent="space-around" mt='2vh' w='550px'>
            <Heading textAlign='center' marginBottom={6}>
                Actividades
            </Heading>
            <ActivitiesSearchBar searchActivities={searchActivities}/>
            <ActivitiesList
                activities={activities}
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
                setStepFinished={setStepFinished}/>
            <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme='pink'
                variant='outline'
                isDisabled={!stepFinished}
                onClick={() => {
                    props.setCalculatorInputs(prevState => ({...prevState, activities: selectedActivities}))
                    props.nextStep(
                        <HorariosInput nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>
                    )
                }}>
                Continua con Horarios
            </Button>
        </Flex>
    )
}