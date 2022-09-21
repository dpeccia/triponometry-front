import { ActivitiesCard } from "./ActivitiesCard";
import { Accordion } from "@chakra-ui/accordion";
import { isEmpty, isNull } from "lodash";
import {EmptySearchBox} from "../../../utils/EmptySearchBox";
import {ProgressSearchBox} from "../../../utils/ProgressSearchBox";

export const ActivitiesList = (props) => {
    if(isNull(props.activities)) return <ProgressSearchBox/>
    if(isEmpty(props.activities)) return <EmptySearchBox/>

    const activities = props.activities.map((activity) => {
        return (
            <ActivitiesCard
                key={activity.id}
                city={props.city}
                activity={activity} mt={2}
                addActivity={props.addActivity}
                removeActivity={props.removeActivity}
                activityWasAlreadySelected={props.activityWasAlreadySelected}/>
        )
    })

    return (
        <Accordion allowToggle spacing={1} mt={5} mb={5} align='stretch'>
            {activities}
        </Accordion>
    )
}