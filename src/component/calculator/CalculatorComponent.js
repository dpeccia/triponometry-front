import {Box, Flex, SimpleGrid, VStack, Image, Button, IconButton} from "@chakra-ui/react";
import { BedIcon, BusIcon } from "../icons/icons";


export const CalculatorComponent = () =>
<Flex marginRight={3}>
    <VStack>
        <Box bg='green.100' w='calc(20vw)' h='calc(30vh)' margin={5} marginRight={2} borderRadius='lg'>
            
        </Box>

        <SimpleGrid columns={2} spacing={2} w='calc(10vW)'>
            <IconButton icon={<BedIcon w='calc(5vw)' h='calc(5vh)'/>} />
            <IconButton icon={<BusIcon w='calc(5vw)' h='calc(5vh)'/>} />
        </SimpleGrid>
    </VStack>
</Flex>