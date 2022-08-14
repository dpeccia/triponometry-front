import {Field, Formik} from "formik";
import {FormControl, FormErrorMessage, HStack, IconButton, Input} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import opentripmap from "../../../../api/opentripmap";

export const AccommodationSearchBar = (props) => {
    return (
        <>
            <Formik
                initialValues={{
                    accommodation: "",
                }}
                onSubmit={ async (values) => {
                    const response = await opentripmap.get(
                        '/radius',
                        {
                            params: {
                                lat: props.cityLat,
                                lon: props.cityLon,
                                name: values.accommodation,
                                radius:'1000',
                                kinds: 'accomodations',
                                limit: '100',
                                rate: '2',
                                format: 'json',
                                apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
                            },
                        });
                    props.setAccommodationsResponse(response.data);
                }}
            >
                {({ handleSubmit,  errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.accommodation && touched.accommodation}>
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