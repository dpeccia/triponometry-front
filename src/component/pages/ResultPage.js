import {Box, Flex} from "@chakra-ui/react";
import { ResultMap } from "../map/ResultMap";

export const ResultPage = () => {

    // const handleClick = (inputComponent) =>
    // {
    //     setInputComponent(inputComponent);
    // }
    
    // const [city, setCity] = useState();
    // const [accommodation,setAccommodation] = useState();
    // const [inputComponent, setInputComponent] = useState(<CityInput setCity={setCity} setAccommodation={setAccommodation} nextStep={handleClick}/>);

    // console.log(accommodation)
    return(
    <Flex flexDirection='row'>
        <Box>
            InfoCalculation
        </Box>
        
        <Flex marginLeft={3} alignItems="flex-start">
            <ResultMap></ResultMap>
        </Flex>

        <Flex marginLeft={3} alignItems="flex-start">
            Calendar
        </Flex>
    </Flex>
    )
}
    