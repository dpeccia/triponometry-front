import {Field, Formik} from "formik";
import {Flex, FormControl, FormErrorMessage, HStack, IconButton, Input, Text} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {AccommodationsFilterMenu} from "./AccommodationsFilterMenu";
import {useState} from "react";
import {AccommodationsDistanceMenu} from "./AccommodationsDistanceMenu";

export const AccommodationSearchBar = (props) => {
    const [selectedCategory, setSelectedCategory] = useState({ id: 'accomodations', name: 'Todos' })
    const [selectedDistance, setSelectedDistance] = useState({ id: '1000', name: 'Menos de 1 km' })

    return (
        <>
            <Formik initialValues={{accommodation: ""}} onSubmit={(values) => props.searchAccommodations(values.accommodation, selectedCategory, selectedDistance)}>
                {({ handleSubmit,  errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.accommodation && touched.accommodation}>
                            <Flex direction='row' alignItems='flex-end' gap={2}>
                                <Flex direction='column' w='600px' alignItems='stretch' gap={1}>
                                    <Text as='b' size='xs' align='center' color='#718096'>¿A dónde querés alojarte?</Text>
                                    <Field
                                        as={Input}
                                        id="accommodation"
                                        name="accommodation"
                                        variant="filled"
                                        placeholder='Ingresá el nombre'
                                        validate={(value) => {
                                            let error;
                                            if (value.length > 0 && value.length < 3 ) {
                                                error = "Tenés que ingresar al menos 3 caracteres";
                                            }
                                            return error;
                                        }}
                                    />
                                </Flex>
                                <AccommodationsFilterMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                                <AccommodationsDistanceMenu selectedDistance={selectedDistance} setSelectedDistance={setSelectedDistance}/>
                                <IconButton type="submit" icon={<SearchIcon />} />
                            </Flex>
                            <FormErrorMessage>{errors.accommodation}</FormErrorMessage>
                        </FormControl>
                    </form>
                )}
            </Formik>
        </>
    )
}