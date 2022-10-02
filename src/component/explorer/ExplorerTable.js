import {Table, Thead, Tbody, Tr, Th, Td, chakra, Text, Flex, IconButton, Box, Avatar, Tooltip, Icon} from '@chakra-ui/react'
import {StarIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons'
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {GlobalFilter} from "./GlobalFilter";
import {ColumnFilter} from "./ColumnFilter";
import {useMemo} from 'react';
import {useNavigate} from "react-router";
import Flag from 'react-world-flags'
import {countryToAlpha3} from "country-to-iso";
import { BsFillCheckCircleFill } from 'react-icons/bs';


export const ExplorerTable = ({ data }) => {

    const navigate = useNavigate()
    const handleRowClick = (id) => {
        navigate(`/explorar/${id}`)
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Nombre',
                accessor: 'name',
                Filter: ColumnFilter,
                Cell: (tableProps) => { return styleName(tableProps.row.original.name, tableProps.row.original.imageUrl, tableProps.row.original.userInfo)}
            },
            {
                Header: 'Ciudad',
                accessor: 'city',
                Filter: ColumnFilter

            },
            {
                Header: 'Pais',
                accessor: 'country',
                Filter: ColumnFilter,
                Cell: (tableProps) => { return styleCountry(countryToAlpha3(tableProps.row.original.country))}

            },
            {
                Header: 'Dias',
                accessor: 'days',
                Filter: ColumnFilter

            },
            {
                Header: 'Estrellas',
                accessor: 'rating',
                Filter: ColumnFilter,
                Cell: (tableProps) => { return styleRating(tableProps.row.original.rating)}
            },
        ],
        [],
    )

    const {
        getTableProps, getTableBodyProps, headerGroups,
        // Pagination
        page, prepareRow, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage,
        // Filtering
        setGlobalFilter,
        state: { pageIndex, globalFilter }
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 8 } },
        useFilters, useGlobalFilter, useSortBy, usePagination)
    
    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <Table {...getTableProps()}>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())} isNumeric={column.isNumeric}>
                                        {column.render('Header')}
                                        <chakra.span pl='4'>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? <TriangleDownIcon/> : <TriangleUpIcon/>
                                            ) : null }
                                        </chakra.span>
                                        <Box pt={2}>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </Box>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <Tr {...row.getRowProps()} onClick={()=> handleRowClick(row.original.id)}>
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

const verifiedBadge = (userInfo) => {
    if (userInfo.verified) {
        return (
            <Tooltip label={userInfo.username} bg='blue.400' placement='bottom'>
                <span><Icon as={BsFillCheckCircleFill} color='blue.400'/></span>   
            </Tooltip>
        )
    }
}

const styleName = (name, imageUrl, userInfo) => {
    return (
        <Flex alignItems='center'>
            <Avatar size='md' src={imageUrl}/>
            <Text ml={4}> {name} </Text>
            {verifiedBadge(userInfo)}
        </Flex>
    )
}

const styleCountry = (code) => {
    return (
        <Flex h={5} w='30px' justifyContent='start' >
            <Flag code={code}/>
            <Text ml={2}> {code} </Text>
        </Flex>
    )
}

const colour = (rating) => {
    switch(rating){
        case 1:
            return 'red.500';
        case 2:
            return 'red.300';
        case 3:
            return 'orange.300';
        case 4:
            return 'green.300';
        case 5:
            return 'green.500';
        default:
            return 'gray.400'
    }
}

const styleRating = (rating) => {
    return (
        <Flex h={5} w='30px' justifyContent='space-between' alignItems='center' >
            <Text as='b' fontSize='md' color={colour(rating)}> {rating}</Text>
            <Flex alignItems='center'>
                <StarIcon color={colour(rating)}/>
            </Flex>
        </Flex>
    )
}

