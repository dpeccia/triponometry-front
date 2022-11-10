import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

export const OtherCalculationsHelp = () => {
    return (
        <Tabs colorScheme='red' variant='enclosed-colored' orientation='horizontal' isFitted defaultIndex={0} w='100%' size='md'>
            <TabList>
                <Tab fontWeight='medium'>Explorar</Tab>
                <Tab fontWeight='medium'>Filtrar y Ordenar</Tab>
                <Tab fontWeight='medium'>Calificar Cálculo</Tab>
                <Tab fontWeight='medium'>Ver Opiniones</Tab>
            </TabList>

            <TabPanels px="100px">
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/baf73f60-73f0-4a2c-9da1-40313c2f8848?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/105b7226-1616-4697-9d71-2bc180f5afe6?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/1bd98bc8-89d5-40e3-ac3f-963f97a9968d?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/6ff8df8a-2ca9-440b-bea3-23f0cbdd5e59?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}