import {Box, Flex} from "@chakra-ui/react";
import {MdHotel} from "react-icons/md";
import { useToast } from "../../../utils/useToast";

export const AccommodationCard = (props) => {
    const [showSuccessToast, _] = useToast()

    const onClick = () => {
        props.setSelectedAccommodation(props.accommodation)
        props.setStepFinished(true)
        showSuccessToast('Alojamiento seleccionado!', `Elegiste ${props.accommodation.name}`)
    }
    return (
        <Box as='button' m={1} w='95%' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={onClick}>
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