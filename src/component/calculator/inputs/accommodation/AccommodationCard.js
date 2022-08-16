import {Box, Flex, useToast} from "@chakra-ui/react";
import {MdHotel} from "react-icons/md";

export const AccommodationCard = (props) => {
    const toast = useToast()

    const onClick =  () => {
        props.setSelectedAccommodation(props.accommodation)
        props.setStepFinished(true)
        toast({
            title: 'Alojamiento seleccionado!',
            description: `Elegiste ${props.accommodation.name}`,
            status: 'success',
            duration: 1800,
        })
    }
    return (
        <Box as='button' m={1} w='90%' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={onClick}>
            <Flex p={2} alignItems='center' >
                <MdHotel size={25}/>
                <Flex grow={2} direction="column" ml={4} mr={2} alignItems='flex-start'>
                    <Box
                        fontWeight='semibold'
                        lineHeight='tight'
                        noOfLines={1}>
                        {props.accommodation.name}
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}