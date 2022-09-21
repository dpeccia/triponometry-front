import Confetti from 'react-dom-confetti';
import {VStack, RadioGroup, Radio, Flex, Box, Heading, Text,} from "@chakra-ui/react"
import {useEffect, useState} from "react"
import {MdDirectionsBike, MdDirectionsWalk} from "react-icons/md"
import {AiFillCar} from "react-icons/ai";
import {BsArrowLeftSquare} from "react-icons/bs";
import {isEmpty} from "lodash";

export const MobilityInput = (props) => {
    const config = {
        angle: 180,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        perspective: "500px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    const [selectedTransportation, setSelectedTransportation] = useState(props.calculatorInputs.mobility)

    useEffect(() => {
        props.setCalculatorInputs(prevState => ({...prevState, mobility: selectedTransportation}))
    }, [selectedTransportation]);

    return(
            <Flex direction="column" alignContent="space-around" w='550px' mt='3vh'>
                <Heading textAlign='center' marginBottom={3}>
                    Movilidad
                </Heading>
                <VStack>
                    <RadioGroup onChange={setSelectedTransportation} value={selectedTransportation}>
                        <Flex direction='column' alignContent='stretch'>
                            <Box as='button' m={1} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                <Flex p={2} alignItems='center' >
                                    <Radio value='WALKING'>
                                        <Flex ml={1} mr={1} alignItems='flex-start' justifyContent='space-between'>
                                            <Box mr={2}>
                                                <MdDirectionsWalk size={25}/>
                                            </Box>
                                            <Box
                                                fontWeight='semibold'
                                                lineHeight='tight'
                                                noOfLines={1}>
                                                Caminando
                                            </Box>
                                        </Flex>
                                    </Radio>
                                </Flex>
                            </Box>
                            <Box as='button' m={1} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                <Flex p={2} alignItems='center' >
                                    <Radio value='DRIVING'>
                                        <Flex ml={1} mr={1} alignItems='flex-start' justifyContent='space-between'>
                                            <Box mr={2}>
                                                <AiFillCar size={25}/>
                                            </Box>
                                            <Box
                                                fontWeight='semibold'
                                                lineHeight='tight'
                                                noOfLines={1}>
                                                En automovil
                                            </Box>
                                        </Flex>
                                    </Radio>

                                </Flex>
                            </Box>
                            <Box as='button' m={1} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                <Flex p={2} alignItems='center' >
                                    <Radio value='BICYCLING'>
                                        <Flex ml={1} mr={1} alignItems='flex-start' justifyContent='space-between'>
                                            <Box mr={2}>
                                                <MdDirectionsBike size={25}/>
                                            </Box>
                                            <Box
                                                fontWeight='semibold'
                                                lineHeight='tight'
                                                noOfLines={1}>
                                                En bicicleta
                                            </Box>
                                        </Flex>
                                    </Radio>

                                </Flex>
                            </Box>
                        </Flex>
                    </RadioGroup>
                </VStack>
                <Confetti active={ !isEmpty(selectedTransportation) } config={ config }/>
                { !isEmpty(selectedTransportation) &&
                    <Flex justifyContent='space-evenly' alignItems='center' h='500px'>
                        <BsArrowLeftSquare size={40}/>
                        <Flex direction='column'>
                            <Text fontSize='lg'>
                                Completaste todos los inputs necesarios.
                            </Text>
                            <Text fontSize='lg'>
                                    Clickea el igual para obtener tu calculo de viaje
                            </Text>
                        </Flex>
                    </Flex>
                }
            </Flex>
    )
}