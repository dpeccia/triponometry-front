import { Checkbox, HStack, NumberInput, NumberInputField, Select } from "@chakra-ui/react"
import { useState } from "react"

export const MealItem = ({label, handleChange}) => {

    const [isDisabled, setIsDisabled] = useState(true)
    const [time, setTime] = useState('h')
    const [number, setNumber] = useState()


    const change = (event) => {
        switch(event.target.id){
            case 'number':
                handleChange({time: time, number: event.target.value})
                break;
            case 'time':
                handleChange({time: event.target.value, number: number})
                break;
        }
    }

    return(
        <HStack>
            <Checkbox onChange={()=>{setIsDisabled(!isDisabled)}}>{label}</Checkbox>
            <HStack marginLeft='auto' onChange={(event) => {change(event)}}>
                <NumberInput isDisabled={isDisabled} id='number' onChange={(event) => {setNumber(event)}}>
                    <NumberInputField size='3'/>
                </NumberInput>
                <Select w='fit-content' size='sm' isDisabled={isDisabled} id='time' onChange={(event) => {setTime(event.target.value)}}>
                    <option value='h'>Horas</option>
                    <option value='min'>Minutos</option>
                </Select>
            </HStack>
        </HStack>
    )
}