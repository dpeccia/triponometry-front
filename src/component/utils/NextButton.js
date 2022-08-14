import {ArrowForwardIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/react";

export const NextButton = (props) => {
    if (props.stepFinished) return (
        <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme='pink'
            variant='outline'
            onClick={props.onClick}
        >
            {props.description}
        </Button>
    )
}