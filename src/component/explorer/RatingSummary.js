import {Flex, Text} from "@chakra-ui/react";
import {size} from "lodash";
import {Stars} from "../utils/Stars";

export const RatingSummary = (props) => {

    return (
        <Flex m={1} p={3} h='55px' borderWidth='1px' borderRadius='xl' boxShadow='md' overflow='hidden' justifyContent='space-between' alignItems='center'>
                <Stars rating={props.averageRating}/>
                <Flex>
                    <Text fontSize='sm'> { size(props.reviews) } opiniones </Text>
                </Flex>
        </Flex>
    )
}
