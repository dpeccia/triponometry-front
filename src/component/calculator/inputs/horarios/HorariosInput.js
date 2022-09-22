import {Heading,Flex, useToast} from "@chakra-ui/react"
import {useEffect, useState} from "react"
import {MealInput} from "./MealInput";
import {BedInput} from "./BedInput";
import {FreeDaysInput} from "./FreeDaysInput";
import {NextButton} from "../../../utils/NextButton";
import { isEmpty } from "lodash";

export const HorariosInput = (props) => {
    const defaultTime = () => {
        if(isEmpty(props.calculatorInputs.horarios)) {
            return {
                desayuno: null,
                merienda: null,
                almuerzo: null,
                cena: null,
                despertarse: null,
                dormirse: null,
                libres: null
            }
        } else {
            return props.calculatorInputs.horarios
        }
    }

    const [selectedHorarios, setSelectedHorarios] = useState(defaultTime())
    const toast = useToast()

    const onClick = () => {
        if(selectedHorarios.dormirse > selectedHorarios.despertarse){
            props.setCalculatorInputs(prevState => ({...prevState, horarios: selectedHorarios}))
            props.nextStep('MOBILITY')
        } else {
            toast({
                title: 'Corregir datos',
                description: `La hora de dormir debe ser mayor a la hora de despertarse`,
                status: 'error',
                duration: 1800,
                isClosable: true
            })
        }
    }

    return(
            <Flex direction="column" alignContent="space-around" w='550px' mt='3vh'>
                <Heading textAlign='center' marginBottom={3}>
                    Horarios
                </Heading>
                <MealInput selectedHorarios={selectedHorarios} setSelectedHorarios={setSelectedHorarios}/>
                <BedInput selectedHorarios={selectedHorarios} setSelectedHorarios={setSelectedHorarios}/>
                <FreeDaysInput selectedHorarios={selectedHorarios} setSelectedHorarios={setSelectedHorarios}/>
                <NextButton
                    stepFinished={!isEmpty(selectedHorarios.dormirse) && !isEmpty(selectedHorarios.despertarse)}
                    onClick={onClick}
                    description='Continua con Transporte'/>
            </Flex>
    )
}