import {IconButton} from "@chakra-ui/react";
import {ArrowLeftIcon} from "@chakra-ui/icons";

export const BackButton = (props) => {
    return (
        <IconButton
            p={3}
            size='md'
            as={ArrowLeftIcon}
            variant='outline'
            onClick={props.onClick}
        />

    )
}