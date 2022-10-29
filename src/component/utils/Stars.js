import {Icon} from "@chakra-ui/icons";
import {BsStar, BsStarFill} from "react-icons/bs";
import {Flex, Text} from "@chakra-ui/react";

export const Stars = (props) => {
    const blackStar = <Icon as={BsStarFill} m='2px' color='yellow.400'/>
    const whiteStar = <Icon as={BsStar} m='2px' color='yellow.400'/>

    return (
        <Flex alignItems='center'>
            <Text as='b' fontSize='xl' mr={1}>{props.rating}</Text>
            {Array(props.rating).fill(blackStar)}
            {Array(5-props.rating).fill(whiteStar)}
        </Flex>
    )
}