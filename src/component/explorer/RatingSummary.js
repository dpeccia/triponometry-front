import {Icon} from "@chakra-ui/icons";
import {BsStar, BsStarFill} from "react-icons/bs";
import {Flex, Text} from "@chakra-ui/react";
import {size} from "lodash";

export const RatingSummary = (props) => {

    const blackStar = <Icon as={BsStarFill} m='2px'/>
    const whiteStar = <Icon as={BsStar} m='2px'/>

    return (
        <Flex m={1} p={3} h='55px' borderWidth='1px' borderRadius='xl' boxShadow='md' overflow='hidden' justifyContent='space-between' alignItems='center'>

                <Flex alignItems='baseline'>
                    <Text as='b' fontSize='lg' >{props.averageRating}</Text>
                    {Array(props.averageRating).fill(blackStar)}
                    {Array(5-props.averageRating).fill(whiteStar)}
                </Flex>
                <Flex>
                    <Text fontSize='sm'> { size(props.reviews) } opiniones </Text>
                </Flex>
        </Flex>
    )

}
