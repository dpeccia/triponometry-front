import { useToast as useChakraUiToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";
import { checkErrorTokenExpired } from "../../BackendService";

export const useToast = () => {
    const showToast = useChakraUiToast()
    const navigate = useNavigate()

    const showSuccessToast = (toastTitle, toastMessage) => {
        showToast({
            title: toastTitle,
            description: toastMessage,
            variant: 'top-accent',
            status: 'success',
            isClosable: true,
        })
    }

    const showErrorToast = (toastMessage, logout) => {
        showToast({
            title: 'Error',
            description: toastMessage,
            variant: 'top-accent',
            status: 'error',
            isClosable: true,
        })
        if(checkErrorTokenExpired(toastMessage) && logout){
            logout()
            navigate("/")
        }
    }

    return [showSuccessToast, showErrorToast]
}