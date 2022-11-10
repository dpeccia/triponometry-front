import {Icon} from "@chakra-ui/icons";
import {BsStar, BsStarFill} from "react-icons/bs";
import {Flex, Text} from "@chakra-ui/react";

export const Stars = (props) => {
    const rating = props.rating > 5 ? 5 : props.rating
    const blackStar = <Icon as={BsStarFill} m='2px' color='yellow.400'/>
    const whiteStar = <Icon as={BsStar} m='2px' color='yellow.400'/>

    return (
        <Flex alignItems='center'>
            <Text as='b' fontSize='xl' mr={1}>{rating}</Text>
            {Array(rating).fill(blackStar)}
            {Array(5-rating).fill(whiteStar)}
        </Flex>
    )
}