import {Menu,MenuButton,MenuList,MenuItemOption,MenuOptionGroup,Button} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const ActivitiesFilterMenu = ({selectedCategory, setSelectedCategory}) => {
    const activityTypes = [
        { id: 'interesting_places', name: 'Todos' },
        { id: 'bridges', name: 'Puentes' },
        { id: 'historic_architecture', name: 'Arquitectura' },
        { id: 'towers', name: 'Torres' },
        { id: 'museums', name: 'Museos' },
        { id: 'theatres_and_entertainments', name: 'Teatros' },
        { id: 'urban_environment', name: 'Esculturas' },
        { id: 'fortifications', name: 'Castillos' },
        { id: 'archaeology', name: 'Arquelogia' },
        { id: 'monuments_and_memorials', name: 'Monumentos' },
        { id: 'natural', name: 'Naturaleza' }
    ]

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={1} w='250px'>
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
    );
}