import { AddIcon, ArrowRightIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
import {Box, SimpleGrid, VStack, IconButton, HStack} from "@chakra-ui/react";
import { BedIcon, BusIcon, DestinationIcon, DollarIcon, HourglassIcon, CalendarIcon } from "../icons/icons";

export const CalculatorComponent = ({handleClick}) =>
<Box marginRight={3} bg='gray.300' borderRadius='lg'>
    <VStack>
        <Box bg='green.100' w='calc(20vw)' h='calc(30vh)' margin={5} marginRight={2} borderRadius='lg'>
            
        </Box>
        <HStack alignItems='flex-start'>
            <SimpleGrid columns={2} spacing={2} w='calc(10vW)' marginBottom={5}>
                <IconButton icon={<BedIcon w='calc(4vw)' h='calc(4vh)'/>} w='calc(5vw)' h='calc(5vh)' onClick={() => handleClick("Seleccionar Alojamiento")}/>
                <IconButton icon={<HourglassIcon w='calc(4vw)' h='calc(4vh)' />} w='calc(5vw)' h='calc(5vh)' onClick={() => handleClick("Seleccionar Horarios")} />
                <IconButton icon={<BusIcon w='calc(4vw)' h='calc(4vh)'/>} w='calc(5vw)' h='calc(5vh)' onClick={() => handleClick("Seleccionar Transporte")} />
                <IconButton icon={<DestinationIcon w='calc(4vw)' h='calc(4vh)' />} w='calc(5vw)' h='calc(5vh)' onClick={() => handleClick("Seleccionar Actividad")}/>
                <IconButton icon={<CalendarIcon w='calc(4vw)' h='calc(4vh)'/>} w='calc(5vw)' h='calc(5vh)' onClick={() => handleClick("Seleccionar Dias")}/>
                <IconButton icon={<DollarIcon w='calc(4vw)' h='calc(4vh)' />} w='calc(5vw)' h='calc(5vh)' onClick={() => handleClick("Seleccionar Presupuesto")}/>
            </SimpleGrid>
            <HStack>
                <VStack>
                    <IconButton icon={<MinusIcon w='calc(2vw)' h='calc(2vh)'/>} w='calc(5vw)' h='calc(5vh)'  onClick={() => handleClick("Eliminar")} />
                    <IconButton icon={<AddIcon w='calc(2vw)' h='calc(2vh)' />}  w='calc(5vw)' h='calc(11vh)' onClick={() => handleClick("Agregar")}/>
                </VStack>
                <VStack>
                    <IconButton icon={<EditIcon w='calc(2vw)' h='calc(2vh)'/>} w='calc(5vw)' h='calc(5vh)'  onClick={() => handleClick("Editar")}/>
                    <IconButton icon={<ArrowRightIcon w='calc(2vw)' h='calc(2vh)' />}  w='calc(5vw)' h='calc(11vh)' onClick={() => handleClick("Calcular")}/>
                </VStack>
            </HStack>
        </HStack>
    </VStack>
</Box>