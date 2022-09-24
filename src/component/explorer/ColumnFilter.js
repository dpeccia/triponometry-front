import {Input} from "@chakra-ui/react";

export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <Input
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value)}
        />
    )
}