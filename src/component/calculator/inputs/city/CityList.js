import {CityCard} from "./CityCard";
import {Box} from "@chakra-ui/react";
import {ScrollingBox} from "../../../utils/ScrollingBox";
import {EmptySearchBox} from "../../../utils/EmptySearchBox";
import {ProgressSearchBox} from "../../../utils/ProgressSearchBox";

export const CityList = (props) => {
    if(props.isLoading) return <ProgressSearchBox/>
    if(props.isEmpty) return <EmptySearchBox/>

    const cities = props.cities.map( (city) => {
        return (
            <CityCard
                key={city.wikiDataId}
                city={city}
                setSelectedCity={props.setSelectedCity}
                setStepFinished={props.setStepFinished}/>
        )
    })
    return (
        <Box w='100%' h='420px' mb={1} p={2}>
            <ScrollingBox>
                {cities}
            </ScrollingBox>
        </Box>
    )
}