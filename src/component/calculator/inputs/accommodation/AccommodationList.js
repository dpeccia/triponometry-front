import {Box} from "@chakra-ui/react";
import {AccommodationCard} from "./AccommodationCard";
import {ScrollingBox} from "../../../utils/ScrollingBox";
import {ProgressSearchBox} from "../../../utils/ProgressSearchBox";
import {EmptySearchBox} from "../../../utils/EmptySearchBox";

export const AccommodationList = (props) => {
    if(props.isLoading) return <ProgressSearchBox/>
    if(props.isEmpty) return <EmptySearchBox/>
    
    const accommodations = props.accommodations.map( (accommodation) => {
        return (
            <AccommodationCard
                accommodation={accommodation}
                setSelectedAccommodation={props.setSelectedAccommodation}
                setStepFinished={props.setStepFinished}/>
        )
    })
    return (
        <Box w='100%' h='420px' mb={1} p={2}>
            <ScrollingBox>
                {accommodations}
            </ScrollingBox>
        </Box>
    )
}