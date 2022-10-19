import {IconButton, Input, InputGroup, InputLeftElement, InputRightElement} from "@chakra-ui/react";
import {CheckIcon, ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {isEmpty, isEqual} from "lodash";
import {useState} from "react";
import {ErrorBadge} from "./ErrorBadge";

export const ConfirmPassInput = (props) => {
    const [viewPass, setViewPass] = useState(false)

    const handleViewPassClick = () => setViewPass(!viewPass)

    const isConfirmPasswordValid = (aConfirmPassword) => {
        return isEqual(props.password,aConfirmPassword) && !isEmpty(props.password)
    }

    const handleConfirmPasswordChange = (event) => {
        props.setConfirmPassword(event.target.value)
        props.setConfirmPasswordValid(isConfirmPasswordValid(event.target.value))
    }

    return(
        <>
            <InputGroup mt={2} mb={1}>
                <Input placeholder='Confirmar contraseña' type={viewPass ? 'text' : 'password'} onChange={handleConfirmPasswordChange}/>
                {props.confirmPasswordValid && !isEmpty(props.password) &&
                    <InputLeftElement pointerEvents='none' children={<CheckIcon color='green.400'/>}/>}
                <InputRightElement>
                    <IconButton  icon={viewPass ? <ViewOffIcon/> : <ViewIcon/>} onClick={handleViewPassClick} size='sm'/>
                </InputRightElement>
            </InputGroup>
            {!isEmpty(props.confirmPassword) && !isConfirmPasswordValid(props.confirmPassword) &&
                <ErrorBadge msg="Las contraseñas no coinciden"/>}
        </>
    )
}