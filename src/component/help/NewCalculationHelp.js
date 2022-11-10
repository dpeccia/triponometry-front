import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

export const NewCalculationHelp = () => {
    return (
        <Tabs colorScheme='red' variant='enclosed-colored' orientation='horizontal' isFitted defaultIndex={0} w='100%' size='md'>
            <TabList>
                <Tab fontWeight='medium'>Nuevo Cálculo</Tab>
                <Tab fontWeight='medium'>Exportar como PDF</Tab>
                <Tab fontWeight='medium'>Exportar Calendario</Tab>
                <Tab fontWeight='medium'>Exportar Mapa</Tab>
            </TabList>

            <TabPanels px="100px">
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/b49bd666-3783-47a0-a655-7afa663d8f84?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/f265b4c8-923f-4893-aa2f-2a87ce85f7e4?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/3c65037e-fe04-4c1c-afc5-2ff7f0ee313e?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/5b9867cc-0d84-46a3-956f-12ee9425b5af?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}