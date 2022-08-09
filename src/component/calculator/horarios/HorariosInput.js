import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Center, Divider, Heading, VStack, Button, SimpleGrid, Input } from "@chakra-ui/react"
import { useState } from "react"
import { IncrementDecrementInputComponent } from "../../commons/IncrementDecrementInputComponent"
import { MealsComponent } from "./MealsComponent"

export const HorariosInput = (props) => {

    const [selectedHorarios, setSelectedHorarios] = useState({
        desayuno: null,
        merienda: null,
        almuerzo: null,
        cena: null,
        despertarse: null,
        dormirse: null,
        libres: null
    })

    return(
        <Center>
            <VStack w='100%'>
                <Heading textAlign='center' marginBottom={5}>
                    Horarios
                </Heading>
                <Box borderRadius='lg' marginBottom={2} borderWidth='1px'>
                    <Heading textAlign='left' fontSize='lg'>Comidas</Heading>
                    <Divider borderColor={"black"} marginBottom={2}/>
                    <SimpleGrid columns={2} spacing={2}>
                        <MealsComponent label={"Desayuno"} handleChange={(value) => {setSelectedHorarios(prevState => ({...prevState, desayuno: value}))}}/>
                        <MealsComponent label={"Merienda"} handleChange={(value) => {setSelectedHorarios(prevState => ({...prevState, merienda: value}))}}/>
                        <MealsComponent label={"Almuerzo"} handleChange={(value) => {setSelectedHorarios(prevState => ({...prevState, almuerzo: value}))}}/>
                        <MealsComponent label={"Cena"} handleChange={(value) => {setSelectedHorarios(prevState => ({...prevState, cena: value}))}}/>
                    </SimpleGrid>
                </Box>

                <Box borderRadius='lg' marginBottom={2} borderWidth='1px' alignSelf='stretch'>
                    <Heading textAlign='left' fontSize='lg'>Levantarse Dormirse</Heading>
                    <Divider borderColor={"black"} marginBottom={2}/>
                        <VStack columns={2} spacing={2}>
                            <Box>
                                Quiero levantarme no antes de las: {<Input type="time" marginLeft={1} w='auto' onChange={(event) => {setSelectedHorarios(prevState => ({...prevState, despertarse: event.target.value}))}}/>}
                            </Box>
                            <Box>
                                Quiero dormirme no despues de las: {<Input type="time" marginLeft={1} w='auto' onChange={(event) => {setSelectedHorarios(prevState => ({...prevState, dormirse: event.target.value}))}}/>}
                            </Box>
                        </VStack>
                </Box>

                <Box borderRadius='lg' marginBottom={2} borderWidth='1px' alignSelf='stretch'>
                    <Heading textAlign='left' fontSize='lg'>Dias Libres</Heading>
                    <Divider borderColor={"black"} marginBottom={2}/>
                    <Center>
                            Quiero tener {<IncrementDecrementInputComponent handleChange={(value) => {setSelectedHorarios(prevState => ({...prevState, libres: value}))}}/>} dias sin actividades predefinidas
                    </Center>
                </Box>

                <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme='pink'
                    variant='outline'
                    onClick={() => {
                        props.setCalculatorInputs(prevState => ({...prevState, horarios: selectedHorarios}))
                    }}
                >
                    Continua con ALGO
                </Button>
            </VStack>
        </Center>
    )
}