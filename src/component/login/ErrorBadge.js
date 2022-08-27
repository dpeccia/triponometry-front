import { Badge } from "@chakra-ui/react"

export const ErrorBadge = (props) => {
    return( 
        <Badge  colorScheme='red' variant='solid' mb={1}> {props.msg} </Badge>
    )
}