import {
    Button,
    Flex,
    FormControl, FormErrorMessage,
    FormLabel,
    HStack,
    IconButton,
    Input,
    VStack
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { Formik, Field } from "formik";
import {useState} from "react";
import geodb from "../api/geodb";

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
    console.log(props.cities);
    const cities = props.cities.map( (city) => {
        return <CityCard city={city} mt={2}/>
    })
    return (
        <VStack spacing={1} mt={4} align='stretch'>
            {cities}
        </VStack>)
}

const CityCard = (props) => {
    const onClick =  () => {
        alert(JSON.stringify({"latitude": props.city.latitude, "longitude": props.city.longitude}, null, 2));
    }
    return (
        <Button variant='outline' onClick={onClick}>{`${props.city.city}, ${props.city.country}`}</Button>
    )
}

export const CityInput = () =>{
    const [cities, setCities] = useState([]);

    return(
        <Flex direction="column" alignContent="space-around" mt='2vh'>
            <SearchBar setCities={setCities}/>
            <CityList cities={cities}/>
        </Flex>
    )
}
