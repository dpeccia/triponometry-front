import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

export const UsersHelp = () => {
    return (
        <Tabs colorScheme='red' variant='enclosed-colored' orientation='horizontal' isFitted defaultIndex={0} w='100%' size='md'>
            <TabList>
                <Tab fontWeight='medium'>Registrarse</Tab>
                <Tab fontWeight='medium'>Iniciar Sesión</Tab>
                <Tab fontWeight='medium'>Cerrar Sesión</Tab>
                <Tab fontWeight='medium'>Modificar Contraseña</Tab>
                <Tab fontWeight='medium'>Restablecer Contraseña</Tab>
            </TabList>

            <TabPanels px="100px">
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/c81d7673-628e-42ce-992a-678129fdcc89?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/cba06075-f338-4f9c-9c81-46d2c5eeac0c?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/147e2583-5119-468a-824a-2144f620b932?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/308aae46-e131-4afd-8c6b-831e435b55df?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/4dcc96cb-b3ef-4409-a602-518ce892c3a4?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}