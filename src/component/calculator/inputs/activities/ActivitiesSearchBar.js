import _ from "lodash";
import { Formik,Field } from "formik";
import { FormControl,FormLabel,FormErrorMessage } from "@chakra-ui/form-control";
import { HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { IconButton } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";
import { ActivitiesFilterMenu } from "./ActivitiesFilterMenu";
import { useState } from "react";

export const ActivitiesSearchBar = (props) => {
    const [selectedCategory, setSelectedCategory] = useState({ id: 'interesting_places', name: 'Todos' })

    return (
        <>
            <Formik initialValues={{ activity: "" }} onSubmit={(values) => props.searchActivities(values.activity, selectedCategory)}>
                {({ handleSubmit, errors, touched}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl isInvalid={!!errors.activity && touched.activity}>
                            <HStack>
                                <Field
                                    as={Input}
                                    id="activity"
                                    name="activity"
                                    variant="filled"
                                    placeholder='Qué lugares querés visitar?'
                                />
                                <ActivitiesFilterMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                                <IconButton type="submit" icon={<SearchIcon />} />
                            </HStack>
                            <FormErrorMessage>{errors.activity}</FormErrorMessage>
                        </FormControl>
                    </form>
                )}
            </Formik>
        </>
    )
}