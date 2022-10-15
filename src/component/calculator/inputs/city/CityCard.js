import {Box, Flex} from "@chakra-ui/react";
import {FiMapPin} from "react-icons/fi";
import { getWikidataImage } from "../../../../api/wikidata";
import { useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "../../../utils/useToast";

export const CityCard = (props) => {
    const [showSuccessToast, _] = useToast()
    const [showSpinner, setShowSpinner] = useState(false)

    const onClick = async () => {
        setShowSpinner(true)
        const wikiDataId = props.city.wikiDataId
        const image = await getWikidataImage(wikiDataId)
        
        const cityWithImage = {...props.city, imageUrl: image}
        
        props.setSelectedCity(cityWithImage)
        props.setStepFinished(true)
        setShowSpinner(false)
        showSuccessToast('Ciudad seleccionada!', `Elegiste ${props.city.name}`)
    }

    const showChargingSpinner = () => {
        if (showSpinner) {
            return <Spinner justifySelf='flex-end' thickness='4px' speed='0.65s' emptyColor='gray.200' color='gray.500' size='md'/>
        }
    }

    return (
        <Box as='button' m={1} w='95%' borderWidth='1px' borderRadius='lg' overflow='hidden' onClick={onClick}>
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
                {showChargingSpinner()}
            </Flex>
        </Box>
    )
}