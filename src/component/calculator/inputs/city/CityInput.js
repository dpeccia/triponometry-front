import {Flex, Heading} from "@chakra-ui/react";
import {useState} from "react";
import {AccommodationInput} from "../accommodation/AccommodationInput";
import {uniqWith} from "lodash";
import {CitySearchBar} from "./CitySearchBar";
import {CityList} from "./CityList";
import {NextButton} from "../../../utils/NextButton";

export const CityInput = (props) =>{
    const [selectedCity, setSelectedCity] = useState();
    const [stepFinished, setStepFinished] = useState(false);
    const [citiesResponse, setCitiesResponse] = useState([]);

    const equalCities = (city,othCity) => {
        return city.city === othCity.city && city.country === othCity.country
    }

    const cities = uniqWith(citiesResponse, equalCities).map((city) => {
        return {
            imageUrl: null,
            wikiDataId: city.wikiDataId,
            name: city.name,
            region: city.region,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude
        }
    })

    const onClick = () => {
        props.setCalculatorInputs(prevState => ({...prevState, city: selectedCity}))
        props.nextStep(
            <AccommodationInput
                selectedCity={selectedCity}
                nextStep={props.nextStep}
                setCalculatorInputs={props.setCalculatorInputs}
            />
        )
    }

    return(
        <Flex direction="column" alignContent="space-around" mt='3vh'>
            <Heading textAlign='center' marginBottom={3}>
                Ciudad
            </Heading>
            <CitySearchBar setCities={setCitiesResponse} />
            <CityList
                cities={cities}
                setSelectedCity={setSelectedCity}
                setStepFinished={setStepFinished}/>
            <NextButton
                stepFinished={stepFinished}
                onClick={onClick}
                description='Continua con Alojamiento'/>
        </Flex>
    )
}
