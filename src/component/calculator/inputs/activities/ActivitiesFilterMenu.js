import {Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button, Text, Flex} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const ActivitiesFilterMenu = ({selectedCategory, setSelectedCategory}) => {
    const activityTypes = [
        { id: 'interesting_places', name: 'Todos' },
        { id: 'archaeology', name: 'Arqueología' },
        { id: 'historic_architecture', name: 'Arquitectura' },
        { id: 'fortifications', name: 'Castillos' },
        { id: 'urban_environment', name: 'Esculturas' },
        { id: 'monuments_and_memorials', name: 'Monumentos' },
        { id: 'museums', name: 'Museos' },
        { id: 'natural', name: 'Naturaleza' },
        { id: 'bridges', name: 'Puentes' },
        { id: 'theatres_and_entertainments', name: 'Teatros' },
        { id: 'towers', name: 'Torres' }
    ]

    return (
        <Flex direction='column' w='500px' alignItems='stretch' gap={1}>
            <Text as='b' size='xs' align='center' color='#718096'>Tipo de actividad</Text>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    { selectedCategory.name }
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup defaultValue='asc' type='radio'>
                        {
                            activityTypes.map( category => (
                                <MenuItemOption key={category.id} value={category.id} onClick={()=> setSelectedCategory(category)}>
                                    {category.name}
                                </MenuItemOption>
                            ))
                        }
                    </MenuOptionGroup>
                </MenuList>
            </Menu>
        </Flex>
    );
}