import { ActivitiesCard } from "./ActivitiesCard";
import { Accordion } from "@chakra-ui/accordion";
import { isEmpty, isNull } from "lodash";
import { Spinner } from "@chakra-ui/spinner";
import { Flex } from "@chakra-ui/layout";

export const ActivitiesList = (props) => {
    if(isNull(props.activities)) {
        return (
            <Flex minHeight='420px' justify='center' align='center'>
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='red.300' size='xl'/>
            </Flex>
        );
    }
    if(isEmpty(props.activities)) {
        return (
            <Flex minHeight='420px' justify='center' align='center'>
                <h2>No se encontraron actividades, intente con otro filtro</h2>
            </Flex>
        );
    }

    const activities = props.activities.map( (activity) => {
        return (
            <ActivitiesCard
                activity={activity} mt={2}
                selectedActivities={props.selectedActivities}
                setSelectedActivities={props.setSelectedActivities}
                setStepFinished={props.setStepFinished}/>
        )
    })

    return (
        <Accordion allowToggle spacing={1} mt={5} mb={5} align='stretch'>
            {activities}
        </Accordion>
    )
}