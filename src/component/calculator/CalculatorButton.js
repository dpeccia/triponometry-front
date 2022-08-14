import { IconButton, GridItem } from "@chakra-ui/react";
import {isEmpty} from "lodash";

export const CalculatorButton = (props) => {
    const checkInput = (input) => {
        if (isEmpty(Object.keys(input).length))
            return ({
                isDisabled: true,
                filter: 'grayscale(100%)',
                backgroundColor: 'gray.200'
            });
        else
            return ({
                isDisabled: false,
                filter: 'none',
                backgroundColor: 'white'
            });
    }

    const { isDisabled, filter, backgroundColor } = checkInput(props.input)

    return (
        <GridItem gridColumnStart={props.column} gridRowStart={props.row} w='100%' h='70px'>
            <IconButton bg={backgroundColor} filter={filter} isDisabled={isDisabled} boxShadow='2xl' borderRadius='15' w='100%' h='100%' icon={props.icon} onClick={props.onClick}/>
        </GridItem>
    );
}