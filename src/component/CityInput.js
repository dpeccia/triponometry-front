import {
    Button,
    Flex,
    FormControl, FormErrorMessage,
    FormLabel,
    HStack,
    IconButton,
    Input, useToast,
    VStack
} from "@chakra-ui/react";

import {ArrowForwardIcon, SearchIcon} from '@chakra-ui/icons'
import { Formik, Field } from "formik";
import {useState} from "react";
import geodb from "../api/geodb";
import {AccommodationInput} from "./AccommodationInput";

const SearchBar = (props) => {
    return (
        <>
            <Formik
                initialValues={{
                    city: "",
                }}
                onSubmit={ async (values) => {
                    const response = await geodb.get(
                        '',
                        {
                            params: {sort: '-population', namePrefix: values.city, limit: '10', languageCode: 'es'},
                        });
                    props.setCities(response.data.data);
                }}
            >
                {({ handleSubmit,  errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.city && touched.city}>
                            <FormLabel>Ciudad</FormLabel>
                            <HStack>
                                <Field
                                    as={Input}
                                    id="city"
                                    name="city"
                                    variant="filled"
                                    placeholder='A donde quieres ir?'
                                    validate={(value) => {
                                        let error;
                                        if (value.length < 1 ) {
                                            error = "Debes ingresar una ciudad valida";
                                        }
                                        return error;
                                    }}
                                />
                                <IconButton type="submit"  icon={<SearchIcon />} />
                            </HStack>
                            <FormErrorMessage>{errors.city}</FormErrorMessage>
                        </FormControl>
                    </form>
                )}
            </Formik>
        </>
    )
}

const CityList = (props) => {
    const cities = props.cities.map( (city) => {
        return (
            <CityCard
                city={city} mt={2}
                setSelectedCity={props.setSelectedCity}
                setStepFinished={props.setStepFinished}/>
        )
    })
    return (
            <VStack spacing={1} mt={1} mb={1} align='stretch'>
                {cities}
            </VStack>
    )
}

const CityCard = (props) => {
    const toast = useToast()
    const onClick =  () => {
        props.setSelectedCity(props.city)
        props.setStepFinished(true)
        toast({
            title: 'Ciudad seleccionada!',
            description: `Elegiste ${props.city.name}`,
            status: 'success',
            duration: 1800,
        })
    }
    return (
        <Button variant='outline' onClick={onClick}>
            {`${props.city.name}, ${props.city.country}`}
        </Button>
    )
}

export const CityInput = (props) =>{
    const [selectedCity, setSelectedCity] = useState();
    const [stepFinished, setStepFinished] = useState(false);
    const [citiesResponse, setCitiesResponse] = useState([]);

    const cities = citiesResponse.map((city) => {
        return {
            name: city.name,
            region: city.region,
            country: city.country,
            latitude: city.latitude,
            longitude: city.longitude
        }
    })

    return(
        <Flex direction="column" alignContent="space-around" mt='2vh'>
            <SearchBar setCities={setCitiesResponse} />
            <CityList
                cities={cities}
                setSelectedCity={setSelectedCity}
                setStepFinished={setStepFinished}/>
            <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme='pink'
                variant='outline'
                isDisabled={!stepFinished}
                onClick={() => {
                    props.setCalculatorInputs(prevState => ({...prevState, city: selectedCity}))
                    props.nextStep(
                        <AccommodationInput
                            selectedCity={selectedCity}
                            nextStep={props.nextStep}
                            setCalculatorInputs={props.setCalculatorInputs}
                        />
                    )
                }}
            >
                Continua con Alojamiento
            </Button>
        </Flex>
    )
}
