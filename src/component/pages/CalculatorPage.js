import {Box, Flex} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import {CityInput} from "../CityInput";

export const CalculatorPage = () =>{

    const [inputComponent, setInputComponent] = useState(<CityInput/>);

    const handleClick = (inputComponent) =>
    {
        setInputComponent(inputComponent);
    }

    return(
    <Flex flexDirection='row'>
        <Box>
            <CalculatorComponent handleClick={handleClick}/>
        </Box>
        <Flex marginLeft={3} alignItems="flex-start">
            {inputComponent}
        </Flex>
    </Flex>
);
}