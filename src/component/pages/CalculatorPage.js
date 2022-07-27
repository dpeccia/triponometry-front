import {Box, Flex} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";
import {CityInput} from "../CityInput";

export const CalculatorPage = () =>{

    const handleClick = (inputComponent) =>
    {
        setInputComponent(inputComponent);
    }
    
    const [city, setCity] = useState();
    const [accommodation,setAccommodation] = useState();
    const [inputComponent, setInputComponent] = useState(<CityInput setCity={setCity} setAccommodation={setAccommodation} nextStep={handleClick}/>);

    console.log(accommodation)
    return(
    <Flex flexDirection='row'>
        <Box>
            <CalculatorComponent handleClick={handleClick} selectedCity={city}/>
        </Box>
        <Flex marginLeft={3} alignItems="flex-start">
            {inputComponent}
        </Flex>
    </Flex>
);
}