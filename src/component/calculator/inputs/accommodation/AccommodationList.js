import {Box} from "@chakra-ui/react";
import {AccommodationCard} from "../accommodation/AccommodationCard";
import {ScrollingBox} from "../../../utils/ScrollingBox";

export const AccommodationList = (props) => {
    const accommodations = props.accommodations.map( (accommodation) => {
        return (
            <AccommodationCard
                accommodation={accommodation}
                setSelectedAccommodation={props.setSelectedAccommodation}
                setStepFinished={props.setStepFinished}/>
        )
    })
    return (
        <Box w='400px' h='420px' marginBottom={1} p={2}>
            <ScrollingBox>
                {accommodations}
            </ScrollingBox>
        </Box>
    )
}