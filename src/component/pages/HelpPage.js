import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Text, VStack, Heading, HStack, Tag, Button, Box, IconButton } from '@chakra-ui/react'
import { MyCalculationsHelp } from '../help/MyCalculationsHelp'
import { NewCalculationHelp } from '../help/NewCalculationHelp'
import { OtherCalculationsHelp } from '../help/OtherCalculationsHelp'
import { UsersHelp } from '../help/UsersHelp'

export const HelpPage = () => {
    return (
        <Flex direction='column' grow={2} ml={8} mr={8}>
            <Text as='b' fontSize='3xl' color='#E87288'> ¿Necesitas ayuda? </Text>
            <Text mb={3} fontSize='md' color='#718096'>¡Navegá por los tutoriales de todas nuestras funcionalidades con solo unos clicks!</Text>
            <Tabs colorScheme='red' orientation='vertical' variant='soft-rounded' defaultIndex={0} w='100%' size='lg' mt={5}>
                <TabList mr='50px'>
                    <Tab fontWeight='medium'>Gestión de usuarios</Tab>
                    <Tab fontWeight='medium'>Cálculo de nuevo viaje</Tab>
                    <Tab fontWeight='medium'>Operación sobre mis cálculos</Tab>
                    <Tab fontWeight='medium'>Operación sobre cálculos de otros usuarios</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UsersHelp />
                    </TabPanel>
                    <TabPanel>
                        <NewCalculationHelp />
                    </TabPanel>
                    <TabPanel>
                        <MyCalculationsHelp />
                    </TabPanel>
                    <TabPanel>
                        <OtherCalculationsHelp />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}