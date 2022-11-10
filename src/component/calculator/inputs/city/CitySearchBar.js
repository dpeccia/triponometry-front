import {Field, Formik} from "formik";
import geodb from "../../../../api/geodb";
import {Flex, FormControl, FormErrorMessage, IconButton, Input, Text} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {isEmpty} from "lodash";

export const CitySearchBar = (props) => {
    return (
        <>
            <Formik
                initialValues={{
                    city: "",
                }}
                onSubmit={ async (values) => {
                    props.setIsLoading(true);
                    const response = await geodb.get(
                        '',
                        {
                            params: {
                                sort: '-population',
                                namePrefix: values.city,
                                limit: '10',
                                languageCode: 'en',
                                types: 'city'
                            },
                        });

                    props.setIsLoading(false);
                    props.setIsEmpty(isEmpty(response.data.data));
                    props.setCitiesResponse(response.data.data);
                }}
            >
                {({ handleSubmit,  errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.city && touched.city}>
                            <Flex direction='row' alignItems='flex-end' gap={2}>
                                <Flex direction='column' w='600px' alignItems='stretch' gap={1}>
                                    <Text as='b' size='xs' color='#718096'>¿A dónde querés viajar?</Text>
                                    <Field
                                        as={Input}
                                        id="city"
                                        name="city"
                                        variant="filled"
                                        placeholder='Ingresá la ciudad'
                                        validate={(value) => {
                                            let error;
                                            if (value.length < 1 ) {
                                                error = "Tenés que ingresar al menos un caracter";
                                            }
                                            return error;
                                        }}
                                    />
                                </Flex>
                                <IconButton type="submit"  icon={<SearchIcon />} />
                            </Flex>
                            <FormErrorMessage>{errors.city}</FormErrorMessage>
                        </FormControl>
                    </form>
                )}
            </Formik>
        </>
    )
}