import {Avatar, Flex, Image, Link, WrapItem, Menu, MenuButton, MenuList, MenuItem, IconButton} from "@chakra-ui/react";
import { useState } from "react";
import {Link as ReachLink, useNavigate} from "react-router-dom";
import { logout } from "../../BackendService";


const Logo = () =>
    <Flex minW='500px' ml='15px' p={1} justifyContent='flex-start' alignItems='center'>
        <Image src={'../nombre-triponometry.png'} w='235px'/>
    </Flex>

const Spacer = () =>
    <Flex bg='#F4E0B2' minW='10px'/>

const NavigationMenu = () => 
    <>
        <Link as={ReachLink} to='/nuevo' mr={4} >
            Nuevo
        </Link>
        <Link as={ReachLink} to='/explorar' mr={4}>
            Explorar
        </Link>
        <Link as={ReachLink} to='/mis-calculos' mr={4}>
            Mis calculos
        </Link>
    </>


const NavBar = (props) =>{

    const navigate = useNavigate()

    const handleLogClick = () => {
        if (props.username !== ""){
            props.logout()
        } else {
            navigate("/")
        }
    }

    return(
        <Flex bg='#F0A7B4' grow='1' minW='700px' justifyContent='flex-end' alignItems='center'>
            {props.username !== "" ? (<NavigationMenu/>) : (<></>)}
            <Menu>
                <MenuButton>
                    <WrapItem>
                        <Avatar size='sm' name={props.username} src={props.pfp} mr={4}/>{' '}
                    </WrapItem>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleLogClick}>
                        {props.username === "" ? "Iniciar Sesion" : "Cerrar sesión" }
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export const Header = (props) =>
    <Flex direction='row' justifyContent='flex-start'>
        <Logo/>
        <Spacer/>
        <NavBar username={props.username} pfp={props.pfp} logout={props.logout}/>
    </Flex>