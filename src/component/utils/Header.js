import {Avatar, Flex, Image, Link, WrapItem, Menu, MenuButton, MenuList, MenuItem, Box, MenuDivider} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";
import { isEmpty } from "lodash";
import { ChangePasswordModal } from "./modals/ChangePasswordModal";
import {MdLogin, MdLogout} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";

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

const NavBar = (props) => {
    const navigate = useNavigate()

    const handleLogClick = () => {
        props.logout()
    }

    const navigateToHelp = () => {
        navigate(`/ayuda`)
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

    const changePassItem = () => {
        if(!isEmpty(props.username) && !props.isGoogle){
            return <ChangePasswordModal/>
        }
    }

    const aboutThis = () => {
        return(
            <MenuItem as={ReachLink} to="/about-this">
                <Image
                    boxSize='1.5rem'
                    borderRadius='full'
                    src='../logo-triponometry.png'
                    mr={1}
                />
                Sobre Triponometry
            </MenuItem>
        )
    }

    const helpItem = () => {
        if(!isEmpty(props.username)){
            return(               
                <MenuItem icon={<BiHelpCircle/>} onClick={navigateToHelp}>
                    Ayuda
                </MenuItem>
            )
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
                    {helpItem()}
                    {changePassItem()}
                    {loginlogout()}
                    <MenuDivider />
                    {aboutThis()}
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