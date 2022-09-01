import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react"
import { useState } from "react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const PasswordInput = (props) => {

    
    const [viewPass, setViewPass] = useState(false)

    const handleViewPassClick = () => setViewPass(!viewPass)


    return(
        <InputGroup mb={1}>
            <Input placeholder={props.placeholder ? props.placeholder : 'Contraseña'} isInvalid={props.isInvalid} type={viewPass ? 'text' : 'password'} onChange={(event) => {props.handleChange(event.target.value)}}/>
            <InputRightElement>
                <IconButton  icon={viewPass ? <ViewOffIcon/> : <ViewIcon/>} onClick={handleViewPassClick} size='sm'/>
            </InputRightElement>
        </InputGroup>
    )
}