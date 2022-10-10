import { Outlet } from "react-router"
import {ChakraProvider, Flex } from '@chakra-ui/react'
import { Header } from "./component/utils/Header";

function App(props) {
    const showHeader = () => {
        if (props.showHeader)
            return <Header username={props.username} pfp={props.pfp} logout={props.logout} />
    }

    return (
        <ChakraProvider>
            <Flex direction='column' minH='100vh'>
                {showHeader()}
                <Flex p={8} direction='row' grow='1'>
                    <Outlet />
                </Flex>
                <Flex p={2} bg='#6F6F6F'/>
            </Flex>
        </ChakraProvider>
    );
}

export default App;
