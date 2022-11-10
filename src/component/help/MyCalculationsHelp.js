import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

export const MyCalculationsHelp = () => {
    return (
        <Tabs colorScheme='red' variant='enclosed-colored' orientation='horizontal' isFitted defaultIndex={0} w='100%' size='md'>
            <TabList>
                <Tab fontWeight='medium'>Guardar Cálculo</Tab>
                <Tab fontWeight='medium'>Ver Cálculos</Tab>
                <Tab fontWeight='medium'>Editar Cálculo</Tab>
                <Tab fontWeight='medium'>Cambiar Imagen</Tab>
                <Tab fontWeight='medium'>Guardar Borrador</Tab>
                <Tab fontWeight='medium'>Eliminar Borrador</Tab>
                <Tab fontWeight='medium'>Compartir Cálculo</Tab>
                <Tab fontWeight='medium'>Archivar Cálculo</Tab>
            </TabList>

            <TabPanels px="100px">
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/b3d95bd6-0e6a-41b3-82e5-41629b878cc8?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/c5a6f317-accc-4c0d-bed9-2824420e7e79?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/be4ebab2-1e10-403d-b070-82be209d817a?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe> 
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/6e89bc6e-b790-4009-ae95-665813792cd1?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/29f31c61-7057-499b-b7c3-053c6454ce53?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/07d4a69b-2aae-4b32-a23f-943abf37ff91?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/a9175f51-41f9-4b1e-975a-7f3bfcb34245?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
                <TabPanel>
                <iframe src="https://app.tango.us/app/embed/fbd22b49-c99f-4083-8877-1c89f29f4f4a?iframe" sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" security="restricted" title="Tango Workflow" width="100%" height="550" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}