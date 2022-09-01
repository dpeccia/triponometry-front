import {Table, Thead, Tbody, Tr, Th, Td, chakra, Text, Flex, IconButton} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {FilterInput} from "../explorer/FilterInput";
import { useMemo } from 'react';

export const ExplorerTable = ({ data }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Ciudad',
                accessor: 'city',
            },
            {
                Header: 'Pais',
                accessor: 'country',
            },
            {
                Header: 'Dias',
                accessor: 'days',
                isNumeric: true,
            },
            {
                Header: 'Costo',
                accessor: 'price',
                isNumeric: true,
            },
        ],
        [],
    )

    const {
        getTableProps, getTableBodyProps, headerGroups,
        // Pagination
        page, prepareRow, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage,
        // Filtering
        setGlobalFilter, state: { pageIndex, globalFilter }
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 5 } }, useGlobalFilter, useSortBy, usePagination)
    
    return (
        <>
            <FilterInput filter={globalFilter} setFilter={setGlobalFilter}/>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    isNumeric={column.isNumeric}
                                >
                                    {column.render('Header')}
                                    <chakra.span pl='4'>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <TriangleDownIcon aria-label='sorted descending' />
                                            ) : (
                                                <TriangleUpIcon aria-label='sorted ascending' />
                                            )
                                        ) : null}
                                    </chakra.span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                        {cell.render('Cell')}
                                    </Td>
                                ))}
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
            <Flex justifyContent='space-between' alignItems='center' m={2}>
                <Flex gap='5px'>
                    <IconButton as={HiChevronDoubleLeft} onClick={() => gotoPage(0)} disabled={!canPreviousPage} size='sm' p={2} bg='#EFB4BF'/>
                    <IconButton as={IoIosArrowBack} onClick={() => previousPage()} disabled={!canPreviousPage} size='sm' p={2} bg='#EFB4BF'/>
                    <IconButton as={IoIosArrowForward} onClick={() => nextPage()} disabled={!canNextPage} size='sm' p={2} bg='#EFB4BF'/>
                    <IconButton as={HiChevronDoubleRight} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} size='sm' p={2} bg='#EFB4BF'/>
                </Flex>
                <Text ml={2} fontSize='sm' as='b' color='#F5A0B0'>
                    {`Pagina ${pageIndex + 1} de ${pageOptions.length}`}
                </Text>
            </Flex>
        </>
    );
}