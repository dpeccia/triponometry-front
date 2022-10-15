import {IconButton, Input, InputGroup, InputLeftElement, InputRightElement} from "@chakra-ui/react";
import {CheckIcon, ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import validator from "validator";
import {isEmpty, isNull} from "lodash";
import {useState} from "react";
import {ErrorBadge} from "./ErrorBadge";

export const PasswordInput = (props) => {
    const [viewPass, setViewPass] = useState(false)

    const handleViewPassClick = () => setViewPass(!viewPass)

    const isPasswordValid = (aPassword) => {
        return validator.isStrongPassword(aPassword, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
    }

    const handlePasswordChange = (event) => {
        props.setPassword(event.target.value)
        if(!isNull(props.setPasswordValid))
            props.setPasswordValid(isPasswordValid(event.target.value))
    }

    return(
        <>
            <InputGroup mt={2} mb={1}>
                <Input placeholder={props.placeholder ? props.placeholder : 'Contraseña'} type={viewPass ? 'text' : 'password'} onChange={handlePasswordChange}/>
                {props.passwordValid &&
                    <InputLeftElement pointerEvents='none' children={<CheckIcon color='green.400'/>}/>}
                <InputRightElement>
                    <IconButton  icon={viewPass ? <ViewOffIcon/> : <ViewIcon/>} onClick={handleViewPassClick} size='sm'/>
                </InputRightElement>
            </InputGroup>
            {!isEmpty(props.password) && !isPasswordValid(props.password) &&
                <ErrorBadge msg="Contraseña Insegura" message={["Al menos una letra minúscula", "Al menos una letra mayúscula", "Al menos un número", "Al menos 8 carácteres"]}/>}
        </>
    )
}