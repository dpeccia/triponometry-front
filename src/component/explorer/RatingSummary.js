import {Flex, Text} from "@chakra-ui/react";
import {size} from "lodash";
import {Stars} from "../utils/Stars";

export const RatingSummary = (props) => {

    return (
        <Flex direction='column' m={1} p={3} bg='#EAF7AF' borderWidth='1px' borderRadius='xl' boxShadow='md' overflow='hidden' justifyContent='space-between'>
            <Text as='b' fontSize='sm'>Puntaje de las opiniones</Text>
            <Flex justifyContent='space-between' alignItems='center'>
                <Stars rating={props.averageRating}/>
                <Text fontSize='sm'> { size(props.reviews) } opiniones </Text>
            </Flex>
        </Flex>
    )
}
