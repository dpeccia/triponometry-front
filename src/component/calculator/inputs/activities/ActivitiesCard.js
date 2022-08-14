import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/accordion";
import { Box, Flex } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icons";
import { MdAddLocationAlt } from "react-icons/md";
import { wikidataDetails, wikidataImages } from "../../../../api/wikidata";
import { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Link } from "@chakra-ui/layout";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import _, { isEmpty } from "lodash";

export const ActivitiesCard = (props) => {
    const toast = useToast()
    
    const selectActivity = () => {
        props.setSelectedActivities([... props.selectedActivities, props.activity])
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
                    <Box flex='1' textAlign='left'>
                        {props.activity.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                <Flex justify='space-around'>
                <Image w='120' h='120' objectFit='contain' src={props.activity.image} rounded='2xl'/>
                <Flex direction='column' ml='5' justify='space-between' w='100%'>
                    {props.activity.description}
                    <Flex>
                        {wikipediaLink(props.activity.wikipediaEnglishLink, 'EN')} 
                        {wikipediaLink(props.activity.wikipediaSpanishLink, 'ES')} 
                    </Flex>
                    <Button variant='outline' onClick={selectActivity} colorScheme='red' size='md' alignSelf='flex-end'>
                        Seleccionar
                    </Button>
                </Flex>
                </Flex>
            </AccordionPanel>
        </AccordionItem>
    )
}