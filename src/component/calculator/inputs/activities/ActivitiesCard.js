import { useToast } from "@chakra-ui/toast";
import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/accordion";
import { Box, Flex } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { MdAddLocationAlt } from "react-icons/md";
import { Image } from "@chakra-ui/image";
import { Link } from "@chakra-ui/layout";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { IconButton, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

export const ActivitiesCard = (props) => {
    const toast = useToast()
    
    const selectActivity = () => {
        props.setSelectedActivities([...props.selectedActivities, props.activity])
        props.setStepFinished(true)
        toast({
            title: 'Actividad seleccionada!',
            description: `Elegiste ${props.activity.name}`,
            status: 'success',
            duration: 1800,
        })
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

    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Icon as={MdAddLocationAlt} color='gray.600' mr='4' />
                    <Box flex='1' textAlign='left' fontWeight='semibold'>
                        {props.activity.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <Flex justify='space-around'>
                    <Image w='120' h='120' objectFit='contain' src={props.activity.image} rounded='2xl'/>
                    <Flex direction='column' ml='5' justify='space-between' w='100%' fontSize='sm'>
                        <Text as='em'>{props.activity.description}</Text>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <Flex direction='column'>
                                <Text as='u' color='blue.600' fontSize='xs'>{wikipediaLink(props.activity.wikipediaEnglishLink, 'EN')}</Text>
                                <Text as='u' color='blue.600' fontSize='xs'>{wikipediaLink(props.activity.wikipediaSpanishLink, 'ES')}</Text>
                            </Flex>
                            <IconButton icon={<FaPlus w='80%' h='80%' />} onClick={selectActivity} colorScheme='whatsapp' size='sm' isRound/>
                        </Flex>
                    </Flex>
                </Flex>
            </AccordionPanel>
        </AccordionItem>
    )
}