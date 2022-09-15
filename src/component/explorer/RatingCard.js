import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import {Icon, StarIcon} from "@chakra-ui/icons";
import {BsFillCheckCircleFill, BsFillXCircleFill} from "react-icons/bs";

export const RatingCard = (props) => {
    return (
        <Box m={1} bg='gray.100' borderWidth='1px' borderRadius='xl' boxShadow='md' overflow='hidden'>
            <Box display='flex' justifyContent='space-between'>
                <Box p={3}>
                    <Flex>
                        <Flex>
                            <Avatar bg='#EFB4BF'/>
                        </Flex>
                        <Flex ml={3} direction='column' gap={1}>
                            <Flex alignItems='center'>
                                <Text as='b' fontSize='md' mr={1}>{props.score}</Text>
                                <StarIcon/>
                                <Flex ml={3}>
                                    {
                                        props.hasDone ? (
                                            <Flex alignItems='center'>
                                                <Icon as={BsFillCheckCircleFill} color='green.400'/>
                                                <Text ml={1} as='b' fontSize='sm' color='green.400'> realizó el viaje </Text>
                                            </Flex>
                                        ):(
                                            <Flex alignItems='center'>
                                                <Icon as={BsFillXCircleFill} color='red.400'/>
                                                <Text ml={1} as='b' fontSize='sm' color='red.400'> no realizó el viaje </Text>
                                            </Flex>
                                        )

                                    }
                                </Flex>
                            </Flex>
                            <Flex>
                                <Text>
                                    {props.review}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}