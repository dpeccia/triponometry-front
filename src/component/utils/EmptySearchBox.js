import {Flex} from "@chakra-ui/layout";
import {Text} from "@chakra-ui/react";

export const EmptySearchBox = () => {
    return (
        <Flex minHeight='420px' justify='center' align='center'>
            <Text as='em' color='gray'>No se han encontrado resultados</Text>
        </Flex>
    )
}