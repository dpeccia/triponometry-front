import {Heading,Flex, FormControl, FormErrorMessage} from "@chakra-ui/react"
import {useState} from "react"
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
    const onClick = () => {
        if(!isInvalid()){
            props.setCalculatorInputs(prevState => ({...prevState, horarios: selectedHorarios}))
            props.nextStep('MOBILITY')
        }
    }

    const isInvalid = () => {
        return selectedHorarios.dormirse <= selectedHorarios.despertarse && !isEmpty(selectedHorarios.dormirse) && !isEmpty(selectedHorarios.despertarse)
    }

    return(
            <Flex direction="column" alignContent="space-around" w='550px' mt='3vh'>
                <Heading textAlign='center' marginBottom={3}>
                    Horarios
                </Heading>
                <MealInput selectedHorarios={selectedHorarios} setSelectedHorarios={setSelectedHorarios}/>
                <FormControl isInvalid={isInvalid()} marginBottom={8}>
                    <BedInput selectedHorarios={selectedHorarios} setSelectedHorarios={setSelectedHorarios}/>
                    <FormErrorMessage>Debes ingresar una hora para levantarse y dormirse valida</FormErrorMessage>
                </FormControl>
                <FreeDaysInput selectedHorarios={selectedHorarios} setSelectedHorarios={setSelectedHorarios}/>
                <NextButton
                    stepFinished={!isEmpty(selectedHorarios.dormirse) && !isEmpty(selectedHorarios.despertarse) && !isInvalid()}
                    onClick={onClick}
                    description='Continua con Transporte'/>
            </Flex>
    )
}