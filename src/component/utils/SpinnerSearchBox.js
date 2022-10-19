import {Flex} from "@chakra-ui/layout";
import {Spinner} from "@chakra-ui/spinner";

export const SpinnerSearchBox = () => {
    return (
        <Flex h='100%' justify='center' align='center'>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='red.300' size='xl'/>
        </Flex>
    );
}