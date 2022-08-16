import {CityCard} from "./CityCard";
import {Box} from "@chakra-ui/react";
import {ScrollingBox} from "../../../utils/ScrollingBox";

export const CityList = (props) => {
    const cities = props.cities.map( (city) => {
        return (
            <CityCard
                city={city}
                setSelectedCity={props.setSelectedCity}
                setStepFinished={props.setStepFinished}/>
        )
    })
    return (
        <Box w='400px' h='420px' marginBottom={1} p={2}>
            <ScrollingBox>
                {cities}
            </ScrollingBox>
        </Box>
    )
}