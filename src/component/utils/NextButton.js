import {Button} from "@chakra-ui/react";
import {ArrowRightIcon} from "@chakra-ui/icons";

export const NextButton = (props) => {
    if (props.stepFinished) return (
        <Button
            rightIcon={<ArrowRightIcon />}
            colorScheme='pink'
            variant='outline'
            onClick={props.onClick}
        >
            {props.description}
        </Button>
    )
}