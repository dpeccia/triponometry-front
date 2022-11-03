import { Formik,Field } from "formik";
import { FormControl,FormErrorMessage } from "@chakra-ui/form-control";
import { HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { ActivitiesFilterMenu } from "./ActivitiesFilterMenu";
import { useState } from "react";
import {Flex, Text} from "@chakra-ui/react";
import {ActivitiesDistanceMenu} from "./ActivitiesDistanceMenu";

export const ActivitiesSearchBar = (props) => {
    const [selectedCategory, setSelectedCategory] = useState({ id: 'interesting_places', name: 'Todos' })
    const [selectedDistance, setSelectedDistance] = useState({ id: '1000', name: 'Menos de 1 km' })

    return (
        <>
            <Formik initialValues={{ activity: "" }} onSubmit={(values) => props.searchActivities(values.activity, selectedCategory, selectedDistance)}>
                {({ handleSubmit, errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.activity && touched.activity}>
                            <Flex direction='row' alignItems='flex-end' gap={2}>
                                <Flex direction='column' w='600px' alignItems='stretch' gap={1}>
                                    <Text as='b' size='xs' align='center' color='#718096'>¿Qué lugares querés visitar?</Text>
                                    <Field
                                        as={Input}
                                        id="activity"
                                        name="activity"
                                        variant="filled"
                                        placeholder='Ingresa el nombre'
                                        validate={(value) => {
                                            let error;
                                            if (value.length > 0 && value.length < 3 ) {
                                                error = "Ingresar al menos 3 caracteres";
                                            }
                                            return error;
                                        }}
                                    />
                                </Flex>
                                <ActivitiesFilterMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                                <ActivitiesDistanceMenu selectedDistance={selectedDistance} setSelectedDistance={setSelectedDistance}/>
                                <IconButton type="submit" icon={<SearchIcon />} />
                            </Flex>
                            <FormErrorMessage>{errors.activity}</FormErrorMessage>
                        </FormControl>
                    </form>
                )}
            </Formik>
        </>
    )
}