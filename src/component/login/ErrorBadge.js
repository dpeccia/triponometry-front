import { Badge, ListItem, Popover, PopoverHeader, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, UnorderedList, VStack } from "@chakra-ui/react"
import { isEmpty } from "lodash"
import { useState } from "react"

export const ErrorBadge = (props) => {

    const [openPop, setOpenPop] = useState(true)
    const listItems = props.message ? props.message.map((element) => <ListItem size="sm">{element}</ListItem>) : null
    return(
        <VStack>
            <Popover isOpen={props.message && openPop} autoFocus={false}>
                <PopoverTrigger>
                    <Badge  colorScheme='red' variant='subtle' mb={1}> {props.msg} </Badge>
                </PopoverTrigger>
                <PopoverContent borderColor='#F0A7B4' fontSize='sm'>
                    <PopoverHeader pt={2} fontWeight='bold'>
                        Tu contraseña tiene que incluir:
                    </PopoverHeader>
                    <PopoverArrow/>
                    <PopoverCloseButton onClick={() => {setOpenPop(false)}}/>
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