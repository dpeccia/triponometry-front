import './App.css';
import {Outlet} from "react-router"
import {ChakraProvider, Flex} from '@chakra-ui/react'
import {Header} from "./component/Header";




function App() {
  return (
    <ChakraProvider>
      <Flex  direction='column' minH='100vh'>
          <Header />
          <Flex p={4} grow='1'>
              <Outlet/>
          </Flex>
          <Flex p={2} bg='#6F6F6F'/>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
