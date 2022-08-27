import {Heading,Flex} from "@chakra-ui/react"
import {useState} from "react"
import {MealInput} from "./MealInput";
import {BedInput} from "./BedInput";
import {FreeDaysInput} from "./FreeDaysInput";
import {NextButton} from "../../../utils/NextButton";
import {MobilityInput} from "../mobility/MobilityInput";

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

    const onClick = () => {
        props.setCalculatorInputs(prevState => ({...prevState, horarios: selectedHorarios}))
        props.nextStep(<MobilityInput nextStep={props.nextStep} setCalculatorInputs={props.setCalculatorInputs}/>)
    }

    return(
            <Flex direction="column" alignContent="space-around" w='550px' mt='3vh'>
                <Heading textAlign='center' marginBottom={3}>
                    Horarios
                </Heading>
                <MealInput setSelectedHorarios={setSelectedHorarios}/>
                <BedInput setSelectedHorarios={setSelectedHorarios}/>
                <FreeDaysInput setSelectedHorarios={setSelectedHorarios}/>
                <NextButton
                    stepFinished={true} //TODO: cambiar cuando valido que haya cargado algo
                    onClick={onClick}
                    description='Continua con Transporte'/>
            </Flex>
    )
}