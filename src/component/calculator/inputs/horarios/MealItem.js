import { Checkbox, HStack, NumberInput, NumberInputField, Select } from "@chakra-ui/react"
import { isNull, isUndefined } from "lodash"
import { useState } from "react"

export const MealItem = ({label, meal, handleChange}) => {
    const [isDisabled, setIsDisabled] = useState((isNull(meal?.number) || isUndefined(meal?.number)))
    const [time, setTime] = useState((isNull(meal?.time) || isUndefined(meal?.time)) ? 'h' : meal?.time)
    const [number, setNumber] = useState(meal?.number)

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

    const onCheckboxChange = () => {
        if(isDisabled) {
            handleChange({time: time, number: number})
        } else {
            handleChange(null)
        }
        setIsDisabled(!isDisabled)
    }

    return(
        <HStack>
            <Checkbox isChecked={!isDisabled} onChange={onCheckboxChange}>{label}</Checkbox>
            <HStack marginLeft='auto' onChange={(event) => {change(event)}}>
                <NumberInput isDisabled={isDisabled} id='number' value={number} onChange={(event) => {setNumber(event)}}>
                    <NumberInputField size='3'/>
                </NumberInput>
                <Select w='fit-content' size='sm' isDisabled={isDisabled} id='time' value={time} onChange={(event) => {setTime(event.target.value)}}>
                    <option value='h'>Horas</option>
                    <option value='min'>Minutos</option>
                </Select>
            </HStack>
        </HStack>
    )
}