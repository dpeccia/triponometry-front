import {Box, Flex} from "@chakra-ui/react";
import { useState } from "react";
import { CalculatorComponent } from "../calculator/CalculatorComponent";

export const CalculatorPage = () =>{

    const [message, setMessage] = useState("");

    const handleClick = (newMessage) =>
    {
        setMessage(newMessage);
    }

    return(
    <Flex flexDirection='row'>
        <Box>
            <CalculatorComponent handleClick={handleClick}/>
        </Box>
        <Box>
            <Flex marginLeft={3}>
                {message}
            </Flex>
        </Box>
    </Flex>
);
}