import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {BsFillPersonFill} from "react-icons/bs";

export const UsernameInput = (props) => {

    const handleUsernameChange = (event) => {
        props.setUsername(event.target.value)
        props.setUsernameValid(true)
    }

    return (
        <InputGroup mt={2} mb={1}>
            <InputLeftElement pointerEvents='none' children={<BsFillPersonFill/>}/>
            <Input onChange={handleUsernameChange} placeholder="Username"/>
        </InputGroup>
    )
}