import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import {Icon, StarIcon} from "@chakra-ui/icons";
import {BsFillCheckCircleFill, BsFillXCircleFill} from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { getUserInfo } from "../../BackendService";

export const RatingCard = (props) => {

    const [userInfo, setUserInfo] = useState({id: props.userId, username: "algun", verified: false, mail: ""})

    useEffect(()=>{
        fetchUserInfo().then((response) => {           
            setUserInfo(response)
        })
    },[])

    const fetchUserInfo = async () =>{
        return await getUserInfo(props.userId)
    }

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
                                <Text as='b'> {userInfo.username} </Text>
                                <Text as='b' fontSize='md' ml={1}>{props.score}</Text>
                                <StarIcon/>
                            </Flex>
                            <Flex>
                                <Text>
                                    {props.review}
                                </Text>
                            </Flex>
                            <Flex>
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
                                    {
                                        userInfo.verified ? (
                                            <Flex alignItems='center' ml={1}>
                                                <Icon as={BsFillCheckCircleFill} color='blue.400'/>
                                                <Text ml={1} as='b' fontSize='sm' color='blue.400'> Usuario Verificado </Text>
                                            </Flex>
                                        ):(
                                            <></>
                                        )

                                    }
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}