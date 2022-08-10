import {Box, Flex} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import {CityInput} from "../CityInput";

export const CalculatorPage = () => {

    const [calculatorInputs, setCalculatorInputs] = useState({
        city: {},
        accommodation: {},
        activities: [],
        horarios: {}
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
    <Flex flexDirection='row'>
        <Box>
            <CalculatorComponent handleClick={handleClick} calculatorInputs={calculatorInputs} setCalculatorInputs={setCalculatorInputs}/>
        </Box>
        <Flex marginLeft={3} alignItems="flex-start">
            {inputComponent}
        </Flex>
    </Flex>
);
}