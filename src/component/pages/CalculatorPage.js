import {Box, Flex} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import {CityInput} from "../calculator/inputs/city/CityInput";


export const CalculatorPage = () => {

    const [calculatorInputs, setCalculatorInputs] = useState({
        city: {},
        accommodation: {},
        activities: [],
        horarios: {},
        mobility: {},
        days: {},
        money: {}
    });

    const handleClick = (inputComponent) =>
    {
        setInputComponent(inputComponent);
    }

    const [inputComponent, setInputComponent] = useState(
        <CityInput
            nextStep={handleClick}
            setCalculatorInputs={setCalculatorInputs}
        />
    );

    return(
    <Flex>
        <CalculatorComponent handleClick={handleClick} calculatorInputs={calculatorInputs} setCalculatorInputs={setCalculatorInputs}/>
        <Flex marginLeft={3} >
            {inputComponent}
        </Flex>
    </Flex>
);
}