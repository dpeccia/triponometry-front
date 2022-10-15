import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {HiOutlineMail} from "react-icons/hi";
import {isEmpty, isNull} from "lodash";
import {ErrorBadge} from "./ErrorBadge";

export const EmailInput = (props) => {

    const isEmailValid = (anEmail) => {
        return (/\S+@\S+\.\S+/.test(anEmail));
    }

    const handleEmailChange = (event) => {
        props.setEmail(event.target.value)
        if(!isNull(props.setEmailValid))
            props.setEmailValid(isEmailValid(event.target.value))
    }

    return(
        <>
            <InputGroup mt={2} mb={1}>
                <InputLeftElement pointerEvents='none' children={<HiOutlineMail/>}/>
                <Input onChange={handleEmailChange} placeholder="Email" type='email'/>
            </InputGroup>
            {!isEmpty(props.email) && !isEmailValid(props.email) &&
                <ErrorBadge msg="Inserte un email valido"/>
            }
        </>
    )
}