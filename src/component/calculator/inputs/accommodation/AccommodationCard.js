import {Box, Flex, IconButton, Text} from "@chakra-ui/react";
import {MdHotel} from "react-icons/md";
import {Image} from "@chakra-ui/image";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/accordion";
import {ExternalLinkIcon, Icon} from "@chakra-ui/icons";
import {FaMinus, FaPlus} from "react-icons/fa";
import opentripmap from "../../../../api/opentripmap";
import {useState} from "react";
import {Stars} from "../../../utils/Stars";
import {Link} from "@chakra-ui/layout";
import {first, split} from "lodash";

export const AccommodationCard = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [image, setImage] = useState('')
    const [stars, setStars] = useState(0)
    const [address, setAddress] = useState('')
    const [url, setUrl] = useState('')
    const [wikipedia, setWikipedia] = useState('')

    const urlDetail = () => {
        if(!url)
            return <Box/>
        if((/\b(booking)\b/.test(url)))
            return(
                <Link href={url} isExternal>
                    Booking.com <ExternalLinkIcon mx='2px' />
                </Link>
            )
        if((/;/.test(url)))
            return (
                <Link href={url} isExternal>
                    {split(url,'/',7)[2]} <ExternalLinkIcon mx='2px' />
                </Link>
            )
    }

    const wikipediaDetail = () => {
        if(!wikipedia)
            return <Box/>
        return(
            <Link href={wikipedia} isExternal>
                Wikipedia <ExternalLinkIcon mx='2px' />
            </Link>
        )
    }

    const addressDetail = () => {
        return(
            <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
                {address.road} {address.pedestrian} {address.cycleway} {address.path} {address.house_number} &bull; {address.suburb}
            </Box>
        )
    }

    const addAccommodationButton = () => {
        if (props.accommodationWasAlreadySelected(props.accommodation.name)) {
            return <IconButton icon={<FaMinus w='80%' h='80%' />} colorScheme='red' size='sm' isRound isDisabled/>
        } else {
            return <IconButton icon={<FaPlus w='80%' h='80%' />} onClick={() => props.addAccommodation(props.accommodation)} colorScheme='whatsapp' size='sm' isRound/>
        }
    }

    const getDetailsFromOpenTripMap = async (accommodation) => {
        setIsLoading(true)

        const xid = accommodation.id
        const response = await opentripmap.get(`/xid/${xid}`,{
            params: {
                apikey: '5ae2e3f221c38a28845f05b6f49a7b8966e8aa9ad3d18032148adf6f',
            }
        })

        setImage(!response.data.image ? '../logo-triponometry.png' : response.data.preview.source)
        setStars(!response.data.stars ? parseInt(first(response.data.rate)) : response.data.stars)
        setAddress(response.data.address)
        setUrl(response.data.url)
        setWikipedia(response.data.wikipedia)

        setIsLoading(false)
    }

    const AccommodationDetails = (isExpanded) => {
        if(isExpanded && isLoading) {
            getDetailsFromOpenTripMap(props.accommodation)
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
                        {addressDetail()}
                        {urlDetail()}
                        {wikipediaDetail()}
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