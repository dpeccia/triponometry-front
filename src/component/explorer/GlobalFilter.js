import { Input } from "@chakra-ui/react";

export const GlobalFilter = (props) => {
    return (
        <Input
            placeholder='Buscar cálculos'
            focusBorderColor='#EFB4BF'
            w='35%'
            mb={1}
            ml={6}
            value={props.filter || ''}
            onChange={e => props.setFilter(e.target.value)}
        />
    )
}