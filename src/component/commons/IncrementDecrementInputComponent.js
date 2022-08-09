import { NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from "@chakra-ui/react"

export const IncrementDecrementInputComponent = ({handleChange}) => {

    return(
        <NumberInput min={0} marginRight={2} marginLeft={2} onChange={(event) => {handleChange(event)}}>
            <NumberInputField size={2} />
            <NumberInputStepper>
            <NumberIncrementStepper
                    bg='green.200'
                    _active={{ bg: 'green.300' }}
                    children='+'
                />
                <NumberDecrementStepper
                    bg='pink.200'
                    _active={{ bg: 'pink.300' }}
                    children='-'
                />
            </NumberInputStepper>                      
        </NumberInput>
    )
}