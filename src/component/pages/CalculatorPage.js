import {Box, Flex, Grid, GridItem, SimpleGrid, VStack, Image, Button, IconButton} from "@chakra-ui/react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import { BedIcon, BusIcon } from "../icons/icons";

export const CalculatorPage = () =>
    <Grid templateColumns='repeat(2,1fr)' gap={6} bg='orange.100'>
        <GridItem maxWidth='calc(50vw)' maxHeight='calc(100vh)' bg='white'>
            <CalculatorComponent/>
        </GridItem>
        <GridItem maxWidth='calc(50vw)' maxHeight='calc(100vh)' bg='white'>
            <Flex marginLeft={3}>
            Aca va lo calculado
            </Flex>
        </GridItem>
    </Grid>