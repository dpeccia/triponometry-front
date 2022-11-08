import {Avatar, Flex, Image, Link, WrapItem, Menu, MenuButton, MenuList, MenuItem, Box} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";
import { isEmpty } from "lodash";
import { ChangePasswordModal } from "./modals/ChangePasswordModal";
import {MdLogin, MdLogout} from "react-icons/md";

const Logo = () => {
    return (
        <Flex minW='500px' ml='15px' p={1} justifyContent='flex-start' alignItems='center'>
            <Image src={'../nombre-triponometry.png'} w='350px'/>
        </Flex>
    )
}

const Spacer = () =>
    <Flex bg='#F4E0B2' minW='10px'/>

const NavigationMenu = () => 
    <>
        <Link fontSize='lg' fontWeight='medium' as={ReachLink} to='/nuevo' mr={10} >
            Nuevo
        </Link>
        <Link fontSize='lg' fontWeight='medium' as={ReachLink} to='/explorar' mr={10}>
            Explorar
        </Link>
        <Link fontSize='lg' fontWeight='medium' as={ReachLink} to='/mis-calculos' mr={10}>
            Mis Cálculos
        </Link>
    </>

const NavBar = (props) =>{
    const handleLogClick = () => {
        props.logout()
    }


    const loginlogout = () => {
        if(!isEmpty(props.username)){
            return(               
                <MenuItem icon={<MdLogout/>} onClick={handleLogClick}>
                    Cerrar sesión
                </MenuItem>
            )
        } else {
            return(
                <MenuItem icon={<MdLogin/>} as={ReachLink} to="/sign-in">
                    Iniciar sesión
                </MenuItem>
            )
        }
    }

    const changePassItem = () =>
    {
        if(!isEmpty(props.username) && !props.isGoogle){
            return <ChangePasswordModal/>
        }
    }

    return(
        <Flex bg='#F0A7B4' grow='1' minW='700px' justifyContent='flex-end' alignItems='center'>
            {!isEmpty(props.username) ? (<NavigationMenu/>) : (<></>)}
            <Menu>
                <MenuButton>
                    <WrapItem>
                        <Avatar size='md' name={props.username} src={props.pfp} mr={7}/>{' '}
                    </WrapItem>
                </MenuButton>
                <MenuList>
                    {changePassItem()}
                    {loginlogout()}
                </MenuList>
            </Menu>
        </Flex>
    )
}

export const Header = (props) =>
    <Flex direction='row' justifyContent='flex-start' h='72px'>
        <Logo/>
        <Spacer/>
        <NavBar username={props.username} pfp={props.pfp} logout={props.logout} isGoogle={props.isGoogle}/>
    </Flex>