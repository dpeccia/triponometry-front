import { useToast as useChakraUiToast } from "@chakra-ui/toast";

export const useToast = () => {
    const showToast = useChakraUiToast()

    const showSuccessToast = (toastTitle, toastMessage) => {
        showToast({
            title: toastTitle,
            description: toastMessage,
            variant: 'top-accent',
            status: 'success',
            isClosable: true,
        })
    }

    const showErrorToast = (toastMessage) => {
        showToast({
            title: 'Error',
            description: toastMessage,
            variant: 'top-accent',
            status: 'error',
            isClosable: true,
        })
    }

    return [showSuccessToast, showErrorToast]
}