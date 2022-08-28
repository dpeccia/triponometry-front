import { Input } from "@chakra-ui/react";

export const FilterInput = (props) => {
    return (
        <Input
            placeholder='Buscar cálculos'
            variant='filled'
            w='50%'
            mb={4}
            value={props.filter || ''}
            onChange={e => props.setFilter(e.target.value)}
        />
    )
}