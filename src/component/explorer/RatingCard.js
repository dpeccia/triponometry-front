import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {BsFillCheckCircleFill, BsFillPatchCheckFill, BsFillXCircleFill} from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { getUserInfo } from "../../BackendService";
import {Stars} from "../utils/Stars";
import {isEmpty} from "lodash";

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
        <Box m={1} bg='gray.50' borderWidth='1px' borderRadius='xl' boxShadow='md' overflow='hidden'>
            <Box display='flex' justifyContent='space-between'>
                <Box p={3}>
                    <Flex direction='column'>
                        <Flex alignItems='center'>
                            <Flex>
                                <Avatar name={userInfo.username}/>
                            </Flex>
                            <Flex ml={3} direction='column' gap={1}>
                                <Flex alignItems='center' gap={1}>
                                    <Text as='b' noOfLines={1}> {userInfo.username} </Text>
                                    { userInfo.verified && <Flex><Icon as={BsFillPatchCheckFill} color='blue.400'/></Flex>}
                                </Flex>
                                <Flex gap={3}>
                                    <Stars rating={props.score}/>
                                    {
                                        props.hasDone ? (
                                            <Flex alignItems='center'>
                                                <Icon as={BsFillCheckCircleFill} color='#8AA7BC'/>
                                                <Text ml={1} as='b' fontSize='sm' color='#8AA7BC'> realizó el viaje </Text>
                                            </Flex>
                                        ):(
                                            <Flex alignItems='center'>
                                                <Icon as={BsFillXCircleFill} color='#8AA7BC'/>
                                                <Text ml={1} as='b' fontSize='sm' color='#8AA7BC'> no realizó el viaje </Text>
                                            </Flex>
                                        )
                                    }
                                </Flex>
                            </Flex>
                        </Flex>
                        { !isEmpty(props.review) &&
                            <Flex m={1}>
                                <Text>
                                    {props.review}
                                </Text>
                            </Flex>
                        }
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}