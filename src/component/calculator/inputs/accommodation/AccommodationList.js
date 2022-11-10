import {AccommodationCard} from "./AccommodationCard";
import {ProgressSearchBox} from "../../../utils/ProgressSearchBox";
import {EmptySearchBox} from "../../../utils/EmptySearchBox";
import {isEmpty, isNull} from "lodash";
import {Accordion} from "@chakra-ui/accordion";
import {Box} from "@chakra-ui/react";
import {ScrollingBox} from "../../../utils/ScrollingBox";

export const AccommodationList = (props) => {
    if(isNull(props.accommodations)) return <ProgressSearchBox/>
    if(isEmpty(props.accommodations)) return <EmptySearchBox/>

    const accommodations = props.accommodations.map((accommodation) => {
        return (
            <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
                addAccommodation={props.addAccommodation}
                accommodationWasAlreadySelected={props.accommodationWasAlreadySelected}/>
        )
    })
    return (
        <Box w='100%' h='500px' mx={1} p={2}>
            <ScrollingBox>
                <Accordion allowToggle spacing={1} align='stretch'>
                    {accommodations}
                </Accordion>
            </ScrollingBox>
        </Box>

    )
}