import {Avatar, Flex, Image, Link, WrapItem} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";


const Logo = () =>
    <Flex minW='500px' ml='15px' p={1} justifyContent='flex-start' alignItems='center'>
        <Image src={'../nombre-triponometry.png'} w='235px'/>
    </Flex>

const Spacer = () =>
    <Flex bg='#F4E0B2' minW='10px'/>

const NavBar = () =>
    <Flex bg='#F0A7B4' grow='1' minW='700px' justifyContent='flex-end' alignItems='center'>
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
    <Flex direction='row' justifyContent='flex-start'>
        <Logo/>
        <Spacer/>
        <NavBar/>
    </Flex>