import {Avatar, Box, Button, Container, Flex, Image, Link, WrapItem} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";


const Logo = () =>
    <Flex justifyContent='center' alignContent='center' m={2} mr={8}>
        <Image w='20vh' src={'../nombre-triponometry.png'} />
    </Flex>

const Spacer = () =>
    <Flex bg='#F4E0B2' minW={4}/>

const NavBar = () =>
    <Flex bg='#F0A7B4' grow='1' justifyContent="flex-end" alignItems="center">
        <Link as={ReachLink} to='/nuevo' mr={4} >
            Nuevo
        </Link>
        <Link as={ReachLink} to='/explorar' mr={4}>
            Explorar
        </Link>
        <Link as={ReachLink} to='/mis-calculos' mr={4}>
            Mis calculos
        </Link>
        <WrapItem>
            <Avatar size='sm' name='Stitch' src={"../default-avatar.jpeg"} mr={4}/>{' '}
        </WrapItem>
    </Flex>

export const Header = () =>
    <Flex direction='row' maxH='8vh' justifyContent='flex-start'>
        <Logo/>
        <Spacer/>
        <NavBar/>
    </Flex>