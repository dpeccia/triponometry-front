import { Outlet, useLocation, useNavigate } from "react-router"
import {ChakraProvider, Flex } from '@chakra-ui/react'
import { Header } from "./component/utils/Header";
import { useState, useEffect } from "react";
import {isEqual} from "lodash";


function App(props) {

    const [showHeader, setShowHeader] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    if(props.redirect){
        navigate("/")
        props.setRedirect(false)
    }

    useEffect(() => {
        const path = window.location.pathname
        setShowHeader(!(isEqual(path, '/') || isEqual(path,'/sign-in') || isEqual(path,'/sign-up')))
    },[location])

    const showHeaderComp = () => {
        if (showHeader)
            return <Header username={props.username} pfp={props.pfp} logout={props.logout} isGoogle={props.isGoogle}/>
    }

    return (
        <ChakraProvider>
            <Flex direction='column' minH='100vh'>
                {showHeaderComp()}
                <Flex p={8} direction='row' grow='1'>
                    <Outlet />
                </Flex>
                <Flex p={2} bg='#6F6F6F'/>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
