import { Badge } from "@chakra-ui/react"

export const SuccessBadge = (props) => {
    return(
        <Badge  colorScheme='green' variant='solid' mb={1}> {props.msg} </Badge>
    )
}

