import { Tag } from "@chakra-ui/tag"
import { TagLeftIcon } from "@chakra-ui/tag"
import { Text } from "@chakra-ui/layout"
import { InfoOutlineIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { first, size, last } from "lodash"
import { useEffect } from "react"
import { Flex } from "@chakra-ui/layout"
import { Progress } from "@chakra-ui/progress"
import { IconButton } from "@chakra-ui/button"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

export const NewCalculationInfo = () => {
    const helpInformation = [
        "Ingresá la ciudad a la que querés viajar y seguí los pasos indicados",
        "Tanto la ciudad, el alojamiento y los hoteles deben ser ingresados en idioma Inglés",
        "Recordá que podes editar la información que pusiste navegando por la calculadora",
        "Podes presionar el botón de guardar para generar un borrador y seguirlo modificando más tarde",
        "Cuando termines de completar la información podrás ver tu recorrido óptimo presionando el botón de igual",
        "Toda la información que se te solicita es para generar un recorrido óptimo lo más personalizado posible!"
    ]

    const [actualInformation, setActualInformation] = useState(first(helpInformation))
    const [actualProgress, setActualProgress] = useState(0)

    const previousInformation = () => {
        const actualIndex = helpInformation.indexOf(actualInformation)
        const previousIndex = actualIndex - 1
        setActualProgress(0)
        if (previousIndex < 0)
            setActualInformation(last(helpInformation))
        else
            setActualInformation(helpInformation[previousIndex]) 
    }

    const nextInformation = () => {
        const actualIndex = helpInformation.indexOf(actualInformation)
        const nextIndex = actualIndex + 1
        setActualProgress(0)
        if (nextIndex == size(helpInformation))
            setActualInformation(helpInformation[0])
        else
            setActualInformation(helpInformation[nextIndex]) 
    }

    useEffect(() => {
        const intervalProgress = setInterval(() => {
            setActualProgress(progress => progress + 0.5)
        }, 50);

        const interval = setInterval(() => {
            nextInformation()
        }, 10000);

        return () => {
          clearInterval(interval);
          clearInterval(intervalProgress);
        };
      }, [actualInformation]);

    return (
        <Flex direction='column' w='440px'>
            <Tag mt={7} p={3} colorScheme='blue' >
                <TagLeftIcon boxSize='25px' as={InfoOutlineIcon} color='blue.600'/>
                <Text fontSize='md' color='blue.600'>{actualInformation}</Text>
            </Tag>
            <Progress colorScheme='blue' bgColor='blue.100' value={actualProgress} size='sm' />
            <Flex mt={1} direction='row' justifyContent='flex-end' color='blue.600'>
                <IconButton mr={1} variant='ghost' size='xs' as={MdNavigateBefore} onClick={previousInformation}/>
                <Text>{helpInformation.indexOf(actualInformation) + 1} de {size(helpInformation)}</Text>
                <IconButton ml={1} variant='ghost' size='xs' as={MdNavigateNext} onClick={nextInformation}/>
            </Flex>
        </Flex>
    )
}