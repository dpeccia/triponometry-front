import {Box, Flex, IconButton, Text} from "@chakra-ui/react";
import {MdHotel} from "react-icons/md";
import {Image} from "@chakra-ui/image";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/accordion";
import {ExternalLinkIcon, Icon} from "@chakra-ui/icons";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useState} from "react";
import {Stars} from "../../../utils/Stars";
import {Link} from "@chakra-ui/layout";
import {split} from "lodash";
import {getDetailsFromOpenTripMap} from "./getDetailsFromOpenTripMap";

export const AccommodationCard = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [image, setImage] = useState('')
    const [stars, setStars] = useState(0)
    const [address, setAddress] = useState('')
    const [url, setUrl] = useState('')
    const [wikipedia, setWikipedia] = useState('')

    const addAccommodationButton = () => {
        if (props.accommodationWasAlreadySelected(props.accommodation.name)) {
            return <IconButton icon={<FaMinus w='80%' h='80%' />} colorScheme='red' size='sm' isRound isDisabled/>
        } else {
            return <IconButton icon={<FaPlus w='80%' h='80%' />} onClick={() => props.addAccommodation(props.accommodation)} colorScheme='whatsapp' size='sm' isRound/>
        }
    }

    const AccommodationDetails = (isExpanded) => {
        if(isExpanded && isLoading) {
            getDetailsFromOpenTripMap(props.accommodation, setIsLoading, setImage, setStars, setAddress, setUrl, setWikipedia)
        }
        if(isLoading)
            return <Box/>
        return(
            <AccordionPanel pb={4}>
                <Flex justify='space-around'>
                    <Flex w='300px' justifyContent='center'>
                        <Image w='120' h='120' objectFit='contain' src={image} rounded='2xl'/>
                    </Flex>
                    <Flex direction='column' w='100%' ml={4} gap={1} fontSize='sm'>
                        <Stars rating={stars}/>
                        {addressDetail(address)}
                        {urlDetail(url)}
                        {wikipediaDetail(wikipedia)}
                    </Flex>
                    <Flex alignSelf='flex-end'>
                        {addAccommodationButton()}
                    </Flex>
                </Flex>
            </AccordionPanel>
        )
    }

    return (
        <AccordionItem>
            {({isExpanded}) => (
                <>
                    <h2>
                        <AccordionButton>
                            <Icon as={MdHotel} color='gray.600' mr='4'/>
                            <Box flex='1' textAlign='left' fontWeight='semibold'>
                                {props.accommodation.name}
                            </Box>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    {AccommodationDetails(isExpanded)}
                </>
            )}
        </AccordionItem>
    )
}

const urlDetail = (aUrl) => {
    if(!aUrl)
        return <Box/>
    if((/\b(booking)\b/.test(aUrl)))
        return(
            <Link href={aUrl} isExternal>
                Booking.com <ExternalLinkIcon mx='2px' />
            </Link>
        )
    if((/;/.test(aUrl)))
        return (
            <Link href={aUrl} isExternal>
                {split(aUrl,'/',7)[2]} <ExternalLinkIcon mx='2px' />
            </Link>
        )
}

const wikipediaDetail = (aWikipediaLink) => {
    if(!aWikipediaLink)
        return <Box/>
    return(
        <Link href={aWikipediaLink} isExternal>
            Wikipedia <ExternalLinkIcon mx='2px' />
        </Link>
    )
}

const addressDetail = (aAddress) => {
    return(
        <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
            {aAddress.road} {aAddress.pedestrian} {aAddress.cycleway} {aAddress.path} {aAddress.house_number} &bull; {aAddress.suburb}
        </Box>
    )
}