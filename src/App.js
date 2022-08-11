import './App.css';
import {Outlet} from "react-router"
import {ChakraProvider, Flex} from '@chakra-ui/react'
import {Header} from "./component/utils/Header";




function App() {
  return (
    <ChakraProvider>
      <Flex direction='column' minH='100vh'>
          <Header />
          <Flex p={8} direction='row'>
              <Outlet grow='1'/>
          </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
