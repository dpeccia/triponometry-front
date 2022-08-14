import {Field, Formik} from "formik";
import geodb from "../../../../api/geodb";
import {FormControl, FormErrorMessage, HStack, IconButton, Input} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export const CitySearchBar = (props) => {
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
                            params: {sort: '-population', namePrefix: values.city, limit: '10', languageCode: 'es', types: 'city'},
                        });
                    props.setCities(response.data.data);
                }}
            >
                {({ handleSubmit,  errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.city && touched.city}>
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