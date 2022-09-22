import { Badge, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, UnorderedList, VStack } from "@chakra-ui/react"
import { isEmpty } from "lodash"
import { useState } from "react"

export const ErrorBadge = (props) => {

    const [openPop, setOpenPop] = useState(true)
    const listItems = !isEmpty(props.message) ? props.message.map((element) => <ListItem size="sm">{element}</ListItem>) : null
    return(
        <VStack>
            <Popover isOpen={!isEmpty(props.message) && openPop} autoFocus={false}>
                <PopoverTrigger>
                    <Badge  colorScheme='red' variant='solid' mb={1}> {props.msg} </Badge>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverCloseButton onClick={() => {setOpenPop(false)}}/>
                    <PopoverArrow/>
                    <PopoverBody>                       
                        <UnorderedList>    
                            {listItems}
                        </UnorderedList>
                    </PopoverBody>
                </PopoverContent>               
            </Popover>
        </VStack>

    )
}