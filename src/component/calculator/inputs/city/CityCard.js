import {Box, Flex, useToast} from "@chakra-ui/react";
import {FiMapPin} from "react-icons/fi";

export const CityCard = (props) => {
    const toast = useToast()

    const onClick =  () => {
        props.setSelectedCity(props.city)
        props.setStepFinished(true)
        toast({
            title: 'Ciudad seleccionada!',
            description: `Elegiste ${props.city.name}`,
            status: 'success',
            duration: 1800,
        })
    }
    return (
        <Box as='button' m={1} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={onClick}>
            <Flex p={2} alignItems='center' >
                <FiMapPin size={25}/>
                <Flex grow={2} direction="column" ml={4} mr={2} alignItems='flex-start'>
                    <Box
                        fontWeight='semibold'
                        lineHeight='tight'
                        noOfLines={1}>
                        {props.city.name}
                    </Box>
                    <Box>
                        <Box color='gray.500'
                             fontWeight='semibold'
                             letterSpacing='wide'
                             fontSize='xs'
                             textTransform='uppercase'>
                            {props.city.region} &bull; {props.city.country}
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}