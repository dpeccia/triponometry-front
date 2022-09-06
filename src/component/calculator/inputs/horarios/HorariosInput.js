import {Heading,Flex} from "@chakra-ui/react"
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
        props.setCalculatorInputs(prevState => ({...prevState, horarios: selectedHorarios}))
        props.nextStep('MOBILITY')
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
                    stepFinished={true} //TODO: cambiar cuando valido que haya cargado algo
                    onClick={onClick}
                    description='Continua con Transporte'/>
            </Flex>
    )
}