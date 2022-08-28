import {Table, Thead, Tbody, Tr, Th, Td, chakra, Text, Flex, IconButton, Box, Button, Avatar} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import { useMemo } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {FilterInput} from "../explorer/FilterInput";
import Flag from 'react-world-flags'

export const ExplorerPage = () => {

    const name = (name, imageUrl) => {
        return (
            <Flex alignItems='center'>
                <Avatar size='md' src={imageUrl}/>
                <Text ml={4}> {name} </Text>
            </Flex>
        )
    }

    const country = (code) => {
        return (
            <Flex h={5} w='30px' justifyContent='start' >
                <Flag code={code}/>
                <Text ml={2}> {code} </Text>
            </Flex>

        )
    }

    const data = useMemo(
        () => [
            {
                id: 1,
                name: name("Amo Córdoba 💛", "https://pbs.twimg.com/media/DeX2MLQWsAAlozV.jpg"),
                days: "2",
                city: "Córdoba",
                country: country("ARG"),
                price: "ARG $30.000",
            },
            {
                id: 2,
                name: name("Paseo histórico", "https://historia.nationalgeographic.com.es/medio/2018/03/01/coliseo-romano_16022ed4_1280x853.jpg"),
                days: "3",
                city: "Roma",
                country: country("ITA"),
                price: "USD 3.148",
            },
            {
                id: 3,
                name: name("It’s beach time! 😎","http://www.eltiempo.com/files/image_640_428/uploads/2017/10/25/59f1585e0af3a.jpeg"),
                days: "6",
                city: "Recife",
                country: country("BRA"),
                price: "USD 5.453",
            },
            {
                id: 4,
                name: name("Disney + Universal","https://upload.wikimedia.org/wikipedia/commons/6/6f/Mickey_and_Walt_Disney.jpg"),
                days: "7",
                city: "Orlando",
                country: country("USA"),
                price: "USD 8.003",
            },
            {
                id: 5,
                name: name("Pirámides", "https://static.dw.com/image/60495947_303.jpg"),
                days: "1",
                city: "El Cairo",
                country: country("EGY"),
                price: "USD 2.564",
            },
            {
                id: 6,
                name: name("Bier 🍺", "http://nexointernacional.fen.uchile.cl/wp-content/uploads/2020/10/3.Universitat_der_Bundeswehr_Munchen.jpg"),
                days: "3",
                city: "München",
                country: country("DEU"),
                price: "USD 2.453",
            },
        ],
        [],
    )

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
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // Pagination
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        // Filtering
        setGlobalFilter,
        state: {
            pageIndex,
            globalFilter,
        },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: 5,
            },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <Flex direction='column' grow={2} ml={8} mr={8}>
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
        </Flex>
    )
}