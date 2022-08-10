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
import {ActivitiesInputs} from "./ActivitiesInput";
import opentripmapradius from "../../../api/opentripmapradius";


const SearchBar = (props) => {
    return (
        <>
            <Formik
                initialValues={{
                    accommodation: "",
                }}
                onSubmit={ async (values) => {
                    const response = await opentripmapradius.get(
                        '',
                        {
                            params: {
                                lat: props.cityLat,
                                lon: props.cityLon,
                                radius:'1000',
                                kinds: 'accomodations',
                                limit: '10',
                                rate: '2',
                                apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f'
                            },
                        });
                    props.setAccommodationsResponse(response.data.features);
                }}
            >
                {({ handleSubmit,  errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.accommodation && touched.accommodation}>
                            <FormLabel>Alojamiento</FormLabel>
                            <HStack>
                                <Field
                                    as={Input}
                                    id="accommodation"
                                    name="accommodation"
                                    variant="filled"
                                    placeholder='A donde quieres alojarte?'
                                    validate={(value) => {
                                        let error;
                                        if (value.length < 1 ) {
                                            error = "Debes ingresar un alojamiento valida";
                                        }
                                        return error;
                                    }}
                                />
                                <IconButton type="submit" icon={<SearchIcon />}/>
                            </HStack>
                            <FormErrorMessage>{errors.accommodation}</FormErrorMessage>
                        </FormControl>
                    </form>
                )}
            </Formik>
        </>
    )
}

const AccommodationList = (props) => {
    const accommodations = props.accommodations.map( (accommodation) => {
        return (
            <AccommodationCard
                accommodation={accommodation} mt={2}
                setSelectedAccommodation={props.setSelectedAccommodation}
                setStepFinished={props.setStepFinished}/>
        )
    })
    return (
        <VStack spacing={1} mt={1} mb={1} align='stretch'>
            {accommodations}
        </VStack>
    )
}

const AccommodationCard = (props) => {
    const toast = useToast()
    const onClick =  () => {
        props.setSelectedAccommodation(props.accommodation)
        props.setStepFinished(true)
        toast({
            title: 'Alojamiento seleccionado!',
            description: `Elegiste ${props.accommodation.name}`,
            status: 'success',
            duration: 1800,
        })
    }
    return (
        <Button variant='outline' onClick={onClick}>
            {`${props.accommodation.name}`}
        </Button>
    )
}

export const AccommodationInput = (props) => {
    const [selectedAccommodation, setSelectedAccommodation] = useState();
    const [stepFinished, setStepFinished] = useState(false);
    const [accommodationsResponse, setAccommodationsResponse] = useState([]);

    const accommodations = accommodationsResponse.map((accommodations) => {
        return {
            name: accommodations.properties.name,
            latitude: accommodations.geometry.coordinates[1],
            longitude: accommodations.geometry.coordinates[0],
            rate: accommodations.properties.rate,
        }
    })

    return(
        <Flex direction="column" alignContent="space-around" mt='2vh'>
            <SearchBar
                setAccommodationsResponse={setAccommodationsResponse}
                cityLat={props.selectedCity.latitude}
                cityLon={props.selectedCity.longitude}/>
            <AccommodationList
                accommodations={accommodations}
                setSelectedAccommodation={setSelectedAccommodation}
                setStepFinished={setStepFinished}/>
            <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme='pink'
                variant='outline'
                isDisabled={!stepFinished}
                onClick={() => {
                    props.setCalculatorInputs(prevState => ({...prevState, accommodation: selectedAccommodation}))
                    props.nextStep(
                        <ActivitiesInputs
                            selectedAccommodation={selectedAccommodation}
                            nextStep={props.nextStep}
                            setCalculatorInputs={props.setCalculatorInputs}
                        />
                    )
                }}
            >
                Continua con Actividades
            </Button>
        </Flex>
    )
}