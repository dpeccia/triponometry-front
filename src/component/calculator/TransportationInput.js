import { Icon , ArrowForwardIcon} from "@chakra-ui/icons"
import { VStack, RadioGroup, Radio, Button, Center,  } from "@chakra-ui/react"
import { useState } from "react"
import {MdDirectionsBike, MdDirectionsCar, MdDirectionsWalk} from "react-icons/md"

export const TransportationInput = (props) => {
    const [selectedTransportation, setSelectedTransportation] = useState("")

    return(
        <VStack>
            <RadioGroup onChange={setSelectedTransportation} value={selectedTransportation}>
                <VStack>
                    <Radio value='walking'><Icon as={MdDirectionsWalk}/></Radio>
                    <Radio value='driving'><Icon as={MdDirectionsCar}/></Radio>
                    <Radio value='cycling'><Icon as={MdDirectionsBike}/></Radio>
                </VStack>
            </RadioGroup>   
            <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme='pink'
                variant='outline'
                onClick={() => {
                    props.setCalculatorInputs(prevState => ({...prevState, mobility: selectedTransportation}))}}
            >
                Continua con mapa
            </Button>
        </VStack>
    )

        
}