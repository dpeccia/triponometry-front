import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/accordion";
import { Box, Flex } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { MdAddLocationAlt } from "react-icons/md";
import { Image } from "@chakra-ui/image";
import { Link } from "@chakra-ui/layout";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { IconButton, Text } from "@chakra-ui/react";
import { FaMinus } from "react-icons/fa";
import { AddActivityModal } from "../../../utils/modals/AddActivityModal";
import {isEmpty} from "lodash";
import {useState} from "react";
import {Stars} from "../../../utils/Stars";
import {getDetailsFromOpenTripMap} from "./getDetailsFromOpenTripMap";
import {getDetailsFromWikidata} from "./getDetailsFromWikidata";

export const ActivitiesCard = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [wikipediaEnglishLink, setWikipediaEnglishLink] = useState('')
    const [wikipediaSpanishLink, setWikipediaSpanishLink] = useState('')

    const addActivityButton = () => {
        if (props.activityWasAlreadySelected(props.activity)) {
            return <IconButton icon={<FaMinus w='80%' h='80%' />} onClick={() => props.removeActivity(props.activity)} colorScheme='red' size='sm' isRound/>
        } else {
            return <AddActivityModal city={props.city} activity={props.activity} addActivity={props.addActivity} isDisabled={props.disableAdd}/>
        }
    }

    const ActivityDetails = (isExpanded) => {
        if(isExpanded && isLoading) {
            isEmpty(props.activity.wikidata)
                ? getDetailsFromOpenTripMap(props.activity, setIsLoading, setImage, setWikipediaEnglishLink)
                : getDetailsFromWikidata(props.activity, setIsLoading, setImage, setDescription, setWikipediaEnglishLink, setWikipediaSpanishLink)
        }
        if(isLoading)
            return <Box/>
        return(
            <AccordionPanel pb={4}>
                <Flex justify='space-around'>
                    <Flex w='300px' justifyContent='center'>
                        <Image w='120' h='120' objectFit='contain' src={image} rounded='2xl'/>
                    </Flex>
                    <Flex direction='column' ml='5' justify='space-between' w='100%' fontSize='sm'>
                        <Stars rating={props.activity.rate}/>
                        <Text as='em'>{description}</Text>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Flex direction='column'>
                                <Text as='u' color='blue.600' fontSize='xs'>{wikipediaLink(wikipediaEnglishLink, 'EN')}</Text>
                                <Text as='u' color='blue.600' fontSize='xs'>{wikipediaLink(wikipediaSpanishLink, 'ES')}</Text>
                            </Flex>
                            {addActivityButton()}
                        </Flex>
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
                            <Icon as={MdAddLocationAlt} color='gray.600' mr='4' />
                            <Box flex='1' textAlign='left' fontWeight='semibold'>
                                {props.activity.name}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    {ActivityDetails(isExpanded)}
                </>
            )}
        </AccordionItem>
    )
}

const wikipediaLink = (link, language) => {
    if(link) {
        return (
            <Link href={link} isExternal>
                Wikipedia ({language}) <ExternalLinkIcon mx='2px' />
            </Link>
        );
    }
}