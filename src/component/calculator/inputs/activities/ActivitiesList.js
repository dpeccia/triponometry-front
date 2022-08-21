import { ActivitiesCard } from "./ActivitiesCard";
import { Accordion } from "@chakra-ui/accordion";
import { isEmpty, isNull } from "lodash";
import {EmptySearchBox} from "../../../utils/EmptySearchBox";
import {ProgressSearchBox} from "../../../utils/ProgressSearchBox";

export const ActivitiesList = (props) => {
    if(isNull(props.activities)) return <ProgressSearchBox/>
    if(isEmpty(props.activities)) return <EmptySearchBox/>

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